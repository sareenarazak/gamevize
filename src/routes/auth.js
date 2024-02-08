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

// Custom middleware to ensure authentication
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};

module.exports = { router, ensureAuthenticated };
