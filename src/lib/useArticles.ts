import { Article } from '@/types/Article'
import { useState, useEffect } from 'react'

function useLocalStorage<T>(key: string, initialValue: T) {
	const [value, setValue] = useState<T>(() => {
		if (typeof window === 'undefined') return initialValue
		const stored = localStorage.getItem(key)
		return stored ? JSON.parse(stored) : initialValue
	})

	useEffect(() => {
		if (typeof window === 'undefined') return
		localStorage.setItem(key, JSON.stringify(value))
	}, [key, value])

	return [value, setValue] as const
}

export function useArticles(key: string) {
	const [articles, setArticles] = useLocalStorage<Article[]>(key, [])

	function addArticle(article: Article) {
		setArticles(prev => [...prev, article])
	}

	function publishArticle(slug: string) {
		setArticles(prev =>
			prev.map(article =>
				article.slug === slug && article.status === 'draft'
					? { ...article, status: 'published' }
					: article
			)
		)
	}

	return { articles, addArticle, publishArticle }
}