const http = require("http");
const Router = require("./router/router");
const status = require("./utils/status");
const { addProperties } = require("./utils/util");

const formidable = require("formidable");

/**
 * @public
 */
class Server extends Router {
  /** export the Router class */
  static get Router() {
    return Router;
  }

  static get FormDataParser() {
    return (req, res, next) => {
      try {
        const form = new formidable.IncomingForm();

        form.parse(req, async (err, fields, files) => {
          if (err) {
            return next(err);
          }

          req.files = files;
          if (fields.hasOwnProperty("json")) {
            req.body = JSON.parse(fields.json);
          } else {
            req.body = fields;
          }
          next();
        });
      } catch (err) {
        next(err);
      }
    };
  }

  static get CookiesParser() {
    return (req, res, next) => {
      try {
        const list = {};
        const rc = req.headers.cookie;

        rc &&
          rc.split(";").forEach(function (cookie) {
            let parts = cookie.split("=");
            list[parts.shift().trim()] = decodeURI(parts.join("="));
          });

        req.cookies = list;
        next();
      } catch (err) {
        next(err);
      }
    };
  }

  /**
   * Returns a middleware to parse an incoming request as JSON if possible and
   * attatch to the req.body, else just the body as string.
   */
  static get JsonParser() {
    return (req, res, next) => {
      if (req.headers["content-type"] != "application/json") {
        return next();
      }

      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        try {
          req.body = body ? JSON.parse(body) : {};
        } catch (err) {
          console.log(`failed parsing as json - ${err}`);
          req.body = body;
        }

        next();
      });
    };
  }

  /**
   * create a new server instance
   */
  constructor() {
    super();
  }

  /**
   * Handle an incoming request
   * @param {Request} req
   * @param {Response} res
   */
  handler(req, res) {
    if (!req) return;

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
