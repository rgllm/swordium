import { test, expect } from '@playwright/test'
import initialData from './data.json' assert { type: 'json' }
import { ARTICLES_KEY } from '../src/lib/utils'

test.describe('Home', () => {
  const baseUrl = 'http://localhost:3000'

  test('should load the home page and display articles', async ({ page }) => {
    // Set articles data in localStorage before testing
    await page.addInitScript(
      (data, key) => {
        localStorage.setItem(key, JSON.stringify(data))
      },
      initialData,
      'articles',
    )

    await page.goto(baseUrl)

    await expect(page).toHaveTitle(/Swordium/)
    await expect(page.locator('main')).toBeVisible()

    const articleCards = page.locator('[href^="/article/"]')
    await expect(articleCards.first()).toBeVisible({ timeout: 5000 })

    const articlesCount = await articleCards.count()
    expect(articlesCount).toBeGreaterThan(0)
  })

  test('should filter articles by category', async ({ page }) => {
    // Set articles data in localStorage before testing
    await page.addInitScript(
      (data, key) => {
        localStorage.setItem(key, JSON.stringify(data))
      },
      initialData,
      ARTICLES_KEY,
    )

    await page.goto(baseUrl)
    await expect(page.locator('main')).toBeVisible()

    const categoryButtons = page.getByRole('button')
    const initialArticles = page.locator('[href^="/article/"]')
    const initialCount = await initialArticles.count()

    const categoriesCount = await categoryButtons.count()
    if (categoriesCount > 1) {
      await categoryButtons.nth(1).click()
      await page.waitForTimeout(500)

      const filteredArticles = page.locator('[href^="/article/"]')
      const filteredCount = await filteredArticles.count()

      expect(filteredCount).toBeLessThanOrEqual(initialCount)
    }
  })

  test('should navigate to article when clicking on a post card', async ({
    page,
  }) => {
    // Set articles data in localStorage before testing
    await page.addInitScript(
      (data, key) => {
        localStorage.setItem(key, JSON.stringify(data))
      },
      initialData,
      ARTICLES_KEY,
    )

    await page.goto(baseUrl)
    await expect(page.locator('main')).toBeVisible()

    const articleCards = page.locator('[href^="/article/"]')
    await expect(articleCards.first()).toBeVisible({ timeout: 5000 })

    const count = await articleCards.count()
    if (count > 0) {
      const cardTitle = await articleCards.first().locator('h2').textContent()
      await articleCards.first().click()

      await expect(page.url()).toContain('/article/')
      if (cardTitle) {
        await expect(
          page.getByRole('heading').filter({ hasText: cardTitle }),
        ).toBeVisible()
      }
    }
  })
})
