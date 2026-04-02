// tests/e2e/home.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    // Wait for the page to fully load including server data
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
  })

  test('renders the banner swiper', async ({ page }) => {
    await expect(page.locator('.swiper')).toBeVisible()
  })

  test('renders the article list', async ({ page }) => {
    // The <ul> is inside BodyNews — wait for at least one ArticleCard to appear
    await expect(page.locator('li.group').first()).toBeVisible({ timeout: 15_000 })
  })

  test('shows load more button when articles exist', async ({ page }) => {
    // Wait for articles to load first, then check for the button
    await page.locator('li.group').first().waitFor({ timeout: 15_000 })
    await expect(page.getByText('Cargar más noticias')).toBeVisible({ timeout: 10_000 })
  })

  test('search returns results', async ({ page }) => {
    // Two search bars exist (Header mobile + Navbar desktop) — target the navbar one
    const navbar     = page.locator('nav[aria-label="Navegación principal"]')
    const searchInput = navbar.getByPlaceholder('Buscar...')

    // Wait for the initial news fetch to complete before searching
    await page.locator('li.group').first().waitFor({ timeout: 15_000 })

    await searchInput.fill('valorant')
    await expect(page.locator('[role="listbox"]')).toBeVisible({ timeout: 5_000 })
  })
})