const Server = require("../server/server");
const { addRecipe, getRecipes, getRecipe } = require("../controllers/recipes");

const router = new Server.Router();
router.put("/recipes/create", addRecipe);
router.get("/recipes", getRecipes);
router.get("/recipes/:id", getRecipe);

module.exports = {
  routes: router,
};
