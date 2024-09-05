import { redirect } from 'next/navigation'

import Header from '@/components/header'
import QueryClientProvider from '@/components/query-provider'
import AsideMenu from '@/components/sidebar-menu'

import { isAuthenticated } from '@/lib/auth'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (!isAuthenticated()) {
    redirect('/auth/sign-in')
  }

  return (
    <div className="p-6 mx-auto max-w-[1400px] ">
      <Header />
      <main className="flex mt-12">
        <QueryClientProvider>
          <AsideMenu />
          {children}
        </QueryClientProvider>
      </main>
    </div>
  )
}
