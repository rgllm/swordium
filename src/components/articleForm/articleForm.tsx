'use client'

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form } from "../ui/form"
import { articleSchema } from "./schema"
import { Card, CardContent } from "../ui/card"
import { useArticles } from "@/lib/useArticles"
import { ARTICLES_KEY, slugify } from "@/lib/utils"
import { ArticleFormHeader } from "./ArticleFormHeader"
import { ArticleFormBasicInfo } from "./ArticleFormBasicInfo"
import { ArticleFormImage } from "./ArticleFormImage"
import { ArticleFormContent } from "./ArticleFormContent"
import { ArticleFormFooter } from "./ArticleFormFooter"
import { Article } from "@/types/Article"

type ArticleFormProps = {
  article?: Article
  onSuccess?: () => void
}

export function ArticleForm({ article, onSuccess }: ArticleFormProps) {
  const [imageKey, setImageKey] = useState(0)
  const { addArticle, updateArticle } = useArticles(ARTICLES_KEY)

  const form = useForm<Article>({
    resolver: zodResolver(articleSchema),
    defaultValues: article
  })

  async function onSubmit(data: Article) {
    if (article && article?.slug) {
      updateArticle(article.slug, { ...data })
    } else {
      const slug = slugify(data?.title)
      addArticle({ ...data, slug })
    }
    
    form.reset()
    setImageKey((prev) => prev + 1)
    onSuccess?.()
  }

  useEffect(() => {
    if (article) {
      form.reset({
        slug: article.slug,
        title: article.title,
        description: article.description,
        image: article.image,
        status: article.status,
        category: article.category,
        content: article.content
      })
    }
  }, [article, form])

  return (
    <Card className="w-full mx-auto">
      <ArticleFormHeader/>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ArticleFormBasicInfo form={form} />
              <ArticleFormImage form={form} imageKey={imageKey} />
            </div>
            
            <ArticleFormContent form={form} />
            
            <ArticleFormFooter 
              isSubmitting={form.formState.isSubmitting}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}