import { NextRequest, NextResponse } from 'next/server'
import { isScholarsApplicationOpen } from '@/lib/featureFlags'

/* Route-level enforcement of the Scholars application's open/closed state —
   this is what actually stops a visitor who manually types /apply/scholars
   in Production; the disabled "Apply now" button alone is not a security
   boundary. The API route also checks the same flag independently (see
   app/api/apply/scholars/route.ts) so a direct API call is never protected
   by middleware alone. */
export function middleware(req: NextRequest) {
  if (isScholarsApplicationOpen()) {
    return NextResponse.next()
  }

  if (req.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.json(
      { error: 'Applications are not currently open.' },
      { status: 403 },
    )
  }

  return NextResponse.redirect(new URL('/initiatives/scholars', req.url))
}

export const config = {
  matcher: ['/apply/scholars', '/api/apply/scholars'],
}
