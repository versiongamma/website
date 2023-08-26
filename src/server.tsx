import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { App } from "./app";
import path from "path";
import fs from "fs";

const app = express();

app.get("/", (_req, res) => {
  const app = ReactDOMServer.renderToString(React.createElement(App));
  const indexFile = path.resolve("./build/index.html");

  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong: ", err);
      return res.status(500).send("Oops, better luck next time!");
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

app.use(express.static("./build"));

app.listen(4000, () => console.log("Server is running on port 4000"));
