const mysql = require("../../mysql");
const config = require("../../config.json");
const { getHash, trimObj } = require("../../helper");
// const { baseUrl } = require("../../helper/defaults");
// const sendMail = require("gmail-send")({
//   user: config.email.user,
//   pass: config.email.pass,
// });

module.exports = async (req, res) => {
  const date = new Date();
  let user = req.body;

  trimObj(user);

  user.password = getHash(user.password);
  user.birthday = new Date(user.birthday);
  user.date_created = date;
  user.date_modified = date;

  try {
    const sql = `INSERT INTO user SET ?`;
    const result = await mysql.query(sql, user);
    if (result.insertId) {
      try {
        // const msg = `Hello ${user.firstname},<br><br>
        // Thank you for registering.<br>
        // Click the link to validate your account<br>${baseUrl}/validate/${getHash(
        //   user.email
        // )}.<br><br>Team Portal`;
        // const options = {
        //   to: user.email,
        //   subject: "New User Registration",
        //   html: msg,
        // };
        // const mailres = await sendMail(options);
        // console.log(mailres);
        res.json({ error: false, data: result.insertId });
      } catch (err) {
        console.error("Email Error", err);
        res.json({ error: true, message: "Error sending email." });
      }
    }
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      try {
        // const msg = `Hello ${user.firstname},<br><br>
        // Somebody is trying to register with your email address.<br>
        // If this is you and forgot your password please click the link to reset your password<br>
        // ${baseUrl}/forgot-password.<br><br>
        // Team Portal`;
        // const options = {
        //   to: user.email,
        //   subject: "User Registration",
        //   html: msg,
        // };
        // const mailres = await sendMail(options);
        // console.log(mailres);
        res.json({ error: false, data: 0 });
      } catch (err2) {
        console.error("Email Error", err2);
        res.json({ error: true, message: "Error sending email." });
      }
    } else {
      res.json({ error: true, code: err.code, message: err.sqlMessage });
    }
  }
};
