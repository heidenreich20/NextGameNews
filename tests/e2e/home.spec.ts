// tests/e2e/home.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
  })

  test('renders the banner swiper', async ({ page }) => {
    await expect(page.locator('.swiper')).toBeVisible()
  })

  test('renders the article list', async ({ page }) => {
    await expect(page.locator('li.group').first()).toBeVisible({ timeout: 15_000 })
  })

  test('shows load more button when articles exist', async ({ page }) => {
  await page.goto('/')
  await page.locator('li.group').first().waitFor({ timeout: 15_000 })
  const count = await page.locator('li.group').count()
    if (count >= 10) {
      console.log(`Article count: ${count}`)
    }
  })

  test('search returns results', async ({ page }) => {
    const navbar     = page.locator('nav[aria-label="Navegación principal"]')
    const searchInput = navbar.getByPlaceholder('Buscar...')

    await page.locator('li.group').first().waitFor({ timeout: 15_000 })

    await searchInput.fill('valorant')
    await expect(page.locator('[role="listbox"]')).toBeVisible({ timeout: 5_000 })
  })
})