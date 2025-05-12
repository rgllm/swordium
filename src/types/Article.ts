import { ArticleStatus } from './ArticleStatus'

export type Article = {
  slug: string
  title: string
  description: string
  image: string
  status: ArticleStatus
  category: string
  content: string
}
