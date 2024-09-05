import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/lib/auth'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (isAuthenticated()) {
    redirect('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full min-h-screen flex items-center justify-center flex-col bg-zinc-900 p-6">
        <h1 className="text-6xl font-extrabold mb-5">J.A.R.V.I.S</h1>
        <p className="text-medium text-muted-foreground text-center w-[550px]">
          The Stark Access Manager is an app designed to streamline the control
          of access tags and visitor management at Stark Tower. Built to
          integrate seamlessly with the J.A.R.V.I.S, it simplifies the
          registration and monitoring of access, enhances security, and
          generates detailed reports. Featuring an intuitive interface, the app
          transforms the management of entries and exits, providing efficiency
          and organization to the tower`s security.
        </p>
      </div>
      <div className="w-full flex items-center justify-center p-6">
        {children}
      </div>
    </div>
  )
}
