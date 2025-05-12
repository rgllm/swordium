import { useMemo, useState, useCallback, useEffect } from 'react'
import { Article } from '@/types/Article'
import { ArticleStatus } from '@/types/ArticleStatus'
import { useSwordiumUser } from './useSwordiumUser'
import { Role } from '@/types/Role'
import { ARTICLES_TO_SHOW } from './utils'

export function useFilteredArticles(
  articles: Article[],
  activeCategory: string,
) {
  const { role } = useSwordiumUser()
  const reversedArticles = articles.reverse()
  const [displayCount, setDisplayCount] = useState(ARTICLES_TO_SHOW)

  const visibleArticles = useMemo(
    () =>
      role === Role.ADMIN
        ? reversedArticles
        : reversedArticles.filter((a) => a.status === ArticleStatus.PUBLISHED),
    [reversedArticles, role],
  )

  const featured = useMemo(
    () => visibleArticles.find((a) => a.status === ArticleStatus.PUBLISHED),
    [visibleArticles],
  )

  const categories = useMemo(
    () => ['all', ...new Set(visibleArticles.map((a) => a.category))],
    [visibleArticles],
  )

  const allFilteredArticles = useMemo(
    () =>
      activeCategory === 'all'
        ? visibleArticles
        : visibleArticles.filter((a) => a.category === activeCategory),
    [visibleArticles, activeCategory],
  )

  useEffect(() => {
    setDisplayCount(ARTICLES_TO_SHOW)
  }, [activeCategory])

  const filteredArticles = useMemo(
    () => allFilteredArticles.slice(0, displayCount),
    [allFilteredArticles, displayCount],
  )

  const hasMore = filteredArticles.length < allFilteredArticles.length

  const loadMore = useCallback(() => {
    setDisplayCount((prev) => prev + ARTICLES_TO_SHOW)
  }, [])

  return {
    featured,
    categories,
    filteredArticles,
    hasMore,
    loadMore,
  }
}
