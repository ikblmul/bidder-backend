import { Express, json as ExpressJson } from "express";
import AuthRoutes from "../routes/auth-routes";
import UserRoutes from "../routes/user-routes";
import UserController from "../controller/user-controller";
import { AdapterCtrl } from "../../../domain/helper/route-helper";

export interface requireControllers {
  userController: UserController;
}

const express = (app: Express, controllers: requireControllers) => {
  // initial express dependencies
  app.use(ExpressJson());
  // console.log(controllers);

  app.use("/api/v1/auth", AuthRoutes());
  app.use("/api/v1/users", UserRoutes(AdapterCtrl(controllers.userController)));
};

export default express;
