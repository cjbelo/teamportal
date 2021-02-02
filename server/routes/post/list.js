const mysql = require("../../mysql");

module.exports = async (req, res) => {
  const token = await require("../../helper/get-token")(req, mysql);
  if (!token) {
    res.json({ error: true, message: "Invalid Token." });
    return;
  }

  try {
    const sql = `SELECT type, post, post_style FROM post WHERE user_id = ? ORDER BY id DESC LIMIT 20`;
    const result = await mysql.query(sql, [token.user_id]);
    res.json({ error: false, posts: result });
  } catch (err) {
    console.log(err);
    res.json({ error: true, message: err.message });
  }
};
