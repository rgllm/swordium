import { z } from 'zod'

import { Article } from '@/types/Article'
import { ArticleStatus } from '@/types/ArticleStatus'

type UseArticleFormSchemaOptions = {
  article?: Article
}

const ArticleStatusSchema = z.nativeEnum(ArticleStatus)

export function useArticleFormSchema(options: UseArticleFormSchemaOptions) {
  const schema = z.object({
		title: z.string().min(1, 'Title is required'),
		description: z.string().min(1, 'Description is required'),
		status: ArticleStatusSchema,
		image: z.string().min(1, 'Image is required'),
		category: z.string().min(1, 'Category is required'),
		content: z.string().min(1, 'Content is required'),
		slug: z.string(),
  })

  const initialValues: Article = {
		slug: options?.article?.slug || '',
		title: options?.article?.title || '',
		description: options?.article?.description || '',
		image: options?.article?.image || '',
		status: options?.article?.status || ArticleStatus.DRAFT,
		category: options?.article?.category || '',
		content: options?.article?.content || '',
  }

  return { schema, initialValues }
}
