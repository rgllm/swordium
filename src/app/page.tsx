'use client'

import { useState } from 'react'

import { PostCard } from '@/components/PostCard/PostCard'
import ShowcaseSection from '@/components/ShowcaseSection'
import { useArticles } from '@/lib/useArticles'
import { ARTICLES_KEY } from '@/lib/utils'
import { useFilteredArticles } from '@/lib/useFilteredArticles'
import { useIsClient } from '@/lib/useIsClient'
import { Button } from '@/components/ui/button'

export default function Home() {
	const { articles } = useArticles(ARTICLES_KEY)
	const [activeCategory, setActiveCategory] = useState<string>('all')
	const isClient = useIsClient()
	const { featured, categories, filteredArticles } = useFilteredArticles(articles, activeCategory)

	if (!featured || !isClient) {
		return (
			<main className="min-h-screen flex items-center justify-center">
				<div className="text-center max-w-xl mx-auto px-4">
					<h1 className="text-4xl font-bold text-zinc-800 mb-4">Swordium</h1>
					<p className="text-zinc-500">No articles available yet.</p>
				</div>
			</main>
		)
	}

	return (
		<main className="min-h-screen">
			<div className="container mx-auto px-4 py-16">

				<ShowcaseSection {...featured} />
				
				{categories.length > 1 && (
					<div className="flex flex-wrap gap-2 my-12 justify-center">
						{categories.map(category => (
							<Button
								key={category}
								onClick={() => setActiveCategory(category)}
								className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
									activeCategory === category
										? 'bg-zinc-900 text-white'
										: 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
								}`}
							>
								{category}
							</Button>
						))}
					</div>
				)}
				
				{filteredArticles.length > 0 && (
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
							{filteredArticles.map((article) => (
								<PostCard
									key={article.slug}
									slug={article.slug}
									title={article.title}
									description={article.description}
									image={article.image}
								/>
							))}
						</div>
				)}
			</div>
		</main>
	)
}
