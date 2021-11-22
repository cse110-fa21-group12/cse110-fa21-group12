const Server = require("./server/server");
const { port } = require("./config");
const { routes } = require("./routes/recipe-routes");

const app = new Server();

// const routes = new Server.Router();
// routes.put("/login/:user", (req, res) => {
//   res.end(`${req.params.user} is logged in, id=${req.query.id}`);
// });

app.listen(port, () => {
  console.log("Express server listning on port " + port);
});

app.use("/", routes);
