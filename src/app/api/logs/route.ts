import { verify } from 'jsonwebtoken'
import { headers } from 'next/headers'

import { prisma } from '@/lib/prisma'

type TokenPayload = {
  iat: number
  exp: number
  sub: string
}

async function getLogs() {
  const headersList = headers()
  const authHeader = headersList.get('authorization')

  if (!authHeader) {
    return Response.json({}, { status: 401 })
  }

  const [, token] = authHeader.split(' ')

  verify(token, process.env.JWT_SECRET!) as TokenPayload

  const logs = await prisma.log.findMany({
    select: {
      id: true,
      action: true,
      reference: true,
      destination: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return Response.json({ data: logs })
}

export const GET = getLogs
