import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Textarea } from "../ui/textarea"
import { UseFormReturn } from "react-hook-form"
import { Article } from "@/types/Article"

type ArticleFormContentProps = {
  form: UseFormReturn<Article>
}

export function ArticleFormContent({ form }: ArticleFormContentProps) {
  return (
    <div className="pt-4 border-t">
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">Content</FormLabel>
            <FormControl>
              <Textarea
                className="min-h-[300px] resize-none p-4"
                placeholder="Write your article content here..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}