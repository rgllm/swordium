import { describe, it, expect } from '@jest/globals'
import { renderHook, act } from '@testing-library/react'

import { useIsClient } from './useIsClient'

describe('useIsClient hook', () => {
  it('should return false on initial render', () => {
    const { result } = renderHook(() => useIsClient())

    // On the first render (server-side), isClient should be false
    expect(result.current).toBe(false)
  })

  it('should return true after the effect runs (client-side)', () => {
    const { result } = renderHook(() => useIsClient())

    // Initially false
    expect(result.current).toBe(false)

    // After the effect runs (simulating client-side rendering)
    act(() => {
      // This triggers the useEffect
      jest.runAllTimers()
    })

    // Now it should be true
    expect(result.current).toBe(true)
  })
})
