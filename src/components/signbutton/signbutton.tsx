'use client'

import { useState } from 'react'
import { SignInButton, SignUpButton, useAuth } from '@clerk/nextjs'
import { LogIn, LogOut, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function SignButton() {
  const { isSignedIn, signOut } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    await signOut()
    setIsLoading(false)
  }

  if (isSignedIn) {
    return (
      <Button
        variant="outline"
        onClick={handleSignOut}
        disabled={isLoading}
        className="cursor-pointer gap-2"
      >
        <LogOut className="size-4" />
        Sign Out
      </Button>
    )
  }

  return (
    <div className="flex gap-2">
      <SignInButton mode="modal">
        <Button variant="outline" className="cursor-pointer gap-2">
          <LogIn className="size-4" />
          Sign In
        </Button>
      </SignInButton>

      <SignUpButton mode="modal">
        <Button className="cursor-pointer gap-2">
          <UserPlus className="size-4" />
          Sign Up
        </Button>
      </SignUpButton>
    </div>
  )
}
