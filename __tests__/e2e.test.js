const puppeteer = require("puppeteer");

describe("Google", () => {
  beforeAll(async () => {
    await page.goto("http://google.com");
  });
  it("It should display Google", async () => {
    await expect(page.title()).resolves.toMatch("Google");
  });
});
