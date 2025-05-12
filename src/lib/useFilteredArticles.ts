import { useMemo } from 'react'

import { Article } from '@/types/Article'
import { ArticleStatus } from '@/types/ArticleStatus'
import { useSwordiumUser } from './useSwordiumUser'
import { Role } from '@/types/Role'

export function useFilteredArticles(articles: Article[], activeCategory: string) {
	const { role } = useSwordiumUser()
	
	const visibleArticles = useMemo(
		() => role === Role.ADMIN ? articles : articles.filter(a => a.status === ArticleStatus.PUBLISHED),
		[articles, role]
	)

	const featured = useMemo(
		() => visibleArticles.find(a => a.status === ArticleStatus.PUBLISHED),
		[visibleArticles]
	)

	const categories = useMemo(
		() => ['all', ...new Set(visibleArticles.map(a => a.category))],
		[visibleArticles]
	)

	const filteredArticles = useMemo(
		() =>
			activeCategory === 'all'
				? visibleArticles
				: visibleArticles.filter(a => a.category === activeCategory),
		[visibleArticles, activeCategory]
	)

	return {
		featured,
		categories,
		filteredArticles
	}
}