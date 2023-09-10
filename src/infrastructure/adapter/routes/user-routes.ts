import express from "express";
import UserController from "../controller/user-controller";
import { CtrlParamRouter } from "../../../domain/helper/route-helper";

const UserRoutes = (ctrlFactory: CtrlParamRouter<UserController>) => {
  const route = express.Router();

  // console.log("senderhana", controller);

  route.get("/", ctrlFactory.action("getAll"));
  route.get("/:id", ctrlFactory.action("getById"));
  route.post("/", ctrlFactory.action("store"));
  route.put("/:id", ctrlFactory.action("update"));
  route.delete("/:id", ctrlFactory.action("remove"));
  // route.post("/", (req, res) => {
  //   console.log(req.body);
  // });

  return route;
};

export default UserRoutes;
