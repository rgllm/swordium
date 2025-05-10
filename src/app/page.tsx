'use client'

import ShowcaseSection from "@/components/showcase";
import { useArticles } from "@/lib/useArticles";
import { ARTICLES_KEY } from "@/lib/utils";
import { ArticleStatus } from "@/types/ArticleStatus";

export default function Home() {
  const { articles } = useArticles(ARTICLES_KEY)
  const featuredArticle = articles?.filter((article) => article.status === ArticleStatus.PUBLISHED)?.[0]

  if(!featuredArticle) {
    return(<main className="container mx-auto py-12">
      <h1>No articles</h1>
  </main>)
  }

  return (
    <main className="container mx-auto py-12">
      <ShowcaseSection {...featuredArticle}/>
    </main>
  );
}
