'use client'
import { usePathname } from "next/navigation"
import Image from "next/image"

import { useArticles } from "@/lib/useArticles"
import { ARTICLES_KEY } from "@/lib/utils"
import { notFound } from "next/navigation"

export default function ArticlePage() {
  const { getArticleBySlug } = useArticles(ARTICLES_KEY)
  const pathname = usePathname()
  const slug = pathname.replace("/article/", "")
  const article = getArticleBySlug(slug)
  
  if (!article) {
    return notFound()
  }
  
  return (
    <main className="min-h-screen pb-16">
      <article className="max-w-2xl mx-auto px-4 pt-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#3a3631]">{article.title}</h1>
          <div className="text-[#8a8073] text-sm mb-2">{article.category}</div>
        </header>
        
        <div className="w-full h-[250px] md:h-[300px] relative mb-8 rounded-lg overflow-hidden bg-[#e9a23f]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="mb-8 text-xl text-[#5c5449] font-medium">
          {article.description}
        </div>
        
        <div className="prose prose-slate max-w-none">
          {article.content}
        </div>
      </article>
    </main>
  )
}