const jwt = require("jsonwebtoken");
require("dotenv").config();

const getScores = require("./getScores");
const injectNewScore = require("./injectNewScore");

let losses = 0;
let offset = 11;
let polling = 10000;

console.log("Begin polling...");
const interval = setInterval(() => {
  go();
}, polling);

const go = async () => {
  try {
    console.log("Getting scores...");
    const scores = await getScores();
    const { highestTimeAlive, username } = scores[0];
    console.log("Highest Score", highestTimeAlive);
    console.log("Leader", username);

    const yourUsername = jwt.decode(process.env.token).data.username;

    if (username !== yourUsername) {
      losses++;
      await injectNewScore(highestTimeAlive + offset + losses);
    } else {
      losses = 0;
    }
  } catch (error) {
    console.log(error);
  }
};
