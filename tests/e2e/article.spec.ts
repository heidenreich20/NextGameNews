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

  test('shows error page for invalid article ID', async ({ page }) => {
    await page.goto('http://localhost:3000/analisis/invalid-id')
    await expect(page.getByText(/error al cargar/i)).toBeVisible({ timeout: 10_000 })
  })

  test('debug — check article count vs total', async ({ page }) => {
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' })
  await page.locator('li.group').first().waitFor({ timeout: 15_000 })

  const articleCount = await page.locator('li.group').count()
  console.log('Visible article cards:', articleCount)

  const progressLabel = page.locator('text=/de.*artículos/')
  const hasProgress   = await progressLabel.isVisible()
  console.log('Progress label visible:', hasProgress)
  if (hasProgress) console.log('Progress text:', await progressLabel.textContent())

  const loadMoreArea = await page.locator('section').last().innerHTML()
  console.log('Last section HTML snippet:', loadMoreArea.slice(0, 500))
  })
})