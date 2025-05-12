import { UseFormReturn } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Textarea } from '../ui/textarea'
import { ArticleFormValues } from './schema'

type ArticleFormContentProps = {
  form: UseFormReturn<ArticleFormValues>
}

export function ArticleFormContent({ form }: ArticleFormContentProps) {
  return (
    <div className="border-t pt-4">
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
