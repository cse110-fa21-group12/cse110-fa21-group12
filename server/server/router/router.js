const Layer = require("./layer");
const Methods = require("../utils/methods");
const { pathToRegex, decodeParams, decodeQueries } = require("../utils/util");

const ALL = "*";

/**
 * @public
 */
class Router {
  /**
   * @public
   * Create a new router instance from the given path
   * @param {string} path
   */
  constructor(path = ALL) {
    this._stack = [];
    this._strPath = path;
    this._path = pathToRegex(path);

    Methods.forEach((method) => {
      this[method] = (path, fn) => this.__METHOD(path, method, fn);
    });
    this["all"] = (path, fn) => this.__METHOD(path, ALL, fn);
  }

  /**
   * @public
   * add middleware for the router to use
   *
   * can accept eiter (path, middleware) just (middleware) where middleware is any amount of
   * functions or functions array.
   * @param {string} path
   * @param {function[]} middlewares recieving (req, res, next) - express middleware
   */
  use(path, ...middlewares) {
    // prepare args - support for "overloading"
    if (
      typeof path === "function" ||
      path instanceof Router ||
      Array.isArray(path)
    ) {
      const arr = Array.isArray(path) ? path : [path];
      middlewares = arr.concat(middlewares);
      path = "*";
    }
    if (!middlewares.length) {
      throw new TypeError("Use require at least one middleware");
    }
    middlewares = middlewares.flat();

    for (let middleware of middlewares) {
      if (middleware instanceof Router) {
        this._stack.push(middleware);
        continue;
      }
      if (typeof middleware !== "function") {
        throw new TypeError("Middleware must be a function");
      }
      this._stack.push(new Layer(path, middleware));
    }
  }

  /**
   * create a router layer and return it for the user to attatch new
   * controlers to.
   * @param {string} path path for the router to handle
   * @returns {Router} new attatched router
   */
  route(path) {
    const router = new Router(path);
    this._stack.push(router);
    return router;
  }

  /**
   * @private
   * Add routing to a specific method
   * @param {string} path
   * @param {string} method HTTP method to use
   * @param {function[]} fns recieving (req, res)
   * @returns {BaseRouter} for chaining
   */
  __METHOD(path, method, fn) {
    if (typeof fn !== "function") {
      throw new TypeError("callback must be a function");
    }
    this._stack.push(new Layer(path, fn, method.toLocaleLowerCase()));
    return this;
  }

  /**
   * @protected
   * check if the current router path fits the request
   * @param {Request} req
   * @returns {boolean} true if router should handle, false otherwise
   */
  _match(req) {
    const path = req.__url;
    return this._path.test(path);
  }

  /**
   * @protected
   * Handle a server request, look through the layers stack to fidn the
   * any controlers and middleware to execute.
   * @param {Request} req
   * @param {ServerResponse} res
   * @param {function} callback recieving (err) if occured
   */
  _handle(req, res, callback) {
    let idx = 0;
    let matched, layer;

    const savedParams = req.params;
    const savedQueries = req.query;
    const savedUrl = req.__url;

    decodeParams(req, this._path);
    decodeQueries(req);
    req.__url = savedUrl.replace(this._path, ""); // "cut" into sub-path for sub-routers

    const next = (err) => {
      if (err != null) {
        return setImmediate(() => callback(err));
      } // If an error occurred, bypass the pipeline.
      if (idx >= this._stack.length) {
        return setImmediate(() => callback());
      } // If not found

      // find the next matching layer
      layer = this._stack[idx++];
      matched = layer._match(req);
      while (!matched && idx < this._stack.length) {
        layer = this._stack[idx++];
        matched = layer._match(req);
      }
      if (!matched) {
        return callback();
      }

      try {
        layer._handle(req, res, next); // Execute the layer and rely on it to call `next()`
      } catch (error) {
        next(error);
      } finally {
        //  reset path and params for the next router in line
        req.__url = savedUrl;
        req.params = savedParams;
        req.query = savedQueries;
      }
    };

    next();
  }
}

module.exports = Router;
