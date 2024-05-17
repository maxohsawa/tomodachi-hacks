const jwt = require("jsonwebtoken");
require("dotenv").config();

const injectNewScore = async (score) => {
  // token & gameId
  const { token, gameId } = process.env;

  // userId
  const decodedToken = jwt.decode(token);
  const { _id: userId } = decodedToken.data;

  const convertTimeToSeconds = (hours, minutes, seconds) => {
    return 3600 * hours + 60 * minutes + seconds;
  };

  const mutation = `
  mutation UpdateGameData(
    $userId: String!
    $gameId: ID!
    $food: Int
    $energy: Int
    $happiness: Int
    $timeAlive: Int
  ) {
    updateGameData(
      userId: $userId
      gameId: $gameId
      food: $food
      energy: $energy
      happiness: $happiness
      timeAlive: $timeAlive
    ) {
      _id
      email
      username
      gameData {
        _id
        food
        energy
        happiness
        name
        timeAlive
        lastSaveDate
        createdDate
      }
    }
  }
  `;

  const variables = {
    userId,
    gameId,
    food: 95,
    energy: 90,
    happiness: 85,
    timeAlive: score,
  };

  const payload = {
    query: mutation,
    variables,
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch("https://tomodachi-who7.onrender.com/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    console.log("Inject Response OK");
  } else {
    console.log("Inject Request failed");
  }

  const data = await response.json();

  if (data) {
    console.log("Inject Success");
  } else {
    console.log("No data");
  }
};

module.exports = injectNewScore;
