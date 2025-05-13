'use client'

import { useRouter, notFound, useParams } from 'next/navigation'

import { ARTICLES_KEY } from '@/lib/utils'
import { Role } from '@/types/Role'
import { useArticles } from '@/lib/useArticles'
import { useSwordiumUser } from '@/lib/useSwordiumUser'
import ArticleForm from '@/components/articleForm'

export default function EditArticlePage() {
  const params = useParams()
  const slug = params.slug as string
  const router = useRouter()
  const { role } = useSwordiumUser()

  const { getArticleBySlug } = useArticles(ARTICLES_KEY)
  const article = getArticleBySlug(slug)

  if (!article || role !== Role.ADMIN) {
    return notFound()
  }

  const handleSuccess = () => {
    router.push(`/article/${slug}`)
  }

  return (
    <main className="container mx-auto py-12">
      <ArticleForm article={article} onSuccess={handleSuccess} />
    </main>
  )
}
