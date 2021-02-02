module.exports = async (req, mysql) => {
  let token;

  if (req.headers.authorization) {
    const auth = String(req.headers.authorization);
    const aarr = auth.split(" ");
    if (!aarr[1]) return false;
    token = aarr[1].trim();
  } else {
    return false;
  }

  try {
    const date = new Date();
    const sql = `SELECT id, user_id, token FROM session WHERE token = ? AND date_expiry > ? OR remember = ?`;
    const result = await mysql.query(sql, [token, date, 1]);
    if (result.length && result[0].id) {
      return result[0];
    }
    return false;
  } catch (err) {
    console.log("check-access: " + err);
    return false;
  }
};
