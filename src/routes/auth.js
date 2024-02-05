const express = require("express");
const router = express.Router();
const passport = require("passport");

// GET /auth/steam handling --> Steam redirects user to /auth/steam/return
router.get(
  "/steam",
  passport.authenticate("steam", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("/");
  },
);

router.get(
  "/steam/return",
  passport.authenticate("steam", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("/");
  },
);

module.exports = router;
