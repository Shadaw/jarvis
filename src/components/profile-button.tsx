import { cookies } from 'next/headers'
import { ChevronDown, LogOut } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback } from './ui/avatar'

import { getInitials } from '@/lib/utils'

export function ProfileButton() {
  const name = cookies().get('name')?.value
  const email = cookies().get('email')?.value

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 outline-none">
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium">{name}</span>
          <span className="text-xs text-muted-foreground">{email}</span>
        </div>

        <Avatar>
          <AvatarFallback>{getInitials(name!)}</AvatarFallback>
        </Avatar>

        <ChevronDown className="size-4 text-muted-foreground"></ChevronDown>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <a href="/api/sign-out">
            <LogOut className="mr-2 size-4" />
            Sign out
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
