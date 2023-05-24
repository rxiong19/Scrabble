import { Game } from "./game.js";
import { Rack } from "./rack.js";
import * as utils from "./scrabbleUtils.js";

// UI Components
//  - We grab the DOM elements we need to work with to make our code cleaner.
const boardGridElement = document.getElementById("board");
const rackElement1 = document.getElementById("rack1");
const rackElement2 = document.getElementById("rack2");
const wordElement = document.getElementById("word");
const xElement = document.getElementById("x");
const yElement = document.getElementById("y");
const directionElement = document.getElementById("direction");
const playButtonElement = document.getElementById("play");
const resetButtonElement = document.getElementById("reset");
const helpButtonElement = document.getElementById("help");
const hintElement = document.getElementById("hint");
const turnElement = document.getElementById("playerturn");
const player1 = document.getElementById("player1name");
const player2 = document.getElementById("player2name");
// Create the game
const game = new Game();
game.render(boardGridElement);

player1.addEventListener("change", () => {
  turnElement.textContent = player1.value + "'s turn";
});

// Create the rack
const rack1 = new Rack();
rack1.takeFromBag(7, game);
rack1.render(rackElement1);
const rack2 = new Rack();
rack2.takeFromBag(7, game);
rack2.render(rackElement2);

// This is what happens when we click the play button.
playButtonElement.addEventListener("click", () => {
  const word = wordElement.value;
  const x = parseInt(xElement.value);
  const y = parseInt(yElement.value);
  const direction = directionElement.value === "horizontal";
  if (player1.value === "" || player2.value === "") {
    alert("You need to submit player names first!");
  } else {
    if (turnElement.textContent === player1.value + "'s turn") {
      console.log(player1.value);
      // Checks if the word is valid
      const wordIsValid = (w) =>
        utils.canConstructWord(rack1.getAvailableTiles(), w) &&
        utils.isValid(w);

      const wordIsNotValid = (w) => !wordIsValid(w);

      // Tries to play the word
      const playSucceeds = (w, d) => {
        const rw = utils.constructWord(rack1.getAvailableTiles(), w).join("");
        turnElement.textContent = player2.value + "'s turn";
        return game.playAt(rw, { x, y }, d) !== -1;
      };

      if (wordIsNotValid(word)) {
        alert(`The word ${word} cannot be constructed.`);
      } else if (wordIsValid(word) && playSucceeds(word, direction)) {
        game.render(boardGridElement);

        const used1 = utils.constructWord(rack1.getAvailableTiles(), word);
        used1.forEach((tile) => rack1.removeTile(tile));
        rack1.takeFromBag(used1.length, game);
        rack1.render(rackElement1);

        // Clear out UI elements
        wordElement.value = "";
        xElement.value = "";
        yElement.value = "";
        hintElement.innerHTML = "";
      } else {
        alert(`The word ${word} cannot be played at that location.`);
      }
    } else if (turnElement.textContent === player2.value + "'s turn") {
      console.log(player2.value);
      const wordIsValid = (w) =>
        utils.canConstructWord(rack2.getAvailableTiles(), w) &&
        utils.isValid(w);

      const wordIsNotValid = (w) => !wordIsValid(w);

      // Tries to play the word
      const playSucceeds = (w, d) => {
        const rw = utils.constructWord(rack2.getAvailableTiles(), w).join("");
        turnElement.textContent = player1.value + "'s turn";
        return game.playAt(rw, { x, y }, d) !== -1;
      };

      if (wordIsNotValid(word)) {
        alert(`The word ${word} cannot be constructed.`);
      } else if (wordIsValid(word) && playSucceeds(word, direction)) {
        game.render(boardGridElement);

        const used2 = utils.constructWord(rack2.getAvailableTiles(), word);
        used2.forEach((tile) => rack2.removeTile(tile));
        rack2.takeFromBag(used2.length, game);
        rack2.render(rackElement2);

        // Clear out UI elements
        wordElement.value = "";
        xElement.value = "";
        yElement.value = "";
        hintElement.innerHTML = "";
      } else {
        alert(`The word ${word} cannot be played at that location.`);
      }
    }
  }
});

// This is what happens when we click the reset button.
resetButtonElement.addEventListener("click", () => {
  game.reset();
  game.render(boardGridElement);
});

// This is what happens when we click the help button.
helpButtonElement.addEventListener("click", () => {
  if (player1.value === "" || player2.value === "") {
    alert("You need to submit player names first!");
  } else {
    if (turnElement.textContent === player1.value + "'s turn") {
      const possibilities = utils.bestPossibleWords(rack1.getAvailableTiles());
      const hint =
        possibilities[Math.floor(Math.random() * possibilities.length)];
      hintElement.innerText = hint ? hint : "hints are currently unavailable";
    } else if (turnElement.textContent === player2.value + "'s turn") {
      const possibilities = utils.bestPossibleWords(rack2.getAvailableTiles());
      const hint =
        possibilities[Math.floor(Math.random() * possibilities.length)];
      hintElement.innerText = hint ? hint : "hints are currently unavailable";
    }
  }
});
