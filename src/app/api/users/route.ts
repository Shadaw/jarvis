import { hash } from 'bcryptjs'

import { prisma } from '@/lib/prisma'

async function createUser(request: Request) {
  const { name, email, password } = await request.json()

  const userWithSameEmail = await prisma.user.findUnique({
    where: { email },
  })

  if (userWithSameEmail) {
    return Response.json(
      {
        message: 'user with same e-mail already exists.',
      },
      { status: 400 },
    )
  }

  const passwordHash = await hash(password, 6)

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  })

  return Response.json({
    message: 'User created successfully',
  })
}

export const POST = createUser
