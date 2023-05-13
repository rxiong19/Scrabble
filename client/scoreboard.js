class WordScoreBoard {
  constructor() {
    this.words = [];
  }

  // TODO #8: Save the word score to the server
  async saveWordScore(name, word, score) {
    const entry = {
      name: name,
      word: word,
      score: score,
    };
    this.words.push(entry);
    await fetch("/wordScore", {
      method: "POST",
      body: JSON.stringify(entry),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        console.log("Word score saved!");
      } else {
        console.error("word score not saved:", res.statusText);
      }
    });
  }

  render(element) {
    let html = "<h1>Word Scores</h1>";
    html += "<table>";
    this.words.forEach((word) => {
      html += `
        <tr>
          <td>${word.name}</td>
          <td>${word.word}</td>
          <td>${word.score}</td>
        </tr>
      `;
    });
    html += "</table>";
    element.innerHTML = html;
  }
}

class GameScoreBoard {
  constructor() {
    this.game = [];
  }

  render(element) {
    let html = "<h1>Game Score</h1>";
    html += "<table>";
    this.game.forEach((word) => {
      html += `
        <tr>
          <td>${word.name}</td>
          <td>${word.score}</td>
        </tr>
      `;
    });
    html += "</table>";
    element.innerHTML = html;
  }

  // TODO #9: Save the game score to the server
  async saveGameScore(name, score) {
    const entry = {
      name: name,
      score: score,
    };
    this.game.push(entry);
    await fetch("/gameScore", {
      method: "POST",
      body: JSON.stringify(entry),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        console.log("Game score saved!");
      } else {
        console.error("Game score not saved:", res.statusText);
      }
    });
  }
}

class TopWordAndGameScoreBoard {
  // TODO #10: Render the top word and game scores
  async render(element) {
    WordScoreBoard.render(element);
    GameScoreBoard.render(element);
  }
}

export const wordScoreBoard = new WordScoreBoard();
export const gameScoreBoard = new GameScoreBoard();
export const topWordAndGameScoreBoard = new TopWordAndGameScoreBoard();
