export class Rack {
  constructor() {
    this.available = {};
  }

  /**
   * Returns an object of available tiles mapped to their amount.
   *
   * @returns {Object<string, number>} An object describing the tiles available
   * in this rack.
   */
  getAvailableTiles() {
    return this.available;
  }

  /**
   * This function will draw n tiles from the game's bag. If there are not
   * enough tiles in the bag, this should take all the remaining ones.
   *
   * @param {number} n The number of tiles to take from the bag.
   * @param {Game} game The game whose bag to take the tiles from.
   */
  takeFromBag(n, game) {
    for (let tile of game.takeFromBag(n)) {
      console.log(tile.length);
      if (tile in this.available) {
        ++this.available[tile];
      } else {
        this.available[tile] = 1;
      }
    }
  }

  restoreRack() {
    const localStorage = window.localStorage;
    this.available = JSON.parse(localStorage.getItem("rack"));
  }
  saveRack() {
    const localStorage = window.localStorage;
    console.log("saving...");
    localStorage.setItem("rack", JSON.stringify(this.available));
  }

  render(element, game) {
    const localStorage = window.localStorage;
    if (localStorage.getItem("rack") !== null) {
      this.restoreRack();
    } else {
      let need = 0;
      for (let letter of Object.keys(this.available)) {
        need += this.available[letter];
      }
      this.takeFromBag(7 - need, game);
    }

    element.innerHTML = "";
    for (let letter of Object.keys(this.available)) {
      for (let i = 0; i < this.available[letter]; i++) {
        const div = document.createElement("div");
        div.classList.add("grid-item");
        //console.log(letter);
        div.innerText = letter;
        element.appendChild(div);
      }
    }
    this.saveRack();
  }
  removeTile(word, element, game) {
    const localStorage = window.localStorage;
    let letter_requirement = {};
    word.split("").map((letter) => {
      if (letter_requirement[letter] === undefined) {
        letter_requirement[letter] = 0;
      }
      letter_requirement[letter] += 1;
    });
    for (let letter of Object.keys(letter_requirement)) {
      this.available[letter] -= letter_requirement[letter];
      if (this.available[letter] === 0) {
        delete this.available[letter];
      }
    }
    localStorage.removeItem("rack");

    this.render(element, game);
  }
}
