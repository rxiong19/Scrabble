import { readFile, writeFile } from "fs/promises";

/** A class representing a database to store scores */
class Database {
  constructor() {
    this.path = "scores.json";
  }

  /**
   * Saves a word score to the database.
   *
   * This method reads the database file as an object, adds the new score to the
   * data, and then writes the data back to the database file.
   *
   * @param {string} name the name of the player
   * @param {string} word the word played
   * @param {number} score the score of the word
   */
  async saveWordScore(name, word, score) {
    // TODO #4: Implement this method.
    let db = await this._read();
    let wordScore = { name: name, word: word, score: score };
    if (!db["word"]) {
      db["word"] = [];
    }
    db["word"].push(wordScore);
    await this._write(db);
  }

  /**
   * Saves a game score to the database.
   *
   * This method reads the database file as an object, adds the new score to the
   * data, and then writes the data back to the database file.
   *
   * @param {string} name the name of the player
   * @param {number} score the score of the game
   */
  async saveGameScore(name, score) {
    // TODO #5: Implement this method.
    let db = await this._read();
    if (!db["game"]) {
      db["game"] = [];
    }
    let playerScore = { name: name, score: score };
    db["game"].push(playerScore);
    await this._write(db);
  }

  /**
   * Returns the top 10 word scores.
   *
   * This method reads the database file as an object, sorts the word scores by
   * word score, and returns the top 10.
   *
   * @returns [{name: string, word: string, score: number}] returns the top 10
   * scores
   */
  async top10WordScores() {
    // TODO #6: Implement this method.
    let db = await this._read();
    db["word"].sort((a, b) => b.score - a.score);
    let top = db["word"].slice(0, 10);
    return top;
  }

  /**
   * Returns the top 10 game scores.
   *
   * This method reads the database file as an object, sorts the game scores by
   * game score, and returns the top 10.
   *
   * @returns [{name: string, score: number}] returns the top 10 game scores
   */
  async top10GameScores() {
    // TODO #7: Implement this method.
    let db = await this._read();
    db["game"].sort((a, b) => b.score - a.score);
    let top = db["game"].slice(0, 10);
    return top;
  }

  async _read() {
    try {
      const data = await readFile(this.path, "utf8");
      return JSON.parse(data);
    } catch (error) {
      return { word: [], game: [] };
    }
  }

  // This is a private methods. The # prefix means that they are private.
  async _write(data) {
    await writeFile(this.path, JSON.stringify(data), "utf8");
  }
}

const database = new Database();

export { database };
