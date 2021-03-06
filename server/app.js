const Server = require("./server/server");
const config = require("./config");
const auth = require("./auth/auth");

const recipeRoutes = require("./routes/recipes").routes;
const staticRoutes = require("./routes/static").routes;
const shoppingListRoutes = require("./routes/shoppingList").routes;
const usersRoutes = require("./routes/users").routes;

// Initialize the server
const app = new Server();

// try and parse all incoming requests as jsons
app.use(Server.JsonParser);
app.use(Server.CookiesParser);

// Use the recipes router for routing for base path
app.use("/", recipeRoutes);
app.use("/", shoppingListRoutes);
app.use("/", usersRoutes);

// serve static
app.use("/", staticRoutes);

// start the server
app.listen(process.env.PORT || config.port, () => {
  console.log("Server listning on port " + (process.env.PORT || config.port));
});
