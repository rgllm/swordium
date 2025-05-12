import { Save } from 'lucide-react'

import { Button } from '../ui/button'
import { CardFooter } from '../ui/card'

type ArticleFormFooterProps = {
  isSubmitting?: boolean
}

export function ArticleFormFooter({ isSubmitting }: ArticleFormFooterProps) {
  return (
    <CardFooter className="flex justify-end gap-4 px-0 pt-6">
      <Button type="submit" className="gap-2" disabled={isSubmitting}>
        <Save className="h-4 w-4" />
        Save Article
      </Button>
    </CardFooter>
  )
}
