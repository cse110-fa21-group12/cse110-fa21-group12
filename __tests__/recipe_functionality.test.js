const puppeteer = require("puppeteer");
const URL_HOMEPAGE = "http://127.0.0.1:5500/source/home.html";
const URL_MY_RECIPE =
  "https://cre-ate-recipe.herokuapp.com/source/recipe-list.html";
const URL_CREATE_RECIPE = "http://127.0.0.1:5500/source/create-recipe.html";

// Recipe
const title = "Matcha Mille Crepe Cake";
const description =
  "Matcha Mille Crepe Cake is made of thin layers of green tea crepes stacked together with fresh whipped cream in-between. This elegant and decadent cake will wow your guests when they see the rich green layers!";
const category = "Dessert";
const tags = "Delicious";
const prep_time = "20 minutes";
const cook_time = "40 minutes";
const total_time = "4 hours (with 3 hours resting and chilling)";

describe("My Recipe", () => {
  beforeAll(async () => {
    await page.goto(URL_MY_RECIPE);
    await page.waitForTimeout(500);
  });

  // it("click on my recipe and it should go to my recipe", async () => {
  //   await page.$eval("#options", (button) => {
  //     button.click();
  //   });
  //   await page.waitForTimeout(300);
  //   const current_header = await page.$eval("#book", (my_recipe_header) => {
  //     return my_recipe_header.innerHTML;
  //   });
  //   expect(current_header).toMatch("My Recipes");
  // });

  // it("empty recipe list", async () => {
  //   const recipe_length = await page.$eval("#");
  // });
  it("create my first recipe", async () => {
    const button = await page.$("#createRecipe");
    await button.click();
  });

  it("input for create recipe", async () => {
    await page.goto(URL_CREATE_RECIPE); // For now, I am not able to click the button of create recipe
    await page.type("#title", title);
    await page.type("#description", description);
    await page.type("#categories", category);
    await page.type("#tags", tags);
    await page.type("#prep-time", prep_time);
    await page.type("#cook-time", cook_time);
    await page.type("#total-time", total_time);
    await page.type("#quantity", "2");
    // await page.type("#ingredient", "whole milk");
    await page.click("#add-ingredient-button");
  });

  // it("filter by rating", async () => {

  // });

  // it("delete recipe", async () => {

  // });

  it("search with query", async () => {
    await page.goto(URL_HOMEPAGE);
    await page.type("#recipe-search", "pasta");
    await page.click("#search-button");
  });
});
