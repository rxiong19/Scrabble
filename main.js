import { Game } from "./game.js";

const game = new Game();
game.render(document.getElementById("board"));

// TODO #6: Implement the event listener for the Play! button.
const btn = document.getElementById("submit");

const getValues = () => {
  const word = document.getElementById("word").value;
  const x_grid = document.getElementById("x").value;
  const y_grid = document.getElementById("y").value;
  const dir = document.getElementById("dir").value;

  let direction = dir === "true";
  let position = { x: Number(x_grid), y: Number(y_grid) };
  game.playAt(word, position, direction);
  game.render(document.getElementById("board"));
};

btn.addEventListener("click", getValues);
