const mysql = require("../../mysql");

module.exports = async (req, res) => {
  const token = await require("../../helper/get-token")(req, mysql);
  if (!token) {
    res.json({ error: true, message: "Invalid Token." });
    return;
  }

  try {
    const sql = `SELECT * FROM user WHERE id = ?`;
    const result = await mysql.query(sql, [token.user_id]);

    if (result.length && result[0].id) {
      const userData = result[0];

      delete userData.password;
      delete userData.date_created;
      delete userData.date_modified;

      res.json({ error: false, userData });
    } else {
      res.json({ error: true, message: "Invalid User." });
    }
  } catch (err) {
    console.log(err);
    res.json({ error: true, message: err.message });
  }
};
