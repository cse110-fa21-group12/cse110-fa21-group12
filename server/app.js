const Server = require("./server/server");
const { port } = require("./config");
const recipeRoutes = require("./routes/recipes").routes;
const staticRoutes = require("./routes/static").routes;
const shoppingListRoutes = require("./routes/shoppingList").routes

// Initialize the server
const app = new Server();

// TODO: authenticate
app.use((req, res, next) => {
  req.user = "user0";
  next();
})

// try and parse all incoming requests as jsons
app.use(Server.JsonParser);

// Use the recipes router for routing for base path
app.use("/", recipeRoutes);
app.use("/", shoppingListRoutes);

// serve static
app.use("/", staticRoutes);



// start the server
app.listen(port, () => {
  console.log("Server listning on port " + port);
});
