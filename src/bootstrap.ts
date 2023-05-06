import { Express } from "express";
import * as dotenv from "dotenv";
import CreateSqlConnection from "./data-sources/impl/data-source-mysql";
import config from "./infrastructure/config/config";
import { DataSource } from "typeorm";
import UserRepositoryImpl from "./domain/repositories/user-repository-impl";
import UserUsercasesImpl from "./domain/usecases/user-usecases-impl";
import express, {
  requireControllers,
} from "./infrastructure/adapter/webserver/express";
import UserController from "./infrastructure/adapter/controller/user-controller";

interface InputBootstrap {
  sqlDatasource: DataSource;
  appExpress: Express;
}

const bootstrap = ({ appExpress, sqlDatasource }: InputBootstrap) => {
  // setup repositories
  const userRepository = new UserRepositoryImpl(sqlDatasource);

  // setup use_cases
  const userUsecase = new UserUsercasesImpl(userRepository);

  // setup contoller
  const controllers: requireControllers = {
    userController: new UserController(userUsecase),
  };

  // setup middlewares

  // setup routes
  express(appExpress, controllers);
};

export default bootstrap;
