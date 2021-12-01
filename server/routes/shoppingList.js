const Server = require("../server/server");
const { addItem, removeItem, getList } = require("../controllers/shoppingList");

const router = new Server.Router();
router.put("/shopping-list", addItem);
router.delete("/shopping-list", removeItem);
router.get("/shopping-list", getList);

module.exports = {
  routes: router,
};
