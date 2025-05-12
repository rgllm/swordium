import { z } from 'zod'

import { ArticleStatus } from '@/types/ArticleStatus'

const ArticleStatusSchema = z.nativeEnum(ArticleStatus)

export const articleSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	description: z.string().min(1, 'Description is required'),
	status: ArticleStatusSchema,
	image: z.string().min(1, 'Image is required'),
	category: z.string().min(1, 'Category is required'),
	content: z.string().min(1, 'Content is required'),
	slug: z.string(),
})

export type ArticleFormValues = z.infer<typeof articleSchema>