const Server = require("../server/server");
const {
  addRecipe,
  getRecipes,
  getRecipe,
  deleteRecipe,
  editRecipe,
  searchRecipes,
} = require("../controllers/recipes");

const router = new Server.Router();
router.put("/recipes/create", addRecipe);
router.get("/recipes", getRecipes);
router.get("/recipes/:id", getRecipe);
router.delete("/recipes/:id", deleteRecipe);
router.put("/recipes/edit", editRecipe);
router.get("/search/:search", searchRecipes);

module.exports = {
  routes: router,
};
