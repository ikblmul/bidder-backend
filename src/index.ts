import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import CreateSqlConnection from "./data-sources/impl/data-source-mysql";
import config from "./infrastructure/config/config";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

// Database Connection

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
