'use client'

import { useUser } from '@clerk/nextjs'

import { Role } from '@/types/Role'

function toRole(value: string): Role | null {
  const parsed = value.split(':')[1]
  return Object.values(Role).includes(parsed as Role) ? (parsed as Role) : null
}

export function useSwordiumUser() {
  const { user, isLoaded, isSignedIn } = useUser()

  if (!isLoaded || !user) return { role: null, isSignedIn, isLoading: true }

  const orgRole = user?.organizationMemberships?.[0]?.role as string | undefined

  if (orgRole) {
    const role = toRole(orgRole)

    return { role: role ?? null, isSignedIn, isLoading: false }
  }

  return { role: null, isSignedIn, isLoading: false }
}
