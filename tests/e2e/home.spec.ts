// tests/e2e/home.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  });

  test("renders the banner swiper", async ({ page }) => {
    await expect(page.locator(".swiper")).toBeVisible();
  });

  test("renders the article list", async ({ page }) => {
    await expect(page.locator("li.group").first()).toBeVisible({
      timeout: 15_000,
    });
  });

  test("shows load more progress label when articles exist", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.locator("li.group").first().waitFor({ timeout: 15_000 });

    const articleCount = await page.locator("li.group").count();
    expect(articleCount).toBeGreaterThan(0);

    const loadMoreButton = page.getByRole("button", {
      name: /cargar más noticias/i,
    });
    const hasMore = await loadMoreButton.isVisible();

    if (hasMore) {
      await loadMoreButton.click();
      await expect(page.locator("text=/de.*artículos/")).toBeVisible({
        timeout: 5_000,
      });
    } else {
      console.log("All articles already loaded, skipping load more check");
    }
  });

  test("search returns results", async ({ page }) => {
    const navbar = page.locator('nav[aria-label="Navegación principal"]');
    const searchInput = navbar.getByPlaceholder("Buscar...");

    await page.locator("li.group").first().waitFor({ timeout: 15_000 });

    await searchInput.fill("valorant");
    await expect(page.locator('[role="listbox"]')).toBeVisible({
      timeout: 5_000,
    });
  });
});
