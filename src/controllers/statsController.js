const axios = require("axios");

// Function to fetch user's game statistics
async function fetchOwnedGames(userId) {
  try {
    const steamURL = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${userId}&include_appinfo=true&format=json`;

    const response = await axios.get(steamURL);

    return response.data.response.games;
  } catch (error) {
    throw error;
  }
}

function getTopFiveGames(games) {
  const sortedGames = games.sort(
    (g1, g2) => g2.playtime_forever - g1.playtime_forever,
  );
  return sortedGames.filter((game) => game.playtime_forever > 0).slice(0, 5);
}

module.exports = { fetchOwnedGames, getTopFiveGames };
