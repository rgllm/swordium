'use client'

import Link from "next/link"
import { Pencil } from "lucide-react"

import SignButton from "../signbutton"
import { Button } from "../ui/button"
import { useSwordiumUser } from "@/lib/useSwordiumUser"
import { Role } from "@/types/Role"

export function Header() {
	const { role } = useSwordiumUser()

  return (
    <header className="top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center">
          <Link href="/">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Swordium</h1>
          </Link>
        </div>
        <nav className="flex items-center space-x-3 sm:space-x-8">
          {role === Role.ADMIN && (
            <Link href="/new">
              <Button size="sm" className="sm:size-default">
                <Pencil className="h-4 w-4" />
                <span className="hidden sm:ml-2 sm:inline">Add new article</span>
              </Button>
            </Link>
          )}
          <SignButton />
        </nav>
      </div>
    </header>
  )
}
