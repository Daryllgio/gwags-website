import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getResendClient, getFromEmail } from '@/lib/mail'
import { claimEventOnce } from '@/lib/idempotency'
import { getDonationsEmail } from '@/lib/emailRouting'
import { getStripe } from '@/lib/stripe'
import { ONE_TIME_DONATION_DESCRIPTION } from '@/lib/donation'

export const runtime = 'nodejs'

function requireEnv(value: string | undefined, name: string): string {
  if (!value) throw new Error(`${name} is not set`)
  return value
}

const stripe = getStripe()
const webhookSecret = requireEnv(process.env.STRIPE_WEBHOOK_SECRET, 'STRIPE_WEBHOOK_SECRET')

const NAVY = '#0A1128'
const GOLD = '#D4AF37'

/* Description set by /api/create-payment-intent for standalone one-time
   donations. Subscription invoices also fire payment_intent.succeeded, but
   Stripe generates those PaymentIntents internally and never sets this exact
   description — checking it reliably excludes monthly renewal charges from the
   one-time donor/internal emails below. Shared constant so this and the
   reminder cron's eligibility check stay in lockstep. */
const ONE_TIME_DESCRIPTION = ONE_TIME_DONATION_DESCRIPTION

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

/* Currency-aware money formatter (invoice amounts carry their own currency). */
const formatMoney = (cents: number, currency: string) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: currency.toUpperCase() }).format(cents / 100)

/* ONE Gwags-branded thank-you email per successful monthly payment — used for
   both the initial payment and every renewal. The donated amount is woven into
   the prose (no separate receipt email, no invoice-style line-item breakdown),
   per the intended donor experience. Bilingual via the donor's stored `lang`.
   Deliberately NOT a tax receipt. */
function monthlyPaymentEmail(
  lang: 'en' | 'fr',
  o: { amount: string; isInitial: boolean; portalUrl: string | null; name: string },
): { subject: string; html: string } {
  const manage = o.portalUrl
  if (lang === 'fr') {
    return {
      subject: 'Merci pour votre don mensuel à Gwags',
      html: `
        <p>Cher/Chère ${escapeHtml(o.name)},</p>
        <p>${o.isInitial
          ? `Merci de devenir donateur mensuel de Gwags Global Impact Institution avec un don de <strong>${o.amount} par mois</strong>. Votre premier don mensuel a bien été reçu.`
          : `Merci pour votre soutien mensuel continu à Gwags Global Impact Institution. Nous venons de recevoir votre don mensuel de <strong>${o.amount}</strong>.`}</p>
        <p>Votre générosité nous permet de planifier sur le long terme et de soutenir durablement nos programmes.</p>
        ${manage ? `<p><a href="${manage}" style="color:${NAVY}; font-weight:600;">Gérer votre don mensuel</a></p>` : ''}
        <p>Pour toute question, écrivez-nous à <a href="mailto:donate@gwags.org" style="color:${NAVY};">donate@gwags.org</a>.</p>
        <p>Avec gratitude,<br>L'équipe Gwags</p>
      `,
    }
  }
  return {
    subject: 'Thank you for your monthly donation to Gwags',
    html: `
      <p>Dear ${escapeHtml(o.name)},</p>
      <p>${o.isInitial
        ? `Thank you for becoming a monthly donor to Gwags Global Impact Institution with a gift of <strong>${o.amount} per month</strong>. Your first monthly donation has been received.`
        : `Thank you for your continued monthly support of Gwags Global Impact Institution. We've just received your monthly donation of <strong>${o.amount}</strong>.`}</p>
      <p>Your generosity gives us the stability to plan ahead and sustain the programs that matter most.</p>
      ${manage ? `<p><a href="${manage}" style="color:${NAVY}; font-weight:600;">Manage your monthly donation</a></p>` : ''}
      <p>If you have any questions, please reach out to us at <a href="mailto:donate@gwags.org" style="color:${NAVY};">donate@gwags.org</a>.</p>
      <p>With gratitude,<br>The Gwags Team</p>
    `,
  }
}

/* Bilingual one-time-donation thank-you, mirroring monthlyPaymentEmail's
   pattern — the donor's `lang` is read from their Customer (now stamped at
   create-payment-intent time). */
function oneTimeThankYouEmail(lang: 'en' | 'fr', o: { name: string; amount: string }): { subject: string; html: string } {
  if (lang === 'fr') {
    return {
      subject: 'Merci pour votre don à Gwags',
      html: `
        <p>Cher/Chère ${escapeHtml(o.name)},</p>
        <p>Merci pour votre généreux don de <strong>${o.amount}</strong> à Gwags Global Impact Institution.</p>
        <p>Votre don ponctuel soutient directement les programmes et partenariats qui constituent notre mission — en construisant l'infrastructure qui aide les organisations à créer un impact durable.</p>
        <p>Pour toute question concernant votre don, écrivez-nous à <a href="mailto:donate@gwags.org" style="color:${NAVY};">donate@gwags.org</a>.</p>
        <p>Avec gratitude,<br>L'équipe Gwags</p>
      `,
    }
  }
  return {
    subject: 'Thank you for your donation to Gwags',
    html: `
      <p>Dear ${escapeHtml(o.name)},</p>
      <p>Thank you for your generous gift of <strong>${o.amount}</strong> to Gwags Global Impact Institution.</p>
      <p>Your one-time donation directly supports the programs and partnerships that make up our mission — building the infrastructure that helps organizations create lasting impact.</p>
      <p>If you have any questions about your donation, please reach out to us at <a href="mailto:donate@gwags.org" style="color:${NAVY};">donate@gwags.org</a>.</p>
      <p>With gratitude,<br>The Gwags Team</p>
    `,
  }
}

/* Bilingual failed-monthly-payment notice. Donor language comes from the
   Customer via retrieveCustomerSafe, same as handleInvoicePaymentSucceeded. */
function paymentFailedEmail(lang: 'en' | 'fr', o: { name: string; portalUrl: string | null }): { subject: string; html: string } {
  const manage = o.portalUrl
  if (lang === 'fr') {
    return {
      subject: "Action requise : votre don mensuel à Gwags n'a pas pu être traité",
      html: `
        <p>Cher/Chère ${escapeHtml(o.name)},</p>
        <p>Nous souhaitions vous informer que votre dernier don mensuel à Gwags Global Impact Institution n'a pas pu être traité.</p>
        <p>Cela arrive parfois pour des raisons simples, comme une carte expirée ou des coordonnées de facturation à mettre à jour. Votre don récurrent est toujours actif, et nous apprécierions votre aide pour le remettre en ordre.</p>
        ${manage ? `<p><a href="${manage}" style="color:${NAVY}; font-weight:600;">Mettre à jour vos informations de paiement</a></p>` : ''}
        <p>Pour toute question, écrivez-nous à <a href="mailto:donate@gwags.org" style="color:${NAVY};">donate@gwags.org</a>.</p>
        <p>Merci pour votre soutien continu,<br>L'équipe Gwags</p>
      `,
    }
  }
  return {
    subject: 'Action needed: your monthly donation to Gwags could not be processed',
    html: `
      <p>Dear ${escapeHtml(o.name)},</p>
      <p>We wanted to let you know that your most recent monthly donation to Gwags Global Impact Institution could not be processed.</p>
      <p>This sometimes happens for simple reasons, like an expired card or updated billing details. Your recurring gift is still active, and we'd appreciate your help getting it back on track.</p>
      ${manage ? `<p><a href="${manage}" style="color:${NAVY}; font-weight:600;">Update your payment details</a></p>` : ''}
      <p>If you have any questions, please reach out to us at <a href="mailto:donate@gwags.org" style="color:${NAVY};">donate@gwags.org</a>.</p>
      <p>Thank you for your continued support,<br>The Gwags Team</p>
    `,
  }
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
  const resend = getResendClient()
  const { error } = await resend.emails.send({
    from: `"${fromName}" <${getFromEmail()}>`,
    to,
    subject,
    html: emailShell(bodyHtml),
  })
  if (error) throw new Error(error.message)
}

/* Subscription events only carry a customer ID, not the customer's email/name,
   so this looks them up. Never throws — if the lookup fails (in practice this
   should be rare, since Stripe only sends events for customers that genuinely
   exist), the internal notification email should still go out rather than the
   whole handler aborting silently. */
async function retrieveCustomerSafe(customerId: string): Promise<{ email: string | null; name: string; lang: 'en' | 'fr' }> {
  try {
    const customer = await stripe.customers.retrieve(customerId)
    if (customer.deleted) return { email: null, name: 'Anonymous donor', lang: 'en' }
    return {
      email: customer.email,
      name: customer.name || 'Anonymous donor',
      // Donor language is stamped onto the Customer at donation time (see
      // create-subscription / upgrade-to-monthly) so renewal emails localize.
      lang: customer.metadata?.lang === 'fr' ? 'fr' : 'en',
    }
  } catch (err) {
    console.error('webhook: failed to retrieve customer:', err)
    return { email: null, name: 'Anonymous donor', lang: 'en' }
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
      return_url: `${process.env.SITE_URL || 'http://localhost:3000'}/get-involved?portal=return`,
    })
    return session.url
  } catch (err) {
    console.error('webhook: failed to create billing portal session:', err)
    return null
  }
}

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  if (paymentIntent.description !== ONE_TIME_DESCRIPTION) return

  // Donor email comes from the Customer (create-payment-intent always creates
  // one with the donor's email) rather than `receipt_email`, so we don't rely
  // on a field whose only other effect is triggering a duplicate Stripe receipt.
  const customerId = typeof paymentIntent.customer === 'string' ? paymentIntent.customer : paymentIntent.customer?.id
  const cust = customerId ? await retrieveCustomerSafe(customerId) : { email: null as string | null, name: 'Anonymous donor', lang: 'en' as const }
  const email = cust.email
  const name = paymentIntent.metadata?.donor_name || cust.name || 'Anonymous donor'
  const amount = formatAmount(paymentIntent.amount)

  if (email) {
    const { subject, html } = oneTimeThankYouEmail(cust.lang, { name, amount })
    await sendMail(email, subject, html, 'Gwags Global Impact Institution')
      .catch(err => console.error('webhook: failed to send donor thank-you email:', err))
  }

  const internalEmail = getDonationsEmail()
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

/* Fires for both the initial subscription payment (billing_reason
   'subscription_create') and each successful renewal ('subscription_cycle').
   This is the single source of truth for "a monthly donation payment
   succeeded", so the donor gets exactly ONE combined confirmation+thank-you
   email per successful monthly charge. It intentionally replaces the old
   customer.subscription.created email, which fired on subscription creation
   BEFORE the first payment was confirmed (the subscription is created
   `default_incomplete`). The internal "new subscription" notification fires
   only on the initial payment, now gated on real payment success. */
async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  const billingReason = invoice.billing_reason
  if (billingReason !== 'subscription_create' && billingReason !== 'subscription_cycle') return
  const isInitial = billingReason === 'subscription_create'

  const customerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id

  const cust = customerId ? await retrieveCustomerSafe(customerId) : { email: null as string | null, name: 'Anonymous donor', lang: 'en' as const }
  const lang = cust.lang
  const email = invoice.customer_email || cust.email
  const name = invoice.customer_name || cust.name
  const amount = formatMoney(invoice.amount_paid, invoice.currency)
  const reference = invoice.number || invoice.id // internal notification only
  const portalUrl = customerId ? await getPortalUrl(customerId) : null

  if (email) {
    const { subject, html } = monthlyPaymentEmail(lang, { amount, isInitial, portalUrl, name })
    await sendMail(email, subject, html, 'Gwags Global Impact Institution')
      .catch(err => console.error('webhook: failed to send monthly payment confirmation email:', err))
  }

  // Internal notification on the START of a monthly donation only (not every
  // renewal), preserving the prior "new subscription" alert but now gated on a
  // genuinely successful first payment.
  if (isInitial) {
    const internalEmail = getDonationsEmail()
    if (internalEmail) {
      await sendMail(
        internalEmail,
        `New monthly donation started — ${amount} / month`,
        `
          <p><strong>New monthly donation</strong></p>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email || 'Not provided')}</p>
          <p><strong>Monthly amount:</strong> ${amount}</p>
          <p><strong>Reference:</strong> ${escapeHtml(reference)}</p>
          <p><strong>Date:</strong> ${formatDate()}</p>
        `,
        'Gwags Website',
      ).catch(err => console.error('webhook: failed to send internal notification email:', err))
    }
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id
  const { email, name } = await retrieveCustomerSafe(customerId)
  const amountCents = subscription.items.data[0]?.price.unit_amount ?? 0
  const amount = formatAmount(amountCents)

  // No donor-facing email here — they initiated the cancellation themselves.
  const internalEmail = getDonationsEmail()
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
  const customerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id
  const cust = customerId ? await retrieveCustomerSafe(customerId) : { email: null as string | null, name: 'Anonymous donor', lang: 'en' as const }
  const email = invoice.customer_email || cust.email
  const name = invoice.customer_name || cust.name
  const amount = formatAmount(invoice.amount_due)

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
    const { subject, html } = paymentFailedEmail(cust.lang, { name, portalUrl })
    await sendMail(email, subject, html, 'Gwags Global Impact Institution')
      .catch(err => console.error('webhook: failed to send payment-failed email:', err))
  }

  const internalEmail = getDonationsEmail()
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

  // Claim this event ID before doing any work, so two concurrent deliveries
  // of the same event can't both process it (see lib/idempotency.ts for the
  // atomic mechanism, its current status, and why unconfigured = process
  // normally rather than fail-closed). Handler behavior below this point is
  // unchanged — this only decides whether they run at all.
  const shouldProcess = await claimEventOnce(event.id)
  if (!shouldProcess) {
    console.log(`webhook: duplicate delivery of ${event.type} (${event.id}) — already processed, skipping.`)
    return NextResponse.json({ received: true, duplicate: true })
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
      case 'invoice.payment_succeeded':
        // Initial monthly payment + every renewal — the single source of truth
        // for a successful monthly donation (see handler). Replaces the former
        // customer.subscription.created email, which fired before payment.
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice)
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
