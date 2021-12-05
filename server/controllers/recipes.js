"use strict";
const fs = require('fs/promises');
const crypto = require('crypto');
const formidable = require('formidable');
const path = require('path');
const firebase = require("../db");
const storage = firebase.storage();
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

const ALLOWED_TYPES = new Set(['image/png', 'image/jpeg']);
const DEFAULT_IMG = '/source/media/sample.jpg';
const IMG_BASE_FOLDER = '/images';
const MAX_FILE_SIZE = 10 * (1024*1024); // 10MB

/**
 * Upload the provided local file to the firestore storage bucket
 * @param {object} file parsed file object by formidible
 * @returns {string} link to the uploaded image, null if failed
 */
async function uploadImage(file) {
  if (!ALLOWED_TYPES.has(file.mimetype) || file.size > MAX_FILE_SIZE) {
    return null;
  }

  const metadata = {
    contentType: file.mimetype,
  };

  const ext = path.extname(file.originalFilename);

  const storeName = `${IMG_BASE_FOLDER}/${Date.now()}_${path.basename(file.originalFilename).replace(/\.[^/.]+$/, "")}${ext}`;
  const storageRef = firebase.storage().ref();
  const fileRef = storageRef.child(storeName);
  await fileRef.put(await fs.readFile(file.filepath), metadata);
  return await fileRef.getDownloadURL();
}

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

    const img = req.files ? req.files.img : null;
    const imgUrl = img ? await uploadImage(img) : DEFAULT_IMG;

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
      img: imgUrl,
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

    const img = req.files ? req.files.img : null;
    const imgUrl = img ? await uploadImage(img) : DEFAULT_IMG;
    
    try {
      await recipeRef.delete();
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
        img: imgUrl,
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
