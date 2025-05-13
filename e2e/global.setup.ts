import { clerkSetup } from '@clerk/testing/playwright'
import { test as setup } from '@playwright/test'

// Ensures that Clerk setup is done before any tests run
setup.describe.configure({
  mode: 'serial',
})

setup('global setup', async () => {
  await clerkSetup()
  if (
    !process.env.E2E_CLERK_USER_USERNAME ||
    !process.env.E2E_CLERK_USER_PASSWORD
  ) {
    throw new Error(
      'Please provide E2E_CLERK_USER_USERNAME and E2E_CLERK_USER_PASSWORD environment variables.',
    )
  }
})
