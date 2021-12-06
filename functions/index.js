const functions = require("firebase-functions");

const Server = require("../server/server/server");
const recipeRoutes = require("../server/routes/recipes").routes;
const staticRoutes = require("../server/routes/static").routes;

// Initialize the server
const app = new Server();

// try and parse all incoming requests as jsons
app.use(Server.JsonParser);

// Use the recipes router for routing for base path
app.use("/", recipeRoutes);

// serve static
app.use("/", staticRoutes);

exports.app = functions.https.onRequest((req, res) => {
  app.handler(req, res);
});
