type ArticleContentProps = {
  description: string
  content: React.ReactNode
}

export function ArticleContent({ description, content }: ArticleContentProps) {
  return (
    <>
      <div className="mb-8 text-xl text-[#5c5449] font-medium text-justify leading-8">
        {description}
      </div>
      <div className="prose prose-slate max-w-none text-justify leading-8">
        {content}
      </div>
    </>
  )
}