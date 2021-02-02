const router = require("express").Router();

router.get("/", function (req, res) {
  res.json({ version: "1.0", author: "cjbelo" });
});

module.exports = router;
