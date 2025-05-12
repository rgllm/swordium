import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from '@jest/globals'

import { useArticles } from './useArticles'
import { Article } from '@/types/Article'
import { ArticleStatus } from '@/types/ArticleStatus'

describe('useArticles hook', () => {
  const testKey = 'test-articles'
  const mockArticle: Article = {
    slug: 'test-article',
    title: 'Test Article',
    description: 'This is a test article',
    image: '/test-image.jpg',
    status: ArticleStatus.DRAFT,
    category: 'Test Category',
    content: 'Test content here',
  }

  beforeEach(() => {
    localStorage.clear()
  })

  it('should initialize with empty array when no data in localStorage', () => {
    const { result } = renderHook(() => useArticles(testKey))

    expect(result.current.articles).toEqual([])
  })

  it('should load initial data from localStorage if present', () => {
    localStorage.setItem(testKey, JSON.stringify([mockArticle]))

    const { result } = renderHook(() => useArticles(testKey))

    expect(result.current.articles).toEqual([mockArticle])
  })

  it('should add a new article', () => {
    const { result } = renderHook(() => useArticles(testKey))

    act(() => {
      result.current.addArticle(mockArticle)
    })

    expect(result.current.articles).toEqual([mockArticle])

    const storedData = JSON.parse(localStorage.getItem(testKey) || '[]')
    expect(storedData).toEqual([mockArticle])
  })

  it('should update an existing article', () => {
    localStorage.setItem(testKey, JSON.stringify([mockArticle]))

    const { result } = renderHook(() => useArticles(testKey))

    const updatedTitle = 'Updated Title'

    act(() => {
      result.current.updateArticle(mockArticle.slug, { title: updatedTitle })
    })

    expect(result.current.articles[0].title).toBe(updatedTitle)
    expect(result.current.articles[0].description).toBe(mockArticle.description)

    const storedData = JSON.parse(localStorage.getItem(testKey) || '[]')
    expect(storedData[0].title).toBe(updatedTitle)
  })

  it('should publish a draft article', () => {
    localStorage.setItem(testKey, JSON.stringify([mockArticle]))

    const { result } = renderHook(() => useArticles(testKey))

    act(() => {
      result.current.publishArticle(mockArticle.slug)
    })

    expect(result.current.articles[0].status).toBe(ArticleStatus.PUBLISHED)

    const storedData = JSON.parse(localStorage.getItem(testKey) || '[]')
    expect(storedData[0].status).toBe(ArticleStatus.PUBLISHED)
  })

  it('should not publish an already published article', () => {
    const publishedArticle = { ...mockArticle, status: ArticleStatus.PUBLISHED }
    localStorage.setItem(testKey, JSON.stringify([publishedArticle]))

    const { result } = renderHook(() => useArticles(testKey))

    act(() => {
      result.current.publishArticle(publishedArticle.slug)
    })

    expect(result.current.articles[0].status).toBe(ArticleStatus.PUBLISHED)
  })

  it('should find an article by slug', () => {
    const article1 = { ...mockArticle, slug: 'article-1' }
    const article2 = { ...mockArticle, slug: 'article-2' }
    localStorage.setItem(testKey, JSON.stringify([article1, article2]))

    const { result } = renderHook(() => useArticles(testKey))

    const found = result.current.getArticleBySlug('article-2')

    expect(found).toEqual(article2)

    const notFound = result.current.getArticleBySlug('non-existent')
    expect(notFound).toBeUndefined()
  })
})
