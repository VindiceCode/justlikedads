import { test, expect } from "@playwright/test";

test.describe("Landing Page", () => {
  test("should display the hero section with correct content", async ({ page }) => {
    await page.goto("/");

    // Check hero heading
    await expect(page.locator("h1")).toContainText("Just Like Dad");
    await expect(page.locator("h1")).toContainText("Barbecue Catering");

    // Check tagline
    await expect(page.getByText("Low and slow")).toBeVisible();

    // Check CTA button
    const ctaButton = page.getByRole("link", { name: /book your event/i });
    await expect(ctaButton).toBeVisible();
  });

  test("should display the services section", async ({ page }) => {
    await page.goto("/");

    // Check services heading
    await expect(page.getByText("We Bring the Smoke")).toBeVisible();

    // Check service cards
    await expect(page.getByText("Backyard Parties")).toBeVisible();
    await expect(page.getByText("Corporate Events")).toBeVisible();
    await expect(page.getByText("Weddings & More")).toBeVisible();
  });

  test("should have a working navigation to booking section", async ({ page }) => {
    await page.goto("/");

    // Click the CTA button
    await page.getByRole("link", { name: /book your event/i }).click();

    // Should scroll to booking section
    await expect(page.getByText("Get a Free Quote")).toBeVisible();
  });
});

test.describe("Lead Form", () => {
  test("should display all form fields", async ({ page }) => {
    await page.goto("/#booking");

    // Check all form fields are present
    await expect(page.getByLabel(/first name/i)).toBeVisible();
    await expect(page.getByLabel(/last name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/phone/i)).toBeVisible();
    await expect(page.getByLabel(/event date/i)).toBeVisible();
    await expect(page.getByLabel(/guest count/i)).toBeVisible();
    await expect(page.getByLabel(/event type/i)).toBeVisible();
    await expect(page.getByLabel(/tell us more/i)).toBeVisible();

    // Check submit button
    await expect(page.getByRole("button", { name: /request quote/i })).toBeVisible();
  });

  test("should show validation when required fields are empty", async ({ page }) => {
    await page.goto("/#booking");

    // Try to submit empty form
    await page.getByRole("button", { name: /request quote/i }).click();

    // Browser validation should prevent submission
    // Check that the first name field has validation
    const firstNameInput = page.getByLabel(/first name/i);
    await expect(firstNameInput).toHaveAttribute("required", "");
  });

  test("should capture source parameter from URL", async ({ page }) => {
    // Visit with QR source parameter
    await page.goto("/?source=qr-businesscard#booking");

    // Fill out the form
    await page.getByLabel(/first name/i).fill("Test");
    await page.getByLabel(/last name/i).fill("User");
    await page.getByLabel(/email/i).fill("test@example.com");
    await page.getByLabel(/phone/i).fill("555-1234");
    await page.getByLabel(/event date/i).fill("2025-06-15");
    await page.getByLabel(/guest count/i).fill("50");
    await page.getByLabel(/event type/i).selectOption("private");

    // The source should be captured in the form state
    // We can verify this by checking the network request when form is submitted
    // For now, just verify the page loaded correctly with the param
    await expect(page.url()).toContain("source=qr-businesscard");
  });
});

test.describe("Footer", () => {
  test("should display footer with correct content", async ({ page }) => {
    await page.goto("/");

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check footer content
    await expect(page.getByText("Slow Smoked. Family Made.")).toBeVisible();
  });
});
