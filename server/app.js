const Server = require("./server/server");
const { port } = require("./config");
const recipeRoutes = require("./routes/recipes").routes;

// Initialize the server
const app = new Server();

// try and parse all incoming requests as jsons
app.use(Server.JsonParser);

// Use the recipes router for routing for base path
app.use("/", recipeRoutes);

// serve homepage
app.get("/", (req, res) => {
  res.sendHTML("../index.html");
});

// start the server
app.listen(port, () => {
  console.log("Server listning on port " + port);
});
