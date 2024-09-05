'use client'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

export interface NavLinkProps extends LinkProps {
  children: ReactNode
}

export default function NavLink(props: NavLinkProps) {
  const pathName = usePathname()

  return (
    <Link
      data-current={pathName === props.href}
      className="flex items-center gap-2 mb-5 data-[current=true]:font-bold"
      {...props}
    />
  )
}
