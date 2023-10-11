import { Request } from "express";

export const logRequest = (req: Request) => {
  console.log(
    `[${req.path}] requested from ${req.ip} - ${req.headers["user-agent"]} `
  );
};
