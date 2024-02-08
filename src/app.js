const express = require("express");
const passport = require("passport");
const authRoutes = require("./routes/auth");

const session = require("express-session");
const SteamStrategy = require("passport-steam").Strategy;
const logger = require("morgan");

const path = require("path");
require("dotenv").config();

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Logging and Json parsing middlware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session middleware set up
app.use(
  session({
    secret: "your secret",
    name: "name of session id",
    resave: true,
    saveUninitialized: true,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

// Stream auth strategy
passport.use(
  new SteamStrategy(
    {
      returnURL: "http://localhost:3000/auth/steam/return",
      realm: "http://localhost:3000/",
      apiKey: process.env.STEAM_API_KEY,
    },
    function (identifier, profile, done) {
      process.nextTick(function () {
        profile.identifier = identifier;
        return done(null, profile);
      });
    },
  ),
);

// Serialize and deserialize user info
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// Custom middleware to ensure authentication
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};

// Routes
app.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

app.get("/account", ensureAuthenticated, function (req, res) {
  res.render("account", { user: req.user });
});

app.post("/logout", function (req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.use("/auth", authRoutes);

module.exports = app;
