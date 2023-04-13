import * as dotenv from "dotenv";
import CreateSqlConnection from "./data-sources/impl/data-source-mysql";
import config from "./infrastructure/config/config";
import { DataSource } from "typeorm";
import UserRepositoryImpl from "./domain/repositories/user-repository-impl";

interface InputBootstrap {
  // sqlDatasource: DataSource;
}

const bootstrap = ({}: InputBootstrap) => {
  // setup datasources
  const mysqlConnection = CreateSqlConnection({
    db: config.database.host,
    username: config.database.username,
    password: config.database.password,
    host: config.database.host,
    port: config.database.port,
  });

  // setup repositories
  const userRepository = new UserRepositoryImpl(mysqlConnection);

  // setup use_cases

  // setup contoller
};

export default bootstrap;
