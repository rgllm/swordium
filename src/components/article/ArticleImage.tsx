import Image from 'next/image'

type ArticleImageProps = {
  image: string
  title: string
}

export function ArticleImage({ image, title }: ArticleImageProps) {
  return (
    <div className="relative mb-8 h-[250px] w-full overflow-hidden rounded-lg md:h-[300px]">
      <Image src={image} alt={title} fill className="object-cover" priority />
    </div>
  )
}
