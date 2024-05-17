const getScores = async () => {
  const query = `
    query HighestScores {
      highestScores {
        _id
        username
        highestTimeAlive
      }
    }
  `;

  const payload = {
    query,
  };

  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch("https://tomodachi-who7.onrender.com/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    console.log("Highscores Response OK");
  } else {
    console.log("HighscoresRequest failed");
  }

  const data = await response.json();

  if (data) {
    console.log("Highscores Success");
    return data.data.highestScores;
  } else {
    console.log("No data");
  }
};

module.exports = getScores;
