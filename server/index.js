import { readFile } from "fs/promises";
import * as http from "http";
import * as url from "url";
import { database } from "./database.js";

// A basic server function to implement a simple RESTful API.
async function basicServer(request, response) {
  // Parse the URL to get the pathname and the query parameters.
  const parsedUrl = url.parse(request.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // Grab the HTTP method.
  const method = request.method;

  if (method === "POST" && pathname === "/wordScore") {
    // TODO #8: Implement the /wordScore endpoint.
    const { name, word, score } = query;
    if (!name || !word || !score) {
      response.statusCode = 400;
      response.end("Missing name/word/score");
    } else {
      await database.saveWordScore(name, word, score);
      response.statusCode = 200;
      response.end();
    }
  } else if (method === "GET" && pathname === "/highestWordScores") {
    // TODO #9: Implement the /highestWordScores endpoint.
    try {
      const highestWordScores = await database.top10WordScores();
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify(highestWordScores));
      response.end();
    } catch (err) {
      console.error(err);
      response.statusCode = 404;
      response.write("Cannot find the scores");
      response.end();
    }
  } else if (method === "POST" && pathname === "/gameScore") {
    // TODO #10: Implement the /gameScore endpoint.
    const { name, score } = query;
    if (!name || !score) {
      response.statusCode = 400;
      response.write("Missing name/score");
      response.end();
    } else {
      await database.saveGameScore(name, score);
      response.writeHead(200);
      response.end();
    }
  } else if (method === "GET" && pathname === "/highestGameScores") {
    // TODO #11: Implement the /highestGameScores endpoint.
    try {
      const highestPlayerScores = await database.top10GameScores();
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify(highestPlayerScores));
      response.end();
    } catch (err) {
      console.error(err);
      response.statusCode = 404;
      response.write("Cannot find the scores");
      response.end();
    }
  } else {
    // This part handles the static files. If we do not match any of the routes
    // above, we assume it is a static file and serve it from the 'client'
    // directory.
    try {
      // Determine the content type of the requested file (if it is a file).
      let type = "";
      if (pathname.endsWith(".css")) {
        type = "text/css";
      } else if (pathname.endsWith(".js")) {
        type = "text/javascript";
      } else if (pathname.endsWith(".json")) {
        type = "application/json";
      } else if (pathname.endsWith(".html")) {
        type = "text/html";
      } else if (pathname.endsWith("/")) {
        type = "text/html";
      } else {
        type = "text/plain";
      }
      // The client files are found in the client directory, so we must prepend
      // the client path to the file requested. We also recognize the meaning of
      // a '/' to refer to the index.html file.
      const file = pathname === "/" ? "client/index.html" : `client${pathname}`;
      const data = await readFile(file, "utf8");
      response.writeHead(200, { "Content-Type": type });
      response.write(data);
    } catch (err) {
      response.statusCode = 404;
      response.write("Not found");
    }
    response.end();
  }
}

// Start the server on port 3000.
http.createServer(basicServer).listen(3000, () => {
  console.log("Server started on port 3000");
});
