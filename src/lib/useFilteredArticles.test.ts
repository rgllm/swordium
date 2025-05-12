import { renderHook } from '@testing-library/react'
import { useFilteredArticles } from './useFilteredArticles'
import { ArticleStatus } from '@/types/ArticleStatus'
import { Role } from '@/types/Role'
import { useSwordiumUser } from './useSwordiumUser'
import { Article } from '@/types/Article'

jest.mock('./useSwordiumUser', () => ({
  useSwordiumUser: jest.fn() as jest.Mock,
}))

const ARTICLES_TO_SHOW = 4

const sampleArticles = [
  { id: '1', status: ArticleStatus.PUBLISHED, category: 'engineering' },
  { id: '2', status: ArticleStatus.DRAFT, category: 'marketing' },
  { id: '3', status: ArticleStatus.PUBLISHED, category: 'design' },
  { id: '4', status: ArticleStatus.PUBLISHED, category: 'engineering' },
] as unknown as Article[]

describe('useFilteredArticles', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows all articles for ADMIN role', () => {
    ;(useSwordiumUser as jest.Mock).mockReturnValue({ role: Role.ADMIN })

    const { result } = renderHook(() =>
      useFilteredArticles(sampleArticles, 'all'),
    )

    expect(result.current.filteredArticles.length).toBe(ARTICLES_TO_SHOW)
    expect(result.current.featured?.status).toBe(ArticleStatus.PUBLISHED)
  })

  it('filters only PUBLISHED for non-admin', () => {
    ;(useSwordiumUser as jest.Mock).mockReturnValue({ role: Role.MEMBER })

    const { result } = renderHook(() =>
      useFilteredArticles(sampleArticles, 'all'),
    )

    expect(result.current.filteredArticles.length).toBe(3)
    expect(
      result.current.filteredArticles.every(
        (a) => a.status === ArticleStatus.PUBLISHED,
      ),
    ).toBe(true)
  })

  it('filters by category', () => {
    ;(useSwordiumUser as jest.Mock).mockReturnValue({ role: Role.MEMBER })

    const { result } = renderHook(() =>
      useFilteredArticles(sampleArticles, 'engineering'),
    )

    expect(
      result.current.filteredArticles.every(
        (a) => a.category === 'engineering',
      ),
    ).toBe(true)
  })
})
