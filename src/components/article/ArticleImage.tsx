import Image from "next/image"

type ArticleImageProps = {
  image: string
  title: string
}

export function ArticleImage({ image, title }: ArticleImageProps) {
  return (
    <div className="w-full h-[250px] md:h-[300px] relative mb-8 rounded-lg overflow-hidden">
      <Image 
        src={image} 
        alt={title} 
        fill 
        className="object-cover" 
        priority 
      />
    </div>
  )
}