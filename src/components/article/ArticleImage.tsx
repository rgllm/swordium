import Image from "next/image"

type ArticleImageProps = {
  image: string | null
  title: string
}

export function ArticleImage({ image, title }: ArticleImageProps) {
  return (
    <div className="w-full h-[250px] md:h-[300px] relative mb-8 rounded-lg overflow-hidden bg-[#e9a23f]">
      <Image 
        src={image || "/placeholder.svg"} 
        alt={title} 
        fill 
        className="object-cover" 
        priority 
      />
    </div>
  )
}