import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'

function requireEnv(value: string | undefined, name: string): string {
  if (!value) throw new Error(`${name} is not set`)
  return value
}

const stripe = new Stripe(requireEnv(process.env.STRIPE_SECRET_KEY, 'STRIPE_SECRET_KEY'))
const webhookSecret = requireEnv(process.env.STRIPE_WEBHOOK_SECRET, 'STRIPE_WEBHOOK_SECRET')

const NAVY = '#0A1128'
const GOLD = '#D4AF37'

/* Literal description set by /api/create-payment-intent for standalone
   one-time donations. Subscription invoices also fire payment_intent.succeeded,
   but Stripe generates those PaymentIntents internally and never sets this
   exact description — checking it reliably excludes monthly renewal charges
   from the one-time donor/internal emails below. */
const ONE_TIME_DESCRIPTION = 'Gwags One-time Donation'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const formatAmount = (cents: number) => `$${(cents / 100).toFixed(2)}`
const formatDate = () => new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

/* Simple, readable HTML shell matching the site's navy/gold palette —
   not a marketing template, just a clean wrapper around the message body. */
function emailShell(bodyHtml: string): string {
  return `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: ${NAVY};">
  <div style="margin-bottom: 24px;">
    <span style="font-family: Georgia, 'Times New Roman', serif; font-size: 22px; color: ${GOLD}; letter-spacing: 0.05em;">Gwags</span>
    <div style="font-size: 11px; letter-spacing: 0.15em; color: ${GOLD}; text-transform: uppercase; margin-top: 2px;">Global Impact Institution</div>
  </div>
  <div style="font-size: 15px; line-height: 1.7;">
    ${bodyHtml}
  </div>
  <hr style="border: none; border-top: 1px solid rgba(10,17,40,0.12); margin: 32px 0 16px;" />
  <p style="font-size: 12px; color: #6B6B6B; margin: 0;">Gwags Global Impact Institution</p>
</div>
  `.trim()
}

async function sendMail(to: string, subject: string, bodyHtml: string, fromName: string) {
  const transporter = getTransporter()
  await transporter.sendMail({
    from: `"${fromName}" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html: emailShell(bodyHtml),
  })
}

/* Subscription events only carry a customer ID, not the customer's email/name,
   so this looks them up. Never throws — if the lookup fails (in practice this
   should be rare, since Stripe only sends events for customers that genuinely
   exist), the internal notification email should still go out rather than the
   whole handler aborting silently. */
async function retrieveCustomerSafe(customerId: string): Promise<{ email: string | null; name: string }> {
  try {
    const customer = await stripe.customers.retrieve(customerId)
    return {
      email: !customer.deleted ? customer.email : null,
      name: (!customer.deleted && customer.name) || 'Anonymous donor',
    }
  } catch (err) {
    console.error('webhook: failed to retrieve customer:', err)
    return { email: null, name: 'Anonymous donor' }
  }
}

/* Builds a Billing Portal link for the donor-facing "manage your donation"
   emails — same call as /api/create-portal-session. Returns null on failure
   (e.g. the Customer Portal hasn't been configured in the Stripe Dashboard
   yet) so the surrounding email can still send without that link. */
async function getPortalUrl(customerId: string): Promise<string | null> {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.SITE_URL || 'http://localhost:3000'}/get-involved`,
    })
    return session.url
  } catch (err) {
    console.error('webhook: failed to create billing portal session:', err)
    return null
  }
}

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  if (paymentIntent.description !== ONE_TIME_DESCRIPTION) return

  const email = paymentIntent.receipt_email
  const name = paymentIntent.metadata?.donor_name || 'Anonymous donor'
  const amount = formatAmount(paymentIntent.amount)

  if (email) {
    await sendMail(
      email,
      'Thank you for your donation to Gwags',
      `
        <p>Dear ${escapeHtml(name)},</p>
        <p>Thank you for your generous gift of <strong>${amount}</strong> to Gwags Global Impact Institution.</p>
        <p>Your one-time donation directly supports the programs and partnerships that make up our mission — building the infrastructure that helps organizations create lasting impact.</p>
        <p>If you have any questions about your donation, please reach out to us at <a href="mailto:donate@gwags.org" style="color:${NAVY};">donate@gwags.org</a>.</p>
        <p>With gratitude,<br>The Gwags Team</p>
      `,
      'Gwags Global Impact Institution',
    ).catch(err => console.error('webhook: failed to send donor thank-you email:', err))
  }

  const internalEmail = process.env.CONTACT_EMAIL
  if (internalEmail) {
    await sendMail(
      internalEmail,
      `New one-time donation received — ${amount}`,
      `
        <p><strong>One-time donation</strong></p>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email || 'Not provided')}</p>
        <p><strong>Amount:</strong> ${amount}</p>
        <p><strong>Date:</strong> ${formatDate()}</p>
      `,
      'Gwags Website',
    ).catch(err => console.error('webhook: failed to send internal notification email:', err))
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  const customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id
  const { email, name } = await retrieveCustomerSafe(customerId)
  const amountCents = subscription.items.data[0]?.price.unit_amount ?? 0
  const amount = formatAmount(amountCents)

  const portalUrl = await getPortalUrl(customerId)

  if (email) {
    await sendMail(
      email,
      'Thank you for your monthly donation to Gwags',
      `
        <p>Dear ${escapeHtml(name)},</p>
        <p>Thank you for becoming a monthly donor to Gwags Global Impact Institution, with a recurring gift of <strong>${amount} / month</strong>.</p>
        <p>Your ongoing support gives us the stability to plan ahead and sustain the programs that matter most. You'll be charged automatically each month, and you're free to manage or cancel your recurring gift at any time.</p>
        ${portalUrl ? `<p><a href="${portalUrl}" style="color:${NAVY}; font-weight:600;">Manage your donation</a></p>` : ''}
        <p>If you have any questions, please reach out to us at <a href="mailto:donate@gwags.org" style="color:${NAVY};">donate@gwags.org</a>.</p>
        <p>With gratitude,<br>The Gwags Team</p>
      `,
      'Gwags Global Impact Institution',
    ).catch(err => console.error('webhook: failed to send subscription thank-you email:', err))
  }

  const internalEmail = process.env.CONTACT_EMAIL
  if (internalEmail) {
    await sendMail(
      internalEmail,
      `New monthly subscription started — ${amount} / month`,
      `
        <p><strong>New monthly subscription</strong></p>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email || 'Not provided')}</p>
        <p><strong>Monthly amount:</strong> ${amount}</p>
        <p><strong>Date:</strong> ${formatDate()}</p>
      `,
      'Gwags Website',
    ).catch(err => console.error('webhook: failed to send internal notification email:', err))
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id
  const { email, name } = await retrieveCustomerSafe(customerId)
  const amountCents = subscription.items.data[0]?.price.unit_amount ?? 0
  const amount = formatAmount(amountCents)

  // No donor-facing email here — they initiated the cancellation themselves.
  const internalEmail = process.env.CONTACT_EMAIL
  if (internalEmail) {
    await sendMail(
      internalEmail,
      `Monthly subscription canceled — ${amount} / month`,
      `
        <p><strong>Monthly subscription canceled</strong></p>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email || 'Not provided')}</p>
        <p><strong>Monthly amount:</strong> ${amount}</p>
        <p><strong>Date:</strong> ${formatDate()}</p>
      `,
      'Gwags Website',
    ).catch(err => console.error('webhook: failed to send internal notification email:', err))
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const email = invoice.customer_email
  const name = invoice.customer_name || 'Anonymous donor'
  const amount = formatAmount(invoice.amount_due)
  const customerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id

  // Current Stripe API versions don't expose a single flat failure-reason
  // field directly on the Invoice object the way older versions did via
  // Invoice.payment_intent.last_payment_error. This reads the closest
  // available field defensively; verify the exact shape against a real
  // failed-payment event once the webhook is live and adjust if needed.
  const failureReason =
    (invoice as unknown as { last_finalization_error?: { message?: string } }).last_finalization_error?.message
    || 'No specific failure reason was provided by Stripe.'

  const portalUrl = customerId ? await getPortalUrl(customerId) : null

  if (email) {
    await sendMail(
      email,
      'Action needed: your monthly donation to Gwags could not be processed',
      `
        <p>Dear ${escapeHtml(name)},</p>
        <p>We wanted to let you know that your most recent monthly donation to Gwags Global Impact Institution could not be processed.</p>
        <p>This sometimes happens for simple reasons, like an expired card or updated billing details. Your recurring gift is still active, and we'd appreciate your help getting it back on track.</p>
        ${portalUrl ? `<p><a href="${portalUrl}" style="color:${NAVY}; font-weight:600;">Update your payment details</a></p>` : ''}
        <p>If you have any questions, please reach out to us at <a href="mailto:donate@gwags.org" style="color:${NAVY};">donate@gwags.org</a>.</p>
        <p>Thank you for your continued support,<br>The Gwags Team</p>
      `,
      'Gwags Global Impact Institution',
    ).catch(err => console.error('webhook: failed to send payment-failed email:', err))
  }

  const internalEmail = process.env.CONTACT_EMAIL
  if (internalEmail) {
    await sendMail(
      internalEmail,
      `Monthly donation payment failed — ${amount}`,
      `
        <p><strong>Payment failed</strong></p>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email || 'Not provided')}</p>
        <p><strong>Amount:</strong> ${amount}</p>
        <p><strong>Failure reason:</strong> ${escapeHtml(failureReason)}</p>
        <p><strong>Date:</strong> ${formatDate()}</p>
      `,
      'Gwags Website',
    ).catch(err => console.error('webhook: failed to send internal notification email:', err))
  }
}

export async function POST(req: NextRequest) {
  // Signature verification requires the raw, unparsed request body.
  const rawBody = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing Stripe signature.' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (err) {
    console.error('webhook: signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 })
  }

  // Processing errors (including email failures) are logged but must never
  // block the 200 response below — Stripe retries on non-2xx responses, and
  // the event itself was received and verified successfully regardless of
  // whether our follow-up emails succeed.
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent)
        break
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription)
        break
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break
      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice)
        break
      default:
        // Unhandled event type — acknowledge without processing or logging.
        break
    }
  } catch (err) {
    console.error(`webhook: error while processing ${event.type}:`, err)
  }

  return NextResponse.json({ received: true })
}
