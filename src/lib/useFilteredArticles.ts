import { useMemo, useState, useCallback, useEffect } from 'react'
import { Article } from '@/types/Article'
import { ArticleStatus } from '@/types/ArticleStatus'
import { useSwordiumUser } from './useSwordiumUser'
import { Role } from '@/types/Role'

export function useFilteredArticles(articles: Article[], activeCategory: string) {
	const { role } = useSwordiumUser()
	const [displayCount, setDisplayCount] = useState(4)
	
	const visibleArticles = useMemo(
		() => role === Role.ADMIN ? articles : articles.filter(a => a.status === ArticleStatus.PUBLISHED),
		[articles, role]
	)

	const featured = useMemo(
		() => {
			const published = visibleArticles.filter(a => a.status === ArticleStatus.PUBLISHED)
			return published.length > 0 ? published[published.length - 1] : undefined
		},
		[visibleArticles]
	)

	const categories = useMemo(
		() => ['all', ...new Set(visibleArticles.map(a => a.category))],
		[visibleArticles]
	)

	const allFilteredArticles = useMemo(
		() => 
			activeCategory === 'all'
				? visibleArticles
				: visibleArticles.filter(a => a.category === activeCategory),
		[visibleArticles, activeCategory]
	)
	
	useEffect(() => {
		setDisplayCount(4)
	}, [activeCategory])
	
	const filteredArticles = useMemo(
		() => allFilteredArticles.slice(0, displayCount),
		[allFilteredArticles, displayCount]
	)
	
	const hasMore = filteredArticles.length < allFilteredArticles.length
	
	const loadMore = useCallback(() => {
		setDisplayCount(prev => prev + 4)
	}, [])

	return {
		featured,
		categories,
		filteredArticles,
		hasMore,
		loadMore
	}
}