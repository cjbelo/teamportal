const redis = require("redis");

const conn = redis.createClient();

conn.on("error", function (err) {
  console.error("Redis Client: " + err);
});

module.exports = conn;
