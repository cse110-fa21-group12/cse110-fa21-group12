"use strict";

const firebase = require("../db");
const firestore = firebase.firestore();
const { validateJSON } = require("./utils");

const RECIPE_PROPS = [
  "id",
  "title",
  "description",
  "categories",
  "tags",
  "preparationTime",
  "cookingTime",
  "totalTime",
  "ingredients",
  "directions",
];

/**
 * Add a recipe from the req.body to the database
 * @param {Request} req
 * @param {Response} res
 */
async function addRecipe(req, res) {
  try {
    const recipe = req.body;
    validateJSON(RECIPE_PROPS, recipe);

    const recipeRef = firestore.collection("recipes").doc(String(recipe.id));
    const doc = await recipeRef.get();
    if (doc.exists) {
      res.json({ error: `Recipe '${recipe.id}' already exists` });
      return;
    }

    recipeRef.set({
      id: recipe.id,
      creator: req.user,
      title: recipe.title,
      description: recipe.description,
      categories: recipe.categories,
      tags: recipe.tags,
      preparationTime: recipe.preparationTime,
      cookingTime: recipe.cookingTime,
      totalTime: recipe.totalTime,
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

/**
 * Get the {:id} recipe from the database
 * @param {Request} req
 * @param {Response} res
 */
async function editRecipe(req, res) {
  try {
    const user = req.user;
    const recipe = req.body;
    validateJSON(RECIPE_PROPS, recipe);

    const recipeRef = firestore.collection("recipes").doc(String(recipe.id));
    const doc = await recipeRef.get();
    if (!doc.exists) {
      res.json({ error: `Recipe '${recipe.id}' does not exists` });
      return;
    }

    const originalRecipe = doc.data();
    if (originalRecipe.creator != user) {
      return res.json({ error: "Cannot delete recipe of another creator."})
    }
    
    try {
      await recipeRef.delete();
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
    } catch (err) {
      // failed delete and update -> return to original before exiting
      recipeRef.set(originalRecipe);
      throw err;
    }

    res.json(true);
  } catch (error) {
    res.json({ error: error.message });
  }
}

/**
 * Get the {:id} recipe from the database
 * @param {Request} req
 * @param {Response} res
 */
async function deleteRecipe(req, res) {
  try {
    const user = req.user;
    const recipeRef =  await firebase.firestore().collection("recipes").doc(req.params.id).get();
    const recipe = recipeRef.data();
    if (recipe.creator != user) {
      return res.json({ error: "Cannot delete recipe of another creator."})
    }

    await firebase
      .firestore()
      .collection("recipes")
      .doc(req.params.id)
      .delete();
    res.json(true);
  } catch (error) {
    res.json({ error: error.message });
  }
}

module.exports = {
  addRecipe,
  getRecipes,
  getRecipe,
  deleteRecipe,
  editRecipe,
};
