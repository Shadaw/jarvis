import { verify } from 'jsonwebtoken'
import { headers } from 'next/headers'

import { prisma } from '@/lib/prisma'

type TokenPayload = {
  iat: number
  exp: number
  sub: string
}

async function createRoom(request: Request) {
  const { name, capacity } = await request.json()

  const headersList = headers()
  const authHeader = headersList.get('authorization')

  if (!authHeader) {
    return Response.json({}, { status: 401 })
  }

  const [, token] = authHeader.split(' ')

  const { sub } = verify(token, process.env.JWT_SECRET!) as TokenPayload

  const response = await prisma.room.create({
    data: {
      name,
      capacity,
      userId: sub,
    },
    include: {
      visitors: true,
    },
  })

  await prisma.log.create({
    data: {
      userId: sub,
      action: 'CREATE',
      reference: name,
      destination: 'Rooms',
    },
  })

  return Response.json(response)
}

async function getRooms() {
  const headersList = headers()
  const authHeader = headersList.get('authorization')

  if (!authHeader) {
    return Response.json({}, { status: 401 })
  }

  const [, token] = authHeader.split(' ')

  verify(token, process.env.JWT_SECRET!) as TokenPayload

  const rooms = await prisma.room.findMany({
    select: {
      id: true,
      name: true,
      capacity: true,
      createdAt: true,
      updatedAt: true,
      visitors: {
        select: {
          id: true,
          name: true,
          email: true,
          cpf: true,
        },
        where: {
          isVisiting: true,
        },
      },
    },
  })

  return Response.json({ data: rooms })
}

export const GET = getRooms
export const POST = createRoom
