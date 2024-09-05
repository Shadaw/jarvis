import { headers } from 'next/headers'
import { verify } from 'jsonwebtoken'

import { prisma } from '@/lib/prisma'

type TokenPayload = {
  iat: number
  exp: number
  sub: string
}

async function getRoomsAvailable() {
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
    },
  })

  const filteredRooms = []

  for (const room of rooms) {
    const visitorCount = await prisma.visitor.count({
      where: {
        roomId: room.id,
        isVisiting: true,
      },
    })
    if (visitorCount < 3) {
      filteredRooms.push(room)
    }
  }

  return Response.json(filteredRooms)
}

export const GET = getRoomsAvailable
