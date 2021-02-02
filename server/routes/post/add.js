const mysql = require("../../mysql");
const { trimObj } = require("../../helper");

module.exports = async (req, res) => {
  const token = await require("../../helper/get-token")(req, mysql);
  if (!token) {
    res.json({ error: true, message: "Invalid Token." });
    return;
  }

  let post = req.body;

  trimObj(post);

  const date = new Date();
  const data = {
    user_id: token.user_id,
    type: post.type,
    post: post.post,
    post_style: post.style,
    date_created: date,
    date_modified: date,
  };

  const postReturn = {
    type: post.type,
    post: post.post,
    post_style: post.style,
  };

  try {
    const sql = `INSERT INTO post SET ?`;
    const result = await mysql.query(sql, data);
    if (result.insertId) {
      res.json({ error: false, post: postReturn });
    } else {
      res.json({ error: true, message: "System Error. Please try again." });
    }
  } catch (err) {
    console.log("addpost: " + err);
    res.json({ error: true, message: err.message });
  }
};
