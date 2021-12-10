const { pathToRegex, decodeParams, decodeQueries } = require("../utils/util");

/**
 * @protected
 * class wrapper for a middleware/controller, used internally to
 * test for layer-request compatibility before running the layer
 */
class Layer {
  /**
   * Create a new layer object
   * @param {string} path path to execute on
   * @param {function} fn middleware function (req,res,next)
   * @param {valueof Method|"all"} method HTTP method to execute on
   */
  constructor(path, fn, method = "all") {
    this.__handle = fn;
    this._name = fn.name || "<anonymous>";
    this._path = pathToRegex(path, { exact: true });
    this._method = method;
  }

  /**
   * Handle an incoming request
   * @param {Request} req
   * @param {Response} res
   * @param {function} next next middleware to run
   */
  _handle(req, res, next) {
    if (this.__handle) {
      const savedParams = req.params;
      const savedQueries = req.query;
      decodeParams(req, this._path);
      decodeQueries(req);

      this.__handle(req, res, next);

      req.params = savedParams;
      req.query = savedQueries;
    }
  }

  /**
   * Test if this layer matches the provided request
   * @param {Request} req
   * @returns {boolean} true if matches request, false otherwise
   */
  _match(req) {
    const method = req.method.toLowerCase();
    const path = req.__url;

    return (
      (this._method === method || this._method === "all") &&
      this._path.test(path)
    );
  }
}

module.exports = Layer;
