import { FileClock, House, User } from 'lucide-react'

import NavLink from './nav-link'

export default async function SidebarMenu() {
  return (
    <div className="w-64">
      <nav className="flex flex-col">
        <NavLink href="/">
          <User className="size-5" />
          Visitors
        </NavLink>
        <NavLink href="/rooms">
          <House className="size-5" />
          Rooms
        </NavLink>
        <NavLink href="/log">
          <FileClock className="size-5" />
          Log
        </NavLink>
      </nav>
    </div>
  )
}
