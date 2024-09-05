import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { cookies } from 'next/headers'

import { prisma } from '@/lib/prisma'

const daysInMiliseconds = 60 * 60 * 24 * 7 // 7 days

async function authenticate(request: Request) {
  const { email, password } = await request.json()

  const userFromEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!userFromEmail) {
    return Response.json({ message: 'Invalid credentials.' }, { status: 400 })
  }

  const isPasswrodValid = await compare(password, userFromEmail.passwordHash)

  if (!isPasswrodValid) {
    return Response.json({ message: 'Invalid credentials.' }, { status: 400 })
  }

  const { id } = userFromEmail

  const token = sign({}, process.env.JWT_SECRET!, {
    subject: id,
    expiresIn: daysInMiliseconds,
  })

  cookies().set('token', token, {
    path: '/',
    maxAge: daysInMiliseconds,
  })

  cookies().set('name', userFromEmail.name, {
    path: '/',
    maxAge: daysInMiliseconds,
  })

  cookies().set('email', email, {
    path: '/',
    maxAge: daysInMiliseconds,
  })

  return Response.json({ token })
}

export const POST = authenticate
