const fs = require("fs").promises;
const path = require("path");
const Server = require("../server/server");
const status = require("../server/utils/status");

const router = new Server.Router();

const BASE_DIR = path.join(__dirname, "../../");

/**
 * check if the given path is to a valid, readable file
 * @param {string} filePath
 */
async function validateFile(filePath) {
  await fs.access(filePath);
  const stat = await fs.stat(filePath);
  if (!stat.isFile()) {
    throw "Not Found";
  }
}

router.use(async (req, res, next) => {
  try {
    const filePath = path.join(BASE_DIR, req.url);
    await validateFile(filePath);
    res.sendFile(filePath);
  } catch (err) {
    res.writeHead(status.NOT_FOUND, { "Content-Type": "text/plain" });
    res.end(`${status.NOT_FOUND} - ${req.url} not found`);
  }
});

module.exports = {
  routes: router,
};
