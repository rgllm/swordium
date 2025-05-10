"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { ArticleFormValues, articleSchema } from "./articleSchema";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ImageUpload } from "../imageUpload/imageUpload";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Pencil, Save } from "lucide-react";
import { ArticleStatus } from "@/types/ArticleStatus";
import { useArticles } from "@/lib/useArticles";
import { ARTICLES_KEY, slugify } from "@/lib/utils";


export function ArticleForm() {
  const [imageKey, setImageKey] = useState(0)
  const { addArticle } = useArticles(ARTICLES_KEY)


  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: '',
      description: '',
      image: '',
      category: 'engineering',
      content: ''
    }
  })

  async function onSubmit(status: ArticleStatus) {
    const formValues = form.getValues()
    const slug = slugify(formValues?.title)

    addArticle({...formValues, slug, status})
    
    form.reset()
    setImageKey(prev => prev + 1)
  }


  return (
    <Card className="w-full mx-auto">
    <CardHeader className="border-b bg-zinc-50">
      <CardTitle className="text-2xl font-bold">Create New Article</CardTitle>
      <CardDescription>Fill in the details to create your new article</CardDescription>
    </CardHeader>
    <CardContent className="p-6">
      <Form {...form}>
        <form className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter article title" className="h-11" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="product">Product</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">Summary</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[120px] resize-none"
                        placeholder="Brief description of your article"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
          </div>

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

          <CardFooter className="px-0 pt-6 flex justify-end gap-4">
            <Button onClick={() => onSubmit(ArticleStatus.DRAFT)} variant="outline" className="gap-2">
              <Save className="h-4 w-4" />
              Save as draft
            </Button>
            <Button onClick={() => onSubmit(ArticleStatus.PUBLISHED)} className="gap-2">
              <Pencil className="h-4 w-4" />
              Publish article
            </Button>
          </CardFooter>
        </form>
      </Form>
    </CardContent>
  </Card>
  )
}
