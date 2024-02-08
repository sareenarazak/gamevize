const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");
const ensureAuthenticated = require("./auth").ensureAuthenticated;

router.get("/", ensureAuthenticated, async function (req, res) {
  try {
    const userId = req.user.id;
    const games = await statsController.fetchOwnedGames(userId);
    const topFiveGames = statsController.getTopFiveGames(games);
    topFiveGames.forEach((g) =>
      console.log(
        `game name ${g.name} , url logo ${g.img_logo_url} icon logo ${g.img_icon_url}`,
      ),
    );
    topFiveGames.forEach((g) => console.log(g.img_logo_url));

    res.render("stats", { topFiveGames });
  } catch (error) {
    console.error("Error fetching game statistics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { router };
