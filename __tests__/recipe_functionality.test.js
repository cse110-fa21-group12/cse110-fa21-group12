const puppeteer = require("puppeteer");
const URL = "https://zen-recipe-9eb67.web.app/home.html";

describe("My Recipe", () => {
    beforeAll(async () => {
        await page.goto(URL);
      });
      await page.waitForTimeout(500);

    it("click on my recipe and it should go to my recipe", async () => {
        await page.$eval('#options', (button) => {
            button.click();
        });
        await page.waitForTimeout(300);
        const current_header = await page.$eval('#book', (my_recipe_header) => {
            return my_recipe_header.innerHTML;
        });
        expect(current_header).toMatch('My Recipes');
      });

      it("empty recipe list", async () => {
        const recipe_length = await page.$eval('#')
      });
})