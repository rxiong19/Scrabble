import { Game } from "./game.js";
import { Rack } from "./rack.js";
import { canConstructWord, bestPossibleWords } from "./scrabbleUtils.js";

const game = new Game();
game.render(document.getElementById("board"));

const rack = new Rack();
rack.render(document.getElementById("rack"), game);

document.getElementById("play").addEventListener("click", () => {
  const word = document.getElementById("word").value;
  const x = parseInt(document.getElementById("x").value);
  const y = parseInt(document.getElementById("y").value);
  const direction = document.getElementById("direction").value === "horizontal";
  const available = rack.available;

  if (!canConstructWord(available, word)) {
    alert("Your are missing some tiles to make this word!");
  } else {
    game.playAt(word, { x, y }, direction);
    game.render(document.getElementById("board"));
    rack.removeTile(word, document.getElementById("rack"), game);
  }
});

document.getElementById("reset").addEventListener("click", () => {
  game.resetGameState();
});

document.getElementById("help").addEventListener("click", () => {
  const hint = document.getElementById("hint");
  hint.innerHTML = "";
  const available = rack.available;
  let possible = bestPossibleWords(available);
  console.log(possible);
  const div = document.createElement("div");
  div.classList.add("hint_text");
  let length = possible.length;
  let rand = length === 0 ? 1 : Math.floor(Math.random() * --length);
  div.innerText = "Hint: " + possible[rand];
  hint.appendChild(div);
});
