import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'

const DB_PATH = join(process.cwd(), 'reminder-emails.json')

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    let emails: string[] = []
    try {
      const existing = await readFile(DB_PATH, 'utf-8')
      emails = JSON.parse(existing)
    } catch {
      // file doesn't exist yet
    }

    emails.push(email.trim())
    await writeFile(DB_PATH, JSON.stringify(emails, null, 2))

    console.log(`[reminder] Stored email: ${email}`)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[reminder] Error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
