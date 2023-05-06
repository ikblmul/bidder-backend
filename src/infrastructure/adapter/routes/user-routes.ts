import express from "express";
import UserController from "../controller/user-controller";
import { CtrlParamRouter } from "../../../domain/helper/route-helper";

const UserRoutes = (ctrlFactory: CtrlParamRouter<UserController>) => {
  const route = express.Router();

  // console.log("senderhana", controller);

  route.get("/", ctrlFactory.action("getAll"));

  return route;
};

export default UserRoutes;
