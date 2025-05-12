'use client'

import { useState } from 'react'
import { ArrowDown } from 'lucide-react'

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
  const { featured, categories, filteredArticles, hasMore, loadMore } =
    useFilteredArticles(articles, activeCategory)

  if (!featured || !isClient) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="mx-auto max-w-xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-zinc-800">Swordium</h1>
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
          <div className="my-12 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                variant={activeCategory === category ? 'default' : 'outline'}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        )}

        {filteredArticles.length > 0 && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
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

        {hasMore && (
          <div className="mt-8 flex justify-center">
            <Button
              onClick={loadMore}
              size="lg"
              aria-label="Load more articles"
            >
              <ArrowDown size={16} /> Load More
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
