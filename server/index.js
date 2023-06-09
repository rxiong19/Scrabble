import chalkAnimation from "chalk-animation";
import { database } from "./database.js";
// TODO #1: Import Morgan and Express
import express from "express";
import logger from "morgan";
// TODO #2: Create an Express app.
const app = express();
const port = process.env.PORT || 5500;
// TODO #3: Add middleware to the Express app.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use("/", express.static("client"));

// TODO #4: Implement the /wordScore endpoint
app.post("/wordScore", (req, res) => {
  const entry = req.body;
  database.saveWordScore(entry["name"], entry["word"], entry["score"]);
  res.status(200).json({ status: "success" });
});
// TODO #5: Implement the /highestWordScores endpoint
app.post("/highestWordScores", async (req, res) => {
  const highestWord = await database.top10WordScores();
  res.status(200).json(highestWord);
});
// TODO #6: Implement the /gameScore endpoint
app.post("/gameScore", (req, res) => {
  const entry = req.body;
  console.log(entry);
  database.saveGameScore(entry["name"], entry["score"]);
  res.status(200).json({ status: "success" });
});
// TODO #7: Implement the /highestGameScores endpoint
app.post("/highestGameScores", async (req, res) => {
  const highestGame = await database.top10GameScores();
  res.status(200).json([highestGame]);
});
// EVERYTHING BELOW THIS WILL WORK AFTER YOU IMPLEMENT THE ABOVE

// This matches all routes that are not defined.
app.all("*", async (request, response) => {
  response.status(404).send(`Not found: ${request.path}`);
});

// Start the server.
app.listen(port, () => {
  // This is totally just for fun!
  const banner = `
  .d8888b.                            888      888      888          
  d88P  Y88b                           888      888      888          
  Y88b.                                888      888      888          
   "Y888b.    .d8888b 888d888  8888b.  88888b.  88888b.  888  .d88b.  
      "Y88b. d88P"    888P"       "88b 888 "88b 888 "88b 888 d8P  Y8b 
        "888 888      888     .d888888 888  888 888  888 888 88888888 
  Y88b  d88P Y88b.    888     888  888 888 d88P 888 d88P 888 Y8b.     
   "Y8888P"   "Y8888P 888     "Y888888 88888P"  88888P"  888  "Y8888                                                                       
`;
  const msg = `${banner}\n     Server started on http://localhost:${port}`;
  const rainbow = chalkAnimation.rainbow(msg);

  // Have the rainbow stop so we can log stuff to the console.
  setTimeout(() => {
    rainbow.stop(); // Animation stops
  }, 2000);
});
