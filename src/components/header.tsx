import { ProfileButton } from './profile-button'

export default async function Header() {
  return (
    <header className="flex items-center justify-between border-b pb-4">
      <div className="flex items-center gap-3">
        <h1 className="font-extrabold text-xl">J.A.R.V.I.S</h1>
      </div>

      <ProfileButton />
    </header>
  )
}
