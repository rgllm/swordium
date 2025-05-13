import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-zinc-50 to-zinc-100">
      <div className="mx-auto max-w-xl px-4 text-center">
        <h1 className="mb-4 text-6xl font-bold text-zinc-800">404</h1>
        <h2 className="mb-6 text-2xl font-medium text-zinc-700">
          Page Not Found
        </h2>
        <p className="mb-8 text-zinc-600">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link href="/">
          Return to Homepage
          <Button asChild size="lg"></Button>
        </Link>
      </div>
    </main>
  )
}
