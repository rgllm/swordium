import { test, expect } from '@playwright/test'

import articlesMock from './articles.json' assert { type: 'json' }

test.describe('Home', () => {
  const baseUrl = 'http://localhost:3000'

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(
      ({ data, key }) => {
        localStorage.setItem(key, JSON.stringify(data))
      },
      { data: articlesMock, key: 'articles' },
    )
  })

  test('should load homepage and show articles', async ({ page }) => {
    await page.goto(baseUrl)

    await expect(page).toHaveTitle(/Swordium/)
    await expect(page.locator('main')).toBeVisible()

    const cards = page.locator('[href^="/article/"]')

    await expect(cards.first()).toBeVisible({ timeout: 5000 })
    expect(await cards.count()).toBeGreaterThan(0)
  })

  test('should filter articles by category', async ({ page }) => {
    await page.goto(baseUrl)

    await expect(page.locator('main')).toBeVisible()

    const buttons = page.getByRole('button')
    const cards = page.locator('[href^="/article/"]')
    const before = await cards.count()

    await buttons.nth(1).click()
    await page.waitForTimeout(500)

    expect(
      await page.locator('[href^="/article/"]').count(),
    ).toBeLessThanOrEqual(before)
  })

  test('should go to article', async ({ page }) => {
    await page.goto(baseUrl)

    await expect(page.locator('main')).toBeVisible()

    const cards = page.locator('[href^="/article/"]')

    await expect(cards.first()).toBeVisible({ timeout: 5000 })

    if ((await cards.count()) > 0) {
      await cards.first().click()
      await expect(page).toHaveURL(/\/article\//)
    }
  })
})
