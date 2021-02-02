const router = require("express").Router();

router.get("/list", (req, res) => {
  require("./list")(req, res);
});

router.post("/add", (req, res) => {
  require("./add")(req, res);
});

module.exports = router;
