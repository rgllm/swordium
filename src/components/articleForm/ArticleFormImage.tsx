import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { UseFormReturn } from "react-hook-form"
import ImageUpload from "../imageUpload"
import { ArticleFormValues } from "./schema"

type ArticleFormImageProps = {
  form: UseFormReturn<ArticleFormValues>
  imageKey: number
}

export function ArticleFormImage({ form, imageKey }: ArticleFormImageProps) {
  return (
    <div>
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem className="h-full">
            <FormLabel className="text-base font-medium">Featured Image</FormLabel>
            <div className="mt-2 h-[calc(100%-2rem)] min-h-[250px] border rounded-lg overflow-hidden">
              <FormControl>
                <ImageUpload key={imageKey} value={field.value} onChange={field.onChange} />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}