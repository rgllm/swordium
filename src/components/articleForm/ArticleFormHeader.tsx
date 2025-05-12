import { CardDescription, CardHeader, CardTitle } from '../ui/card'

export function ArticleFormHeader() {
  return (
    <CardHeader className="border-b bg-zinc-50">
      <CardTitle className="text-2xl font-bold">Article Editor</CardTitle>
      <CardDescription>Fill in the article details</CardDescription>
    </CardHeader>
  )
}
