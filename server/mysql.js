const util = require("util");
const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 100,
  host: "127.0.0.1",
  port: 33061,
  user: "root",
  password: "root",
  database: "teamportal",
  timezone: "Z",
  charset: "utf8mb4",
});

pool.getConnection((err, conn) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  }

  if (conn) conn.release();
  return;
});

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query);

module.exports = pool;
