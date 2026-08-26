import { test, expect } from "@playwright/test";

const routes = [
  "/",
  "/services",
  "/cybersecurity",
  "/solutions",
  "/portfolio",
  "/about",
  "/contact",
];

test.describe("NomadLabz site", () => {
  for (const route of routes) {
    test(`renders ${route}`, async ({ page }) => {
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.status()).toBeLessThan(400);
      await expect(page.getByRole("banner")).toBeVisible();
      await expect(page.locator('a[aria-label="NomadLabz home"]').first()).toBeVisible();
      await expect(page.locator("footer")).toBeVisible();
      await expect(page.locator("h1").first()).toBeVisible();
    });
  }

  test("home hero brand and CTAs", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText(
      "Software that moves business. Security that protects it.",
    );
    await expect(page.getByRole("link", { name: "Start a Project" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Explore Our Work" }).first()).toBeVisible();
  });

  test("portfolio detail for verified live project", async ({ page }) => {
    await page.goto("/portfolio/vyn-services", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText("VYN Insurance & Registration");
    await expect(page.getByRole("link", { name: "Visit Live Site" })).toHaveAttribute(
      "href",
      "https://www.vynservices.com/",
    );
  });

  test("contact form validation and fallback path", async ({ page }) => {
    await page.goto("/contact", { waitUntil: "domcontentloaded" });
    await page.getByLabel("Name").fill("A");
    await page.getByLabel("Email").fill("not-an-email");
    await page.getByLabel("Message").fill("short");
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByText("Message received")).toHaveCount(0);
  });

  test("legacy html redirect", async ({ page }) => {
    await page.goto("/about.html", { waitUntil: "domcontentloaded" });
    expect(page.url()).toContain("/about");
    await expect(page.locator("h1")).toContainText(/NomadLabz builds/i);
  });
});
