import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface PostCardProps {
  slug: string
  title: string
  description: string
  image: string
}

export function PostCard({ slug, title, description, image }: PostCardProps) {
  return (
    <Link href={`/article/${slug}`} className="group">
      <div className="flex flex-col md:flex-row max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all border border-zinc-100 hover:border-zinc-200">
        <div className="w-full md:w-[200px] h-[200px] bg-zinc-100 relative flex-shrink-0">
          <Image
            src={image}
            alt={title}
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
          <h2 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-zinc-700 transition-colors">{title}</h2>
          <p className="text-zinc-600 mb-6 line-clamp-2">{description}</p>
          
          <div className="flex items-center text-sm font-medium text-zinc-500 group-hover:text-zinc-800 transition-colors">
            Read article
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  )
}