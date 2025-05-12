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
    // Clear localStorage before each test
    localStorage.clear()
  })

  it('should initialize with empty array when no data in localStorage', () => {
    const { result } = renderHook(() => useArticles(testKey))

    expect(result.current.articles).toEqual([])
  })

  it('should load initial data from localStorage if present', () => {
    // Set up initial data in localStorage
    localStorage.setItem(testKey, JSON.stringify([mockArticle]))

    const { result } = renderHook(() => useArticles(testKey))

    expect(result.current.articles).toEqual([mockArticle])
  })

  it('should add a new article', () => {
    const { result } = renderHook(() => useArticles(testKey))

    // Add a new article
    act(() => {
      result.current.addArticle(mockArticle)
    })

    // Check if article was added
    expect(result.current.articles).toEqual([mockArticle])

    // Check if localStorage was updated
    const storedData = JSON.parse(localStorage.getItem(testKey) || '[]')
    expect(storedData).toEqual([mockArticle])
  })

  it('should update an existing article', () => {
    // Set up initial data
    localStorage.setItem(testKey, JSON.stringify([mockArticle]))

    const { result } = renderHook(() => useArticles(testKey))

    const updatedTitle = 'Updated Title'

    // Update the article
    act(() => {
      result.current.updateArticle(mockArticle.slug, { title: updatedTitle })
    })

    // Check if article was updated
    expect(result.current.articles[0].title).toBe(updatedTitle)
    expect(result.current.articles[0].description).toBe(mockArticle.description) // Other fields unchanged

    // Check if localStorage was updated
    const storedData = JSON.parse(localStorage.getItem(testKey) || '[]')
    expect(storedData[0].title).toBe(updatedTitle)
  })

  it('should publish a draft article', () => {
    // Set up initial data with a DRAFT article
    localStorage.setItem(testKey, JSON.stringify([mockArticle]))

    const { result } = renderHook(() => useArticles(testKey))

    // Publish the article
    act(() => {
      result.current.publishArticle(mockArticle.slug)
    })

    // Check if article status was updated to PUBLISHED
    expect(result.current.articles[0].status).toBe(ArticleStatus.PUBLISHED)

    // Check if localStorage was updated
    const storedData = JSON.parse(localStorage.getItem(testKey) || '[]')
    expect(storedData[0].status).toBe(ArticleStatus.PUBLISHED)
  })

  it('should not publish an already published article', () => {
    // Set up initial data with a PUBLISHED article
    const publishedArticle = { ...mockArticle, status: ArticleStatus.PUBLISHED }
    localStorage.setItem(testKey, JSON.stringify([publishedArticle]))

    const { result } = renderHook(() => useArticles(testKey))

    // Try to publish the already published article
    act(() => {
      result.current.publishArticle(publishedArticle.slug)
    })

    // Status should remain PUBLISHED
    expect(result.current.articles[0].status).toBe(ArticleStatus.PUBLISHED)
  })

  it('should find an article by slug', () => {
    // Set up initial data with multiple articles
    const article1 = { ...mockArticle, slug: 'article-1' }
    const article2 = { ...mockArticle, slug: 'article-2' }
    localStorage.setItem(testKey, JSON.stringify([article1, article2]))

    const { result } = renderHook(() => useArticles(testKey))

    // Find article by slug
    const found = result.current.getArticleBySlug('article-2')

    // Check if correct article was found
    expect(found).toEqual(article2)

    // Try to find a non-existent article
    const notFound = result.current.getArticleBySlug('non-existent')
    expect(notFound).toBeUndefined()
  })
})
