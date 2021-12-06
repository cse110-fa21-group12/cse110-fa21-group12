const Server = require("../server/server");
const {
  addRecipe,
  getRecipes,
  getRecipe,
  deleteRecipe,
  editRecipe,
  searchRecipes,
} = require("../controllers/recipes");
const auth = require("../auth/auth");

const router = new Server.Router();
router.put(
  "/recipes/create",
  auth.verifyToken,
  Server.FormDataParser,
  addRecipe
);
router.put(
  "/recipes/edit",
  auth.verifyToken,
  Server.FormDataParser,
  editRecipe
);
router.get("/recipes", getRecipes);
router.get("/recipes/:id", getRecipe);
router.delete("/recipes/:id", auth.verifyToken, deleteRecipe);
router.put("/recipes/edit", editRecipe);
router.get("/search/:search", searchRecipes);

module.exports = {
  routes: router,
};
