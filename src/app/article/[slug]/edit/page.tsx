'use client'

import { useRouter, notFound, useParams } from "next/navigation"
import { useArticles } from "@/lib/useArticles"
import { ARTICLES_KEY } from "@/lib/utils"
import ArticleForm from "@/components/articleForm"
import { useSwordiumUser } from "@/lib/useSwordiumUser"
import { Role } from "@/types/Role"

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
      <ArticleForm 
        article={article}
        onSuccess={handleSuccess}
      />
    </main>
  )
}