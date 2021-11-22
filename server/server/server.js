const http = require("http");
const Router = require("./router/router");
const status = require("./utils/status");
const { addProperties } = require("./utils/util");

/**
 * @public
 */
class Server extends Router {
  /** export the Router class */
  static get Router() {
    return Router;
  }

  /**
   * create a new server instance
   */
  constructor() {
    super();
  }

  /**
   * Start the server listening on the provided port
   * @param {number} port port to listen on
   * @param {function} callback callback for when server is listening (or err)
   * @returns {http.Server}
   */
  listen(port, callback) {
    const handler = (req, res) => {
      addProperties(req, res);

      this._handle(req, res, (err) => {
        if (err) {
          console.log(err);
          res.writeHead(status.INTERNAL_SERVER_ERROR);
          res.end("Internal Server Error");
        } else {
          res.writeHead(status.NOT_FOUND, { "Content-Type": "text/plain" });
          res.end(status.NOT_FOUND);
        }
      });
    };
    return http.createServer(handler).listen({ port: port }, callback);
  }
}

module.exports = Server;
