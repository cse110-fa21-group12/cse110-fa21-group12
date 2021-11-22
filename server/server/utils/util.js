const paramsRegex = /:(\w+)(?=$|\/)/g;
const queryRegex = /^.*?(?:\?|$)/;

/**
 * Add json(data) function to the response to allow writing json easily
 * to the response and parms queries for request
 * @param {Request} req
 * @param {Response} res 
 */
function addProperties(req, res)  {
    req.__url = req.url;
    req.params = {};
    req.query = {};

    res.json = (data) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data));
    };

    res.sendStatus = (statusCode) => {
        const body = statuses[statusCode] || String(statusCode)
        this.statusCode = statusCode;
        this.type('txt');
        return this.send(body);
    };
}

/**
 * Turn a path into a regex that tests just the begining of the path
 * @param {string|RegExp} path 
 * @param {boolean} param1.exact
 * @returns {RegExp} the regex for the path
 */
function pathToRegex(path, {exact}={exact: false}) {
    if (path instanceof  RegExp) { return path; }
    if (path == "*") { path = ""; }
    path = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    path = path.replace(paramsRegex, "(?<$1>.+?)(?=(?:\\/|$|\\?))");    // params regex

    return !exact ? 
                RegExp(`(^${path})(?=(?:\/|$))`) : 
                RegExp(`(^${path})(?=(?:(?:\/$)|$|\\?))`);
}

/**
 * decode url parameter (i.e/users/:id)
 * @param {Request} req 
 * @param {RegExp} pathRegex 
 */
function decodeParams(req, pathRegex) {
    const match = pathRegex.exec(req.__url);
    if (!match) return;

    for (const name in match.groups) {
        req.params[name] = decodeURI(match.groups[name]);
    }    
}

/**
 * decode url queries (i.e/users?id=xxx)
 * @param {Request} req 
 */
 function decodeQueries(req) {
    const search = req.__url.replace(queryRegex, '');
    const urlSearchParams = new URLSearchParams(search);
    if (!urlSearchParams) return;

    for (const [key, val] of urlSearchParams) {
        req.query[key] = decodeURI(val);
    }
}


module.exports = {
    addProperties,
    pathToRegex,
    decodeParams,
    decodeQueries
};