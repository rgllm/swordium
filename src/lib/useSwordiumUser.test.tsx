/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import { renderHook } from '@testing-library/react'
import { useUser } from '@clerk/nextjs'

import { useSwordiumUser } from './useSwordiumUser'
import { Role } from '@/types/Role'

const mockUseUser = useUser as jest.MockedFunction<typeof useUser>

describe('useSwordiumUser hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return null role, isSignedIn false, and isLoading true when user is not loaded', () => {
    mockUseUser.mockReturnValue({
      user: undefined,
      isLoaded: false,
      isSignedIn: false,
    } as any)

    const { result } = renderHook(() => useSwordiumUser())

    expect(result.current).toEqual({
      role: null,
      isSignedIn: false,
      isLoading: true,
    })
  })

  it('should return null role, isSignedIn false, and isLoading true when user is null', () => {
    mockUseUser.mockReturnValue({
      user: null,
      isLoaded: true,
      isSignedIn: false,
    } as any)

    const { result } = renderHook(() => useSwordiumUser())

    expect(result.current).toEqual({
      role: null,
      isSignedIn: false,
      isLoading: true,
    })
  })

  it('should return ADMIN role when user has admin role', () => {
    mockUseUser.mockReturnValue({
      user: {
        organizationMemberships: [{ role: 'org:admin' }],
      },
      isLoaded: true,
      isSignedIn: true,
    } as any)

    const { result } = renderHook(() => useSwordiumUser())

    expect(result.current).toEqual({
      role: Role.ADMIN,
      isSignedIn: true,
      isLoading: false,
    })
  })

  it('should return MEMBER role when user has member role', () => {
    mockUseUser.mockReturnValue({
      user: {
        organizationMemberships: [{ role: 'org:member' }],
      },
      isLoaded: true,
      isSignedIn: true,
    } as any)

    const { result } = renderHook(() => useSwordiumUser())

    expect(result.current).toEqual({
      role: Role.MEMBER,
      isSignedIn: true,
      isLoading: false,
    })
  })

  it('should return null role when user has an invalid role', () => {
    mockUseUser.mockReturnValue({
      user: {
        organizationMemberships: [{ role: 'org:invalid_role' }],
      },
      isLoaded: true,
      isSignedIn: true,
    } as any)

    const { result } = renderHook(() => useSwordiumUser())

    expect(result.current).toEqual({
      role: null,
      isSignedIn: true,
      isLoading: false,
    })
  })

  it('should return null role when user has no organization memberships', () => {
    mockUseUser.mockReturnValue({
      user: {
        organizationMemberships: [],
      },
      isLoaded: true,
      isSignedIn: true,
    } as any)

    const { result } = renderHook(() => useSwordiumUser())

    expect(result.current).toEqual({
      role: null,
      isSignedIn: true,
      isLoading: false,
    })
  })
})
