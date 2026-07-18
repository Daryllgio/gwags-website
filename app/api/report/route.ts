import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
import { join } from 'path'

const DB_PATH = join(process.cwd(), 'reported-problems.json')

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    let reports: { message: string; at: string }[] = []
    try {
      const existing = await readFile(DB_PATH, 'utf-8')
      reports = JSON.parse(existing)
    } catch {
      // file doesn't exist yet
    }

    reports.push({ message: message.trim().slice(0, 500), at: new Date().toISOString() })
    await writeFile(DB_PATH, JSON.stringify(reports, null, 2))

    console.log('[report] Stored problem report')
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[report] Error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
