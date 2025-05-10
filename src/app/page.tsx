'use client'

import { useState } from 'react'
import { PostCard } from '@/components/PostCard/PostCard'
import ShowcaseSection from '@/components/showcase'
import { useArticles } from '@/lib/useArticles'
import { ARTICLES_KEY } from '@/lib/utils'
import { ArticleStatus } from '@/types/ArticleStatus'

export default function Home() {
	const { articles } = useArticles(ARTICLES_KEY)
	const [activeCategory, setActiveCategory] = useState<string>('all')
	
	const featured = articles.find(a => a.status === ArticleStatus.PUBLISHED)
	const publishedArticles = articles.filter(a => a.status === ArticleStatus.PUBLISHED)
	
	// Get unique categories
	const categories = ['all', ...new Set(publishedArticles.map(article => article.category))]
	
	// Filter articles by category if needed
	const filteredArticles = activeCategory === 'all' 
		? publishedArticles 
		: publishedArticles.filter(article => article.category === activeCategory)

	if (!featured) {
		return (
			<main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-50 to-zinc-100">
				<div className="text-center max-w-xl mx-auto px-4">
					<h1 className="text-4xl font-bold text-zinc-800 mb-4">Welcome to Swordium</h1>
					<p className="text-lg text-zinc-600 mb-6">Your place for interesting discussions and thought-provoking content</p>
					<p className="text-zinc-500">No articles available yet. Check back soon for new content.</p>
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
							<button
								key={category}
								onClick={() => setActiveCategory(category)}
								className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
									activeCategory === category
										? 'bg-zinc-900 text-white'
										: 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
								}`}
							>
								{category.charAt(0).toUpperCase() + category.slice(1)}
							</button>
						))}
					</div>
				)}
				
				{/* Articles grid */}
				{filteredArticles.length > 0 ? (
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
				) : (
					<div className="text-center py-12 text-zinc-500">
						No articles found in this category
					</div>
				)}
			</div>
		</main>
	)
}