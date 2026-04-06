import { test, expect } from '@playwright/test'

test.describe('Article page', () => {

  test('navigates from home to article and renders content', async ({ page }) => {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })

    const firstArticleLink = page
      .locator('li.group .hidden.csm\\:flex a')
      .first()

    await firstArticleLink.waitFor({ timeout: 15_000 })
    await firstArticleLink.click()

    await expect(page).toHaveURL(/\/analisis\//, { timeout: 10_000 })
    await expect(page.locator('article')).toBeVisible({ timeout: 10_000 })
    await expect(page.locator('article h1')).not.toBeEmpty({ timeout: 10_000 })
  })

  test('shows not found for non-existent article', async ({ page }) => {
    await page.goto('http://localhost:3000/analisis/00000000-0000-0000-0000-000000000000')
    await expect(page.getByRole('heading', { name: /404|no encontrado/i })).toBeVisible({ timeout: 10_000 })
  })
})