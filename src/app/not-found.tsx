import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-50 to-zinc-100">
      <div className="text-center max-w-xl mx-auto px-4">
        <h1 className="text-6xl font-bold text-zinc-800 mb-4">404</h1>
        <h2 className="text-2xl font-medium text-zinc-700 mb-6">Page Not Found</h2>
        <p className="text-zinc-600 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button asChild size="lg">
          <Link href="/">Return to Homepage</Link>
        </Button>
      </div>
    </main>
  )
}
