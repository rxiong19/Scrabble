// This module contains utility functions for the scrabble game.

// This imports the dictionary of scrabble words.
import { dictionary } from "./dictionary.js";

/**
 * This function checks whether a given word can be constructed with the
 * available tiles. The availableTiles object should not be modified.
 *
 * @param {object} availableTiles The available tiles to use.
 * @param {string} word The word to check.
 * @returns {boolean} Returns true if the word can be constructed with the given
 *                    tiles; false otherwise.
 */
function canConstructWord(availableTiles, word) {
  // TODO #1
  let letter_requirement = {};
  let num_wildcard = availableTiles["*"];

  word.split("").map((letter) => {
    if (letter_requirement[letter] === undefined) {
      letter_requirement[letter] = 0;
    }
    letter_requirement[letter] += 1;
  });

  for (let [require_letter, num_required] of Object.entries(
    letter_requirement
  )) {
    if (
      availableTiles[require_letter] < num_required ||
      availableTiles[require_letter] === undefined
    ) {
      if (num_wildcard === undefined || num_wildcard <= 0) {
        return false;
      } else {
        let available_num =
          availableTiles[require_letter] === undefined
            ? 0
            : availableTiles[require_letter];
        num_wildcard = num_wildcard - (num_required - available_num);
        if (num_wildcard < 0) {
          return false;
        }
      }
    }
  }
  // console.log(letter_requirement);
  return true;
}

/**
 * We define the base score of a word the score obtained by adding each letter's
 * score, without taking board position into account. This function will compute
 * and return the base score of a given word.
 *
 * @param {string} word The word to compute a base score for.
 * @returns {number} The base score of the given word.
 */
function baseScore(word) {
  // TODO #2
  const score_book = {
    "*": 0,
    a: 1,
    b: 3,
    c: 3,
    d: 2,
    e: 1,
    f: 4,
    g: 2,
    h: 4,
    i: 1,
    j: 8,
    k: 5,
    l: 1,
    m: 3,
    n: 1,
    o: 1,
    p: 3,
    q: 10,
    r: 1,
    s: 1,
    t: 1,
    u: 1,
    v: 4,
    w: 4,
    x: 8,
    y: 4,
    z: 10,
  };
  let score = 0;
  let letter_requirement = {};
  word.split("").map((letter) => {
    if (letter_requirement[letter] === undefined) {
      letter_requirement[letter] = 0;
    }
    letter_requirement[letter] += 1;
  });

  for (let [require_letter, num_required] of Object.entries(
    letter_requirement
  )) {
    score += score_book[require_letter] * num_required;
  }
  //console.log("base score: " + score);
  return score;
}

/**
 * Finds and returns every word from the dictionary that can be constructed with
 * the given tiles.
 *
 * @param {object} availableTiles The available tiles to use.
 * @returns {string[]} The words that can be constructed with the given tiles.
 */
function possibleWords(availableTiles) {
  // TODO #3
  let possible_words = Object.assign([], dictionary);

  return possible_words.filter((word) =>
    canConstructWord(availableTiles, word)
  );
}

/**
 * Finds and returns the word(s) with the highest base score from the
 * dictionary, given a set of available tiles.
 *
 * @param {object} availableTiles The available tiles to use.
 * @returns {string[]} The words with the highest base score.
 */
function bestPossibleWords(availableTiles) {
  // TODO #4
  let possible_words = possibleWords(availableTiles);
  let max_score = 0;
  const modify_word = (word) => {
    let tiles_copy = Object.assign({}, availableTiles);
    return word
      .split("")
      .map((letter) => {
        if (
          tiles_copy[letter] === undefined ||
          tiles_copy[letter] === 0 ||
          tiles_copy[letter] === null
        ) {
          return "*";
        }
        tiles_copy[letter] -= 1;
        return letter;
      })
      .join("");
  };

  possible_words.map((word) => {
    word = modify_word(word);
    let current_score = baseScore(word);
    if (current_score > max_score) {
      max_score = current_score;
    }
  });

  let best_list = [];
  possible_words.map((word) => {
    let unmodified = word;
    word = modify_word(word);
    if (baseScore(word) === max_score) {
      best_list.push(unmodified);
    }
  });

  return best_list;
}

// This exports our public functions.
export { canConstructWord, baseScore, possibleWords, bestPossibleWords };
