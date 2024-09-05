import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

async function signOut(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone()

  redirectUrl.pathname = '/auth/sign-in'

  cookies().delete('token')
  cookies().delete('name')
  cookies().delete('email')

  return NextResponse.redirect(redirectUrl)
}

export const GET = signOut
