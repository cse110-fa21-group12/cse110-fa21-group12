const puppeteer = require('puppeteer');
const URL = 'https://zen-recipe-9eb67.web.app/';

describe('Basic user flow for Website', () => {
  // First, visit the login page
  beforeAll(async () => {
    await page.goto(URL);
  });
  await page.waitForTimeout(500);

  it('login by placeholder value', async () => {
    await page.waitForSelector('#email-input');
    await page.type('#email-input', 'example@gmail.com');

    await page.waitForSelector('password-input', { visible: true });
    await page.type('password-input', 'test_pwd');

    await page.waitForSelector('#login-button');
    await page.click('#login-button');
  });

  it('return to login page from home page', async () => {
    await page.goBack();
    const url = await page.evaluate(() => location.href);
    expect(url).toMatch('https://zen-recipe-9eb67.web.app/');
  })
});
