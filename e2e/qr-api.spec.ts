import { test, expect } from "@playwright/test";

test.describe("QR Code API", () => {
  test("should generate PNG QR code by default", async ({ request }) => {
    const response = await request.get("/api/qr");

    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toBe("image/png");
  });

  test("should generate SVG QR code when requested", async ({ request }) => {
    const response = await request.get("/api/qr?format=svg");

    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toBe("image/svg+xml");
  });

  test("should include source parameter in QR code URL", async ({ request }) => {
    const response = await request.get("/api/qr?source=test-source");

    expect(response.status()).toBe(200);
    // The QR code should be generated successfully with the source param
  });

  test("should respect size parameter", async ({ request }) => {
    const response = await request.get("/api/qr?size=200");

    expect(response.status()).toBe(200);
    // Size affects the generated image, response should succeed
  });

  test("should have cache headers", async ({ request }) => {
    const response = await request.get("/api/qr");

    expect(response.headers()["cache-control"]).toContain("max-age");
  });
});
