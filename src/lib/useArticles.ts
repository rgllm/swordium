'use client'

import { Article } from '@/types/Article'
import { ArticleStatus } from '@/types/ArticleStatus'
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

	function updateArticle(slug: string, updatedArticle: Partial<Article>) {
		setArticles(prev =>
			prev.map(article =>
				article.slug === slug
					? { ...article, ...updatedArticle }
					: article
			)
		)
	}

	function publishArticle(slug: string) {
		setArticles(prev =>
			prev.map(article =>
				article.slug === slug && article.status === ArticleStatus.DRAFT
					? { ...article, status: ArticleStatus.PUBLISHED }
					: article
			)
		)
	}

	function getArticleBySlug(slug: string) {
		return articles.find(article => article.slug === slug)
	}

	return { articles, addArticle, updateArticle, publishArticle, getArticleBySlug }
}