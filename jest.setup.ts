// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mocking next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(),
  })),
}))

// Mocking @clerk/nextjs
jest.mock('@clerk/nextjs', () => ({
  useUser: jest.fn(),
}))
