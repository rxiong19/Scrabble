import { shuffle } from "./shuffle.js";
import { scoring } from "./scoring.js";

export class Game {
  constructor() {
    // TODO #1: Initialize the game state
    this.bag = [];
    this.grid = [];

    let bag_manual = {
      "*": 2,
      a: 9,
      b: 2,
      c: 2,
      d: 4,
      e: 12,
      f: 2,
      g: 3,
      h: 2,
      i: 9,
      j: 1,
      k: 1,
      l: 4,
      m: 2,
      n: 6,
      o: 8,
      p: 2,
      q: 1,
      r: 6,
      s: 4,
      t: 6,
      u: 4,
      v: 2,
      w: 2,
      x: 1,
      y: 2,
      z: 1,
    };
    let init_bag = [];
    for (const [key, value] of Object.entries(bag_manual)) {
      for (let i = 0; i < value; i++) {
        init_bag.push(key);
      }
    }
    //console.log(init_bag);
    this.bag = shuffle(init_bag);

    for (let i = 0; i < 15; i++) {
      this.grid.push([
        [null],
        [null],
        [null],
        [null],
        [null],
        [null],
        [null],
        [null],
        [null],
        [null],
        [null],
        [null],
        [null],
        [null],
        [null],
      ]);
    }
    console.log(this.grid);
  }

  render(element) {
    // TODO #5: Render the board.
    element.innerHTML = "";

    this.grid.forEach((row, row_index) => {
      //console.log(row_index);
      row.forEach((grid, grid_index) => {
        let label = scoring.label(row_index + 1, grid_index + 1);
        //console.log("( " + row_index + " , " + grid_index + ") : " + label);
        //console.log(grid[0]);
        if (label !== "") {
          if (grid[0] !== null) {
            element.innerHTML +=
              "<div class='grid-item " + label + "'>" + grid[0] + "<div>";
          } else {
            element.innerHTML += "<div class='grid-item " + label + "'> <div>";
          }
        } else {
          if (grid[0] !== null) {
            element.innerHTML += "<div class='grid-item'>" + grid[0] + "<div>";
          } else {
            element.innerHTML += "<div class='grid-item'> <div>";
          }
        }
      });
    });
  }

  /**
   * This function removes the first n tiles from the bag and returns them. If n
   * is greater than the number of remaining tiles, this removes and returns all
   * the tiles from the bag. If the bag is empty, this returns an empty array.
   *
   * @param {number} n The number of tiles to take from the bag.
   * @returns {Array<string>} The first n tiles removed from the bag.
   */
  takeFromBag(n) {
    // TODO #3: Take n tiles from the bag.
    let bag = Object.assign([], this.bag);
    let will_take = [];
    if (bag.length >= n) {
      will_take = bag.slice(0, n);
      this.bag = bag.slice(n, bag.length);
    } else if (bag.length < n && bag.length > 0) {
      will_take = this.bag;
      this.bag = [];
    }
    return will_take;
  }

  /**
   * This function returns the current state of the board. The positions where
   * there are no tiles can be anything (undefined, null, ...).
   *
   * @returns {Array<Array<string>>} A 2-dimensional array representing the
   * current grid.
   */
  getGrid() {
    return this.grid;
  }

  _canBePlacedOnBoard(word, position, direction) {
    const cur_grid = this.grid;
    let available_space = 0;
    const x = Number(position["x"]) - 1;
    const y = Number(position["y"]) - 1;
    console.log(x + ", " + y);

    if (!direction) {
      //vertical
      for (let i = y; i < 15; i++) {
        console.log(x + ", " + i);
        if (cur_grid[x][i][0] === null) {
          available_space += 1;
        } else {
          break;
        }
      }
    } else {
      for (let i = x; i < 15; i++) {
        if (cur_grid[i][y][0] === null) {
          available_space += 1;
        } else {
          break;
        }
      }
    }
    console.log("available:" + available_space);
    console.log(available_space >= word.length);
    return available_space >= word.length ? true : false;
  }

  _placeOnBoard(word, position, direction) {
    // TODO #2: Place the word on the board.
    const x = Number(position["x"]) - 1;
    const y = Number(position["y"]) - 1;
    if (!direction) {
      //vertical
      let j = 0;

      for (let i = y; i < word.length + y; i++) {
        this.grid[x][i] = word[j];
        //console.log(this.grid[y - 1][i][0]);
        j += 1;
      }
    } else {
      let j = 0;
      for (let i = x; i < word.length + x; i++) {
        this.grid[i][y] = word[j];
        j += 1;
      }
    }
  }

  /**
   * This function will be called when a player takes a turn and attempts to
   * place a word on the board. It will check whether the word can be placed at
   * the given position. If not, it'll return -1. It will then compute the score
   * that the word will receive and return it, taking into account special
   * positions.
   *
   * @param {string} word The word to be placed.
   * @param {Object<x|y, number>} position The position, an object with
   * properties x and y. Example: { x: 2, y: 3 }.
   * @param {boolean} direction Set to true if horizontal, false if vertical.
   * @returns {number} The score the word will obtain (including special tiles),
   * or -1 if the word cannot be placed.
   */
  playAt(word, position, direction) {
    // We first check if the word can be placed
    if (!this._canBePlacedOnBoard(word, position, direction)) {
      return -1;
    }

    // Place the word on the board
    this._placeOnBoard(word, position, direction);

    // Compute the score
    return scoring.score(word, position, direction);
  }
}
