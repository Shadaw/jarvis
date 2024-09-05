'use client'
import { useQuery } from '@tanstack/react-query'

import CreateRoomModal from '@/components/rooms/create-room-modal'
import RoomCard from '@/components/rooms/room-card'

import { getRooms } from '@/http/get-rooms'

export default function Home() {
  const { data } = useQuery({
    queryKey: ['rooms'],
    queryFn: getRooms,
  })

  return (
    <div className="flex-1">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Rooms</h2>
        <CreateRoomModal />
      </div>
      <div className="grid gap-4 grid-cols-3">
        {data && data.map((room) => <RoomCard key={room.id} data={room} />)}
      </div>
    </div>
  )
}
