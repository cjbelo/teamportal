const mysql = require("../../mysql");

module.exports = async (req, res) => {
  const session = await require("../../helper/get-token")(req, mysql);

  if (session) {
    sql = "DELETE FROM session WHERE token = ?";
    const result = await mysql.query(sql, session.token);
    if (result && result.affectedRows) {
      res.json({ error: false, message: "Successfully logged out!" });
    }
  } else {
    res.json({ error: false, message: "" });
  }
};
