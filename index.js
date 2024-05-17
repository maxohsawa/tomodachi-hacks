const jwt = require("jsonwebtoken");
require("dotenv").config();

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
  timeAlive: convertTimeToSeconds(1, 6, 53),
};

const payload = {
  query: mutation,
  variables,
};

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

fetch("https://tomodachi-who7.onrender.com/graphql", {
  method: "POST",
  headers,
  body: JSON.stringify(payload),
})
  .then((response) => {
    if (response.ok) {
      console.log("Response OK");
      return response.json();
    } else {
      console.log("Request failed");
    }
  })
  .then((data) => {
    if (data) {
      console.log("Success");
      console.log(data);
    } else {
      console.log("No data");
    }
  });
