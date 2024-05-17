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

const convertTimeToSeconds = (hours, minutes, seconds) => {
  return 3600 * hours + 60 * minutes + seconds;
};

const variables = {
  userId: "66463604a2041cbc00e9706d",
  gameId: "6646360fa2041cbc00e97070",
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
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoibWF4X2FzZGYiLCJlbWFpbCI6Im1heEBnbWFpbC5jb20iLCJfaWQiOiI2NjQ2MzYwNGEyMDQxY2JjMDBlOTcwNmQifSwiaWF0IjoxNzE1OTUwMjg3LCJleHAiOjE3MTU5NTc0ODd9.hI-QTKnGr4ykjgJlzaIISW7PGMpndOxScs-K6gh0O_E",
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
