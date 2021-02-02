const crypto = require("crypto");
const config = require("../config.json");

function getHash(str) {
  return crypto.createHash("md5").update(str).digest("hex");
}

function trimObj(obj) {
  Object.keys(obj).map((k) => (obj[k] = String(obj[k]).trim()));
}

function getToken(str) {
  return crypto
    .createHmac("sha256", config.secretKey)
    .update(str)
    .digest("hex");
}

module.exports = { getHash, trimObj, getToken };
