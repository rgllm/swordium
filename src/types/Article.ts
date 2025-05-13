import { ArticleStatus } from './ArticleStatus'

export type Article = {
  category: string
  content: string
  description: string
  image: string
  slug: string
  status: ArticleStatus
  title: string
}
