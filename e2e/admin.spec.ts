import { test, expect } from "@playwright/test";

test.describe("Admin Login", () => {
  test("should redirect to login when accessing /admin unauthenticated", async ({ page }) => {
    await page.goto("/admin");

    // Should redirect to login
    await expect(page).toHaveURL(/\/admin\/login/);
    await expect(page.getByText("Admin Login")).toBeVisible();
  });

  test("should display login form", async ({ page }) => {
    await page.goto("/admin/login");

    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /login/i })).toBeVisible();
  });

  test("should show error for invalid password", async ({ page }) => {
    await page.goto("/admin/login");

    await page.getByLabel(/password/i).fill("wrong-password");
    await page.getByRole("button", { name: /login/i }).click();

    // Should show error message (could be "invalid" or "not configured" depending on env)
    // Look for any error-styled element
    const errorMessage = page.locator("div").filter({ hasText: /(invalid|error|failed|configured)/i });
    await expect(errorMessage.first()).toBeVisible({ timeout: 5000 });
  });
});

test.describe("Admin Dashboard (requires auth)", () => {
  // These tests would require setting up test authentication
  // For now, we just verify the pages exist and redirect properly

  test("should protect /admin/qr route", async ({ page }) => {
    await page.goto("/admin/qr");

    // Should redirect to login
    await expect(page).toHaveURL(/\/admin\/login/);
  });
});
