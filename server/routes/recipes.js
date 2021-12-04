const Server = require("../server/server");
const { addRecipe, getRecipes, getRecipe, deleteRecipe, editRecipe } = require("../controllers/recipes");
const auth = require('../auth/auth');


const router = new Server.Router();
router.put("/recipes/create", auth.verifyToken, addRecipe);
router.get("/recipes", getRecipes);
router.get("/recipes/:id", getRecipe);
router.delete("/recipes/:id", auth.verifyToken, deleteRecipe);
router.put("/recipes/edit", auth.verifyToken, editRecipe);

module.exports = {
  routes: router,
};
