import { test, expect } from '@playwright/test'
import { clerk } from '@clerk/testing/playwright'
import dotenv from 'dotenv'
import path from 'path'

import articlesMock from './articles.json' assert { type: 'json' }

dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const authFile = path.join(__dirname, '../playwright/.clerk/user.json')

test.describe('Article Page', () => {
  const baseUrl = 'http://localhost:3000'
  const publishedArticle = articlesMock.find(
    (article) => article.status === 'published',
  )

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(
      ({ data, key }) => {
        localStorage.setItem(key, JSON.stringify(data))
      },
      { data: articlesMock, key: 'articles' },
    )
  })

  test('should display members-only dialog when not signed in', async ({
    page,
  }) => {
    await page.goto(`${baseUrl}/article/${publishedArticle?.slug}`)

    await expect(page.locator('text=Members Only Content')).toBeVisible()
    await expect(
      page.locator('text=Only signin users can read the article'),
    ).toBeVisible()
    await expect(page.getByText('Return to Homepage')).toBeVisible()
  })

  test('should navigate back to home page from the dialog', async ({
    page,
  }) => {
    await page.goto(`${baseUrl}/article/${publishedArticle?.slug}`)

    await page.getByText('Return to Homepage').click()

    await expect(page).toHaveURL(baseUrl)
    await expect(page.locator('main')).toBeVisible()
  })

  test('should display article content when signed in as member', async ({
    page,
  }) => {
    await page.goto(`${baseUrl}/article/${publishedArticle?.slug}`)

    await clerk.signIn({
      page,
      signInParams: {
        strategy: 'password',
        identifier: process.env.E2E_CLERK_USER_USERNAME!,
        password: process.env.E2E_CLERK_USER_PASSWORD!,
      },
    })

    await page.context().storageState({ path: authFile })

    await expect(page.locator('article')).toBeVisible()
    await expect(
      page.getByRole('heading', { name: publishedArticle?.title, level: 1 }),
    ).toBeVisible()
    await expect(page.locator('main')).not.toContainText('Members Only Content')
    await expect(page.locator('img')).toBeVisible()
    await expect(page.locator('article')).toContainText(
      publishedArticle?.description || '',
    )
    await expect(page.locator('article')).toContainText(
      publishedArticle?.content || '',
    )
  })
})
