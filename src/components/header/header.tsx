import Link from "next/link"

import SignButton from "../signbutton"

export function Header() {
  return (
    <header className="top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between mx-auto">
        <div className="flex items-center">
          <Link href="/">
            <h1 className="text-3xl font-extrabold tracking-tight">
              Swordium
            </h1>
          </Link>
        </div>
         <nav className="flex items-center space-x-8">
          <SignButton/>
         </nav>
      </div>
    </header>
  )
}