import { Button } from "../ui/button"
import { CardFooter } from "../ui/card"
import { Save } from "lucide-react"

type ArticleFormFooterProps = {
  isSubmitting?: boolean
}

export function ArticleFormFooter({ isSubmitting }: ArticleFormFooterProps) {
  return (
    <CardFooter className="px-0 pt-6 flex justify-end gap-4">
      <Button type="submit" className="gap-2" disabled={isSubmitting}>
        <Save className="h-4 w-4" />
        Save Article
      </Button>
    </CardFooter>
  )
}