import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface PostCardProps {
  slug: string
  title: string
  description: string
  image: string
}

export function PostCard({ slug, title, description, image }: PostCardProps) {
  return (
    <Link href={`/article/${slug}`} className="group">
      <div className="mx-auto flex max-w-4xl flex-col overflow-hidden rounded-lg border border-zinc-100 bg-white shadow-sm transition-all hover:border-zinc-200 hover:shadow-md md:flex-row">
        <div className="relative h-[200px] w-full flex-shrink-0 bg-zinc-100 md:w-[200px]">
          <Image
            src={image}
            alt={title}
            width={200}
            height={200}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
          <h2 className="mb-3 text-xl font-bold text-zinc-900 transition-colors group-hover:text-zinc-700">
            {title}
          </h2>
          <p className="mb-6 line-clamp-2 text-zinc-600">{description}</p>

          <div className="flex items-center text-sm font-medium text-zinc-500 transition-colors group-hover:text-zinc-800">
            Read article
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  )
}
