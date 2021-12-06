const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("../config");

class TokenExpiredError extends Error {
  constructor(msg = "Token expired error.") {
    super(msg);
  }
}

class TokenSignError extends Error {
  constructor(msg = "Token sign error.") {
    super(msg);
  }
}

async function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(8).toString("hex");

    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(salt + ":" + derivedKey.toString("hex"));
    });
  });
}

async function verifyPassword(password, hash) {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(":");
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(key == derivedKey.toString("hex"));
    });
  });
}

function verifyToken(req, res, next) {
  const token = req.cookies.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).end("A token is required for authentication");
  }

  jwt.verify(token, config.jwtKeyPublic, (err, decoded) => {
    if (err) {
      if (err.name == "TokenExpiredError") {
        throw new TokenExpiredError(JSON.stringify(err));
      }
      return next(err);
    }
    req.user = decoded.userId;
    next();
  });
}

async function generateToken(
  payload,
  { expiresIn } = { expiresIn: "30 minutes" }
) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      config.jwtKeyPrivate,
      {
        algorithm: "RS256",
        expiresIn: expiresIn,
      },
      (err, token) => {
        if (err) {
          reject(TokenSignError(err));
        }
        resolve(token);
      }
    );
  });
}

module.exports = {
  generateToken,
  verifyToken,
  hashPassword,
  verifyPassword,
};
