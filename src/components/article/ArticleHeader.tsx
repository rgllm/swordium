'use client'

import { PencilIcon } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { ArticleStatus } from '@/types/ArticleStatus'

type ArticleHeaderProps = {
  title: string
  category: string
  status: ArticleStatus
  slug: string
  showEditButton: boolean
}

export function ArticleHeader({
  title,
  category,
  status,
  slug,
  showEditButton = false,
}: ArticleHeaderProps) {
  return (
    <header className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#3a3631] md:text-4xl">
          {title}
        </h1>
        {showEditButton && (
          <Link href={`/article/${slug}/edit`}>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 text-[#8a8073] hover:text-[#3a3631]"
            >
              <PencilIcon size={16} />
              Edit Article
            </Button>
          </Link>
        )}
      </div>
      <div className="mb-2 text-sm text-[#8a8073]">
        {status} - {category}
      </div>
    </header>
  )
}
