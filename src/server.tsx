import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { App } from "./app";
import path from "path";
import fs from "fs";
import "dotenv/config";

const app = express();

const deployed = process.env.ENV !== "local";

app.get("/", (_req, res) => {
  const app = ReactDOMServer.renderToString(React.createElement(App));
  const indexFile = path.join(__dirname, "index.html");

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

app.use(express.static("./"));

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
