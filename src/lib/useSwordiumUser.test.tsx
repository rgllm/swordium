/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import { renderHook } from '@testing-library/react'
import { useUser } from '@clerk/nextjs'

import { useSwordiumUser } from './useSwordiumUser'
import { Role } from '@/types/Role'

// Mock the useUser hook from Clerk
const mockUseUser = useUser as jest.MockedFunction<typeof useUser>

describe('useSwordiumUser hook', () => {
  beforeEach(() => {
    // Reset the mock before each test
    jest.clearAllMocks()
  })

  it('should return null role, isSignedIn false, and isLoading true when user is not loaded', () => {
    // Setup the mock to return a not loaded state
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
    // Setup the mock to return a loaded state but no user
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
    // Setup the mock to return a user with ADMIN role
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
    // Setup the mock to return a user with MEMBER role
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
    // Setup the mock to return a user with an invalid role
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
    // Setup the mock to return a user with no organization memberships
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
