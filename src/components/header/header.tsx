'use client'

import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { Pencil } from 'lucide-react'

import SignButton from '../signbutton'
import { Button } from '../ui/button'

export function Header() {
	const { isSignedIn } = useUser()

	return (
		<header className="top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
			<div className="container mx-auto flex h-16 items-center justify-between">
				<div className="flex items-center">
					<Link href="/">
						<h1 className="text-3xl font-extrabold tracking-tight">
							Swordium
						</h1>
					</Link>
				</div>
				<nav className="flex items-center space-x-8">
					{isSignedIn && (
            <Link href="/new">
              <Button>
							  <Pencil className="h-4 w-4" />
								Add new article
						  </Button>
						</Link>
					)}
					<SignButton />
				</nav>
			</div>
		</header>
	)
}
