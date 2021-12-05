const Server = require("../server/server");
const { addItem, removeItem, getList } = require("../controllers/shoppingList");
const auth = require("../auth/auth");

const router = new Server.Router();
router.put("/shopping-list", auth.verifyToken, addItem);
router.delete("/shopping-list", auth.verifyToken, removeItem);
router.get("/shopping-list", auth.verifyToken, getList);

module.exports = {
  routes: router,
};
