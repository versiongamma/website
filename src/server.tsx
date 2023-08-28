import express, { static as expressStatic } from "express";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { join as pathJoin } from "path";
import { readFile } from "fs";
import "dotenv/config";

import { App } from "./app";

const app = express();

app.get("/", (_req, res) => {
  const app = renderToString(createElement(App));
  const indexFile = pathJoin(__dirname, "public/index.html");
  console.log(indexFile);

  readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong: ", err);
      return res.status(500).send("Oops, better luck next time!");
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

app.use('/', expressStatic(pathJoin(__dirname, "/public")));

app.listen(process.env.PORT, () =>
  console.log(`⚡️ Site is now live, server running on port ${process.env.PORT}`)
);
