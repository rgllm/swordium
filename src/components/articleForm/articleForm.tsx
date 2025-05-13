'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Article } from '@/types/Article'
import { ArticleFormBasicInfo } from './ArticleFormBasicInfo'
import { ArticleFormContent } from './ArticleFormContent'
import { ArticleFormFooter } from './ArticleFormFooter'
import { ArticleFormHeader } from './ArticleFormHeader'
import { ArticleFormImage } from './ArticleFormImage'
import { ArticleFormValues, articleSchema } from './schema'
import { ARTICLES_KEY, slugify } from '@/lib/utils'
import { ArticleStatus } from '@/types/ArticleStatus'
import { Card, CardContent } from '../ui/card'
import { Form } from '../ui/form'
import { useArticles } from '@/lib/useArticles'

type ArticleFormProps = {
  article?: Article
  onSuccess?: () => void
}

export function ArticleForm({ article, onSuccess }: ArticleFormProps) {
  const [imageKey, setImageKey] = useState(0)
  const { addArticle, updateArticle } = useArticles(ARTICLES_KEY)

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: article || {
      title: '',
      description: '',
      image: '',
      status: ArticleStatus.DRAFT,
      category: 'engineering',
      content: '',
    },
  })

  async function onSubmit(data: ArticleFormValues) {
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
        content: article.content,
      })
    }
  }, [article, form])

  return (
    <Card className="mx-auto w-full">
      <ArticleFormHeader />
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <ArticleFormBasicInfo form={form} />
              <ArticleFormImage form={form} imageKey={imageKey} />
            </div>

            <ArticleFormContent form={form} />

            <ArticleFormFooter isSubmitting={form.formState.isSubmitting} />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
