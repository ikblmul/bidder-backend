import CreateSqlConnection from "../../../src/data-sources/impl/data-source-mysql";

require("dotenv").config(".test.env");

export const InitDB = async () => {
  return CreateSqlConnection({
    db: process.env.DB_NAME as string,
    username: process.env.DB_USER as string,
    password: process.env.DB_PASS as string,
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT as string),
  });
};
