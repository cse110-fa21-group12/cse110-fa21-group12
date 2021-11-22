"use strict";

const firebase = require("../db");
const firestore = firebase.firestore();

/**
 * Validate the parsed recipe json to make sure it is following
 * the agreed upon schema
 * @param {object} recipe parsed json (req.body)
 * @throws {Error} if invalid object
 */
function validateRecipeJSON(recipe) {
  const props = [
    "id",
    "title",
    "description",
    "categories",
    "tags",
    "preparationTime",
    "cookingTime",
    "ingredients",
    "directions",
  ];

  if (
    typeof recipe !== "object" ||
    Object.keys(recipe).length != props.length
  ) {
    throw new Error("Invalid recipe JSON format");
  }

  for (const prop of props) {
    if (!recipe.hasOwnProperty(prop)) {
      throw new Error("Invalid recipe JSON format");
    }
  }
}

/**
 * Add a recipe from the req.body to the database
 * @param {Request} req
 * @param {Response} res
 */
async function addRecipe(req, res) {
  try {
    const recipe = req.body;
    validateRecipeJSON(recipe);

    const recipeRef = firestore.collection("recipes").doc(String(recipe.id));
    const doc = await recipeRef.get();
    if (doc.exists) {
      res.json({ error: `Recipe '${recipe.id}' already exists` });
      return;
    }

    recipeRef.set({
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      categories: recipe.categories,
      tags: recipe.tags,
      preparationTime: recipe.preparationTime,
      cookingTime: recipe.cookingTime,
      ingredients: recipe.ingredients,
      directions: recipe.directions,
      rating: 0,
    });

    res.json(true);
  } catch (error) {
    res.json({ error: error.message });
  }
}

/**
 * Get all the recipes from the database, allows getting a slice of the data
 * by using the start and end queries. (?start={}&end={})
 * @param {Request} req
 * @param {Response} res
 */
async function getRecipes(req, res) {
  try {
    const snapshot = await firebase.firestore().collection("recipes").get();
    const recipes = snapshot.docs.map((doc) => doc.data());
    const start = req.query.start || 0;
    const end = req.query.end || recipes.length;

    res.json(recipes.slice(start, end));
  } catch (error) {
    res.json({ error: error.message });
  }
}

/**
 * Get the {:id} recipe from the database
 * @param {Request} req
 * @param {Response} res
 */
async function getRecipe(req, res) {
  try {
    const doc = await firebase
      .firestore()
      .collection("recipes")
      .doc(req.params.id)
      .get();

    if (doc.exists) {
      res.json(doc.data());
    } else {
      res.json({ error: `Document recipes.${doc} does not exist` });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
}

module.exports = {
  addRecipe,
  getRecipes,
  getRecipe,
};
