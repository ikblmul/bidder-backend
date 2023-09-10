import CreateSqlConnection from "../../../src/data-sources/impl/data-source-mysql";

export const InitDB = () => {
  return CreateSqlConnection({
    db: process.env.DB_NAME as string,
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASS as string,
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT as string),
  });
};
