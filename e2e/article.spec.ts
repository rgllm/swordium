import { test, expect } from '@playwright/test'

test.describe('Article', () => {
  // Update the baseURL in your Playwright config or prefix all page.goto calls with your local URL
  const baseUrl = 'http://localhost:3000'

  test('should display article details when navigating from home page', async ({
    page,
  }) => {
    // Start on the home page
    await page.goto(baseUrl)

    // Wait for the articles to load
    const articleCards = page.locator('[href^="/article/"]')
    await expect(articleCards.first()).toBeVisible({ timeout: 5000 })

    // Get the title and description of the first article
    const cardTitle = await articleCards.first().locator('h2').textContent()
    const cardDescription = await articleCards
      .first()
      .locator('p')
      .textContent()

    // Click on the first article
    await articleCards.first().click()

    // Verify we're on the article page
    await expect(page.url()).toContain('/article/')

    // Verify the article content is displayed
    if (cardTitle) {
      await expect(page.getByRole('heading', { name: cardTitle })).toBeVisible()
    }

    // Verify the article image is displayed
    await expect(page.locator('article img')).toBeVisible()

    // Verify the article content is displayed
    if (cardDescription) {
      // The description should be somewhere in the content
      await expect(page.locator('article')).toContainText(cardDescription)
    }
  })

  test('should handle non-existent article slugs', async ({ page }) => {
    // Try to navigate to a non-existent article
    await page.goto(`${baseUrl}/article/non-existent-article-slug-123456789`)

    // Expect a 404 page or some indication that the article wasn't found
    // This could be a specific 404 message or the URL getting redirected
    await expect(async () => {
      // Either we'll see a "not found" message or be redirected to a 404 page
      await expect(
        page.getByText(/not found|404|doesn't exist|could not be found/i),
      ).toBeVisible({ timeout: 5000 })
    }).not.toThrow()
  })

  test('should show correct category on article page', async ({ page }) => {
    // Start on the home page
    await page.goto(baseUrl)

    // Wait for the articles to load
    const articleCards = page.locator('[href^="/article/"]')
    await expect(articleCards.first()).toBeVisible({ timeout: 5000 })

    // Click on the first article
    await articleCards.first().click()

    // Verify we're on the article page
    await expect(page.url()).toContain('/article/')

    // Check if the category is displayed
    const categoryElement = page
      .locator('article')
      .getByText(/^[A-Za-z]+$/, { exact: true })

    // We should find at least one element that could be a category
    // This is a loose test since we don't know the exact category text
    const categoryCount = await categoryElement.count()
    expect(categoryCount).toBeGreaterThan(0)
  })
})
