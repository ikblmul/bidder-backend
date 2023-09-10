// import dotenv from "dotenv";
// import dot env first time
require("dotenv").config();

// console.log(process.env);

import express, { Express } from "express";
import CreateSqlConnection from "./data-sources/impl/data-source-mysql";
import config from "./infrastructure/config/config";
import bootstrap from "./bootstrap";

// Initianting All Dependencies connection
const app: Express = express();
const port = config.app.port || 8000;

const mysqlConnection = CreateSqlConnection({
  db: config.database.name,
  username: config.database.username as string,
  password: config.database.password as string,
  host: config.database.host,
  port: config.database.port,
});

bootstrap({
  appExpress: app,
  sqlDatasource: mysqlConnection,
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
