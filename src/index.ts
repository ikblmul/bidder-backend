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

bootstrap({
  appExpress: app,
  port: port as number,
});
