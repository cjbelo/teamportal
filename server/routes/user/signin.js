const mysql = require("../../mysql");
const { trimObj, getHash, getToken } = require("../../helper");

module.exports = async (req, res) => {
  let user = req.body;

  trimObj(user);
  user.password = getHash(user.password);

  try {
    let sql = `SELECT * FROM user WHERE email = ? AND password = ?`;
    let result = await mysql.query(sql, [user.email, user.password]);

    if (result.length && result[0].id) {
      const userData = result[0];
      const date_created = new Date();
      const token = getToken(user.email + date_created);
      let date_expiry = new Date();
      date_expiry.setDate(date_expiry.getDate() + 1);
      date_expiry = new Date(date_expiry);

      const session = {
        user_id: userData.id,
        token,
        date_created,
        date_expiry,
        remember: user.remember,
      };

      sql = "DELETE FROM session WHERE date_expiry < ?";
      await mysql.query(sql, date_created);

      sql = `INSERT INTO session SET ?`;
      result = await mysql.query(sql, session);

      delete userData.password;
      delete userData.date_created;
      delete userData.date_modified;

      res.json({ error: false, token, userData });
    } else {
      res.json({ error: true, message: "Invalid Email and/or Password." });
    }
  } catch (err) {
    console.log(err);
    res.json({ error: true, message: err.message });
  }
};
