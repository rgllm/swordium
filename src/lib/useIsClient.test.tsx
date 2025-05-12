import { describe, it, expect } from '@jest/globals'
import { renderHook, waitFor } from '@testing-library/react'
import { useIsClient } from './useIsClient'

describe('useIsClient', () => {
  it('returns true after useEffect runs', async () => {
    const { result } = renderHook(() => useIsClient())

    await waitFor(() => {
      expect(result.current).toBe(true)
    })
  })
})
