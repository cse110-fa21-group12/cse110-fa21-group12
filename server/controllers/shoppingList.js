const Firebase = require("../db");
const firebase = require("firebase");
const firestore = Firebase.firestore();
const { FieldValue } = firebase.firestore;

const { validateJSON } = require("./utils");

ITEM_PROPS = ["name", "quantity"];

/**
 * Add a item from the req.body to the shopping list of currently signed in user
 * @param {Request} req
 * @param {Response} res
 */
async function addItem(req, res) {
  try {
    const user = req.user;
    const item = req.body;
    validateJSON(ITEM_PROPS, item);

    firestore
      .collection("users")
      .doc(user)
      .set(
        {
          shopping_list: FieldValue.arrayUnion(item),
        },
        { merge: true }
      );

    res.json(true);
  } catch (error) {
    res.json({ error: error.message });
  }
}

/**
 * Add a item from the req.body to the shopping list of currently signed in user
 * @param {Request} req
 * @param {Response} res
 */
async function removeItem(req, res) {
  try {
    const user = req.user;
    const item = req.body;
    validateJSON(ITEM_PROPS, item);

    firestore
      .collection("users")
      .doc(user)
      .update({
        shopping_list: FieldValue.arrayRemove(item),
      });

    res.json(true);
  } catch (error) {
    res.json({ error: error.message });
  }
}

/**
 * Respond with the shopping list of the current user
 * @param {Request} req 
 * @param {Response} res 
 */
async function getList(req, res) {
  try {
    const user = req.user;
    const userData = await firestore.collection("users").doc(user).get();
    res.json(userData.data()["shopping_list"]);
  } catch (error) {
    res.json({ error: error.message });
  }
}

module.exports = {
  addItem,
  removeItem,
  getList,
};
