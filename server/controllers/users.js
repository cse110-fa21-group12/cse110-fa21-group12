const auth = require("../auth/auth");
const firebase = require("../db");
const firestore = firebase.firestore();
const { validateJSON } = require("./utils");

const USER_PROPS = ["email", "password"];

const CREDS_PROPS = ["email", "password"];

async function signup(req, res) {
  try {
    const user = req.body; // email, password,....
    validateJSON(USER_PROPS, user);

    const usersRef = firestore.collection("users");
    const existingUser = await usersRef.where("email", "==", user.email).get();
    if (!existingUser.empty) {
      res.json({ error: `The email '${user.email}' already signed up` });
      return;
    }

    const newUserRef = await usersRef.add({
      email: user.email,
      password: await auth.hashPassword(user.password),
      shopping_list: [],
    });

    const token = await auth.generateToken({
      userId: newUserRef.id,
      email: user.email,
    });
    res.setHeader("Set-Cookie", `token=${token}; HttpOnly`);
    res.json({ token });
  } catch (error) {
    res.json({ error: error.message });
  }
}

async function signin(req, res) {
  try {
    const creds = req.body; // email, password,....
    validateJSON(CREDS_PROPS, creds);

    const usersRef = firestore.collection("users");
    const userDataRef = await usersRef.where("email", "==", creds.email).get();
    if (userDataRef.empty) {
      return res.json({ error: `Invalid email` });
    }

    const user = userDataRef.docs[0];
    const userData = user.data();
    if (await auth.verifyPassword(creds.password, userData.password)) {
      const token = await auth.generateToken({
        userId: user.id,
        email: userData.email,
      });
      res.setHeader("Set-Cookie", `token=${token};path=/;HttpOnly`);
      res.json({ token });
    } else {
      return res.json({ error: `Invalid password` });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
}

async function getUser(req, res) {
  try {
    const user = req.user;
    const userRef = await firestore.collection("users").doc(user.userId).get();
    if (!userRef.exists) {
      res.json({ error: `User does not exists` });
    }
    const { password, ...userWithoutPassword } = userRef.data();
    res.json(userWithoutPassword);
  } catch (error) {
    res.json({ error: error.message });
  }
}

async function remove(req, res) {
  try {
    const user = req.user;
    const userRef = await firestore.collection("users").doc(user.userId).get();
    userRef.ref.delete();
    res.json(true);
  } catch (error) {
    res.json({ error: error.message });
  }
}

async function singout(req, res) {
  try {
    res.setHeader("Set-Cookie", `token=0;path=/;Max-Age=0;HttpOnly`);
    res.json(true);
  } catch (error) {
    res.json({ error: error.message });
  }
}

module.exports = {
  signup,
  signin,
  remove,
  getUser,
  singout,
};
