'use client'
import { usePathname } from 'next/navigation'
import { notFound } from 'next/navigation'

import { useArticles } from '@/lib/useArticles'
import { ARTICLES_KEY } from '@/lib/utils'
import { useSwordiumUser } from '@/lib/useSwordiumUser'
import { Article } from '@/components/article'
import { Role } from '@/types/Role'

export default function ArticlePage() {
  const { role, isSignedIn } = useSwordiumUser()
  const { getArticleBySlug } = useArticles(ARTICLES_KEY)
  const pathname = usePathname()
  const slug = pathname.replace('/article/', '')
  const article = getArticleBySlug(slug)
  const isCurrentUserAdmin = role === Role.ADMIN

  if (!article) {
    return notFound()
  }

  return (
    <main className="min-h-screen pb-16">
      {!isSignedIn && <Article.MembersOnlyDialog />}
      <article className="mx-auto max-w-2xl px-4 pt-8">
        <Article.Header
          title={article.title}
          status={article.status}
          category={article.category}
          slug={article.slug}
          showEditButton={isCurrentUserAdmin}
        />
        <Article.Image image={article.image} title={article.title} />
        <Article.Content
          description={article.description}
          content={article.content}
        />
      </article>
    </main>
  )
}
