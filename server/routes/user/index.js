const router = require("express").Router();

router.get("/", (req, res) => {
  require("./get")(req, res);
});

router.get("/logout", (req, res) => {
  require("./logout")(req, res);
});

router.post("/signin", (req, res) => {
  require("./signin")(req, res);
});

router.post("/signup", (req, res) => {
  require("./signup")(req, res);
});

module.exports = router;
