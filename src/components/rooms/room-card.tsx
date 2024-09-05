import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Avatar, AvatarFallback } from '../ui/avatar'
import ViewRoomModal from './view-room-modal'

import type { Room } from '@/http/get-rooms'
import { getInitials } from '@/lib/utils'

type RoomCardProps = {
  data: Room
}

export default function RoomCard({ data }: RoomCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">{data.name}</p>
          <ViewRoomModal room={data} />
        </div>
      </CardHeader>
      <CardContent className="min-h-16">
        <div className="flex gap-2">
          {data.visitors.map((visitor) => (
            <Avatar key={visitor.id}>
              <AvatarFallback>{getInitials(visitor.name)}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground">
          places {data.visitors.length}/{data.capacity}
        </p>
      </CardFooter>
    </Card>
  )
}
