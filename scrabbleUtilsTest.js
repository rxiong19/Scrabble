// This is how we important symbols from other modules. This basically means
// that we are importing the four functions we defined in the `scrabbleUtils.js`
// file.
import {
  canConstructWord,
  baseScore,
  possibleWords,
  bestPossibleWords,
} from "./scrabbleUtils.js";

console.assert(
  canConstructWord({ c: 1, f: 2, r: 1, b: 1, a: 1, e: 1 }, "crab"),
  "This error message will print if the test fails"
);
// student test
console.assert(
  canConstructWord({ a: 1, c: 2, t: 1 }, "cat"),
  "This error message will print if the test fails"
);
console.assert(
  canConstructWord({ "*": 1, c: 2, t: 1, e: 1 }, "cett"),
  "This error message will print if the test fails"
);
console.assert(
  baseScore("cat") === 5,
  "This error message will print if the test fails"
);
console.assert(
  baseScore("kitty") === 12,
  "This error message will print if the test fails"
);
console.assert(
  baseScore("xray") === 14,
  "This error message will print if the test fails"
);
console.assert(
  baseScore("c*t") === 4,
  "This error message will print if the test fails"
);
console.assert(
  possibleWords({ a: 1, c: 2, t: 1, "*": 1 }),
  "This error message will print if the test fails"
);
console.assert(
  bestPossibleWords({ a: 1, c: 2, t: 1, "*": 1 }),
  "This error message will print if the test fails"
);
// Write more tests here. The more tests your write the more you can be assured
// that your code is correct. It is not only important to do in a homework
// assignment, but a critical part of writing code in the real world.
