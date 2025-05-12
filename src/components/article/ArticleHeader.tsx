'use client'

import { PencilIcon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

type ArticleHeaderProps = {
  title: string
  category: string
  slug: string
  showEditButton: boolean
}

export function ArticleHeader({ title, category, slug, showEditButton = false }: ArticleHeaderProps) {
  return (
    <header className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#3a3631]">{title}</h1>
        {showEditButton && (
          <Link href={`/article/${slug}/edit`}>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 text-[#8a8073] hover:text-[#3a3631]"
          >
            <PencilIcon size={16} />
            <span>Edit Article</span>
          </Button>
          </Link>
        )}
      </div>
      <div className="text-[#8a8073] text-sm mb-2">{category}</div>
    </header>
  )
}