const Server = require("../server/server");
const { signin, signup, remove, getUser, singout } = require("../controllers/users");
const auth = require("../auth/auth");

const router = new Server.Router();
router.post("/user/sign-in", signin);
router.post("/user/sign-up", signup);
router.delete("/user", auth.verifyToken, remove);
router.get("/user", auth.verifyToken, getUser);
router.get("/user/sign-out", auth.verifyToken, singout);

module.exports = {
  routes: router,
};
