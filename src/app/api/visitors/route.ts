import { verify } from 'jsonwebtoken'
import { headers } from 'next/headers'

import { prisma } from '@/lib/prisma'

type TokenPayload = {
  iat: number
  exp: number
  sub: string
}

async function getVisitors() {
  const headersList = headers()
  const authHeader = headersList.get('authorization')

  if (!authHeader) {
    return Response.json({}, { status: 401 })
  }

  const [, token] = authHeader.split(' ')

  verify(token, process.env.JWT_SECRET!) as TokenPayload

  const rooms = await prisma.visitor.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      cpf: true,
      birthdate: true,
      isVisiting: true,
      createdAt: true,
      updatedAt: true,
      room: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  return Response.json({ data: rooms })
}

async function addVisitor(request: Request) {
  const { name, cpf, email, birthdate, destinationRoom } = await request.json()

  const headersList = headers()
  const authHeader = headersList.get('authorization')

  if (!authHeader) {
    return Response.json({}, { status: 401 })
  }

  const [, token] = authHeader.split(' ')

  const { sub } = verify(token, process.env.JWT_SECRET!) as TokenPayload

  const visitorWithSameEmail = await prisma.visitor.findUnique({
    where: { cpf },
  })

  if (visitorWithSameEmail) {
    return Response.json(
      {
        message: 'Visitor with same CPF already exists.',
      },
      { status: 400 },
    )
  }

  const roomCapacity = await prisma.visitor.count({
    where: {
      roomId: destinationRoom,
      isVisiting: true,
    },
  })

  if (roomCapacity === 3) {
    return Response.json(
      {
        message: 'This room is already full',
      },
      { status: 400 },
    )
  }

  const data = await prisma.visitor.create({
    data: {
      name,
      cpf,
      email,
      birthdate,
      isVisiting: true,
      roomId: destinationRoom,
    },
    include: {
      room: true,
    },
  })

  await prisma.log.createMany({
    data: [
      {
        userId: sub,
        action: 'REGISTER',
        reference: `${name} / ${cpf}`,
        destination: 'Visitors',
      },
      {
        userId: sub,
        action: 'ADD',
        reference: `${name} / ${cpf}`,
        destination: data.room.name,
      },
    ],
  })

  return Response.json(data)
}

async function removeVisitor(request: Request) {
  const { visitorId } = await request.json()

  const headersList = headers()
  const authHeader = headersList.get('authorization')

  if (!authHeader) {
    return Response.json({}, { status: 401 })
  }

  const [, token] = authHeader.split(' ')

  const { sub } = verify(token, process.env.JWT_SECRET!) as TokenPayload

  const data = await prisma.visitor.update({
    where: {
      id: visitorId,
    },
    select: {
      name: true,
      cpf: true,
      room: {
        select: {
          name: true,
        },
      },
    },
    data: {
      isVisiting: false,
    },
  })

  await prisma.log.create({
    data: {
      userId: sub,
      action: 'REMOVE',
      reference: `${data.name} / ${data.cpf}`,
      destination: data.room.name,
    },
  })

  return Response.json({
    message: 'visitor successfully removed',
  })
}

export const GET = getVisitors
export const POST = addVisitor
export const PUT = removeVisitor
