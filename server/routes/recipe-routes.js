const Server = require("../server/server");
const { getRecipes } = require("../controller");

const router = new Server.Router();

const firebase = require("../db");
const firestore = firebase.firestore();

router.get("/recipes", async (req, res) => {
  try {
    const recipes = await firestore.collection("recipes");
    const data = await recipes.get();

    res.json(data);
  } catch (error) {
    res.end(error.message);
  }
});
// router.get("/students", getAllStudents);
// router.get("/student/:id", getStudent);
// router.put("/student/:id", updateStudent);
// router.delete("/student/:id", deleteStudent);

module.exports = {
  routes: router,
};
