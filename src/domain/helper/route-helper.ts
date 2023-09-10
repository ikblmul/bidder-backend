import { Request, Response } from "express";
import { TypeOfClassMethod } from "../interfaces/dao/helper";
import UserController from "../../infrastructure/adapter/controller/user-controller";

type userCtrl = keyof UserController;

export const AdapterCtrl = <T extends unknown>(controller: T) => {
  return {
    action: (method: keyof T) => {
      return (req: Request, res: Response) => {
        console.log(req.body);
        // @ts-ignore
        controller[method].call(controller, req, res);
      };
    },
  };
};

export type CtrlParamRouter<TCtrl> = ReturnType<typeof AdapterCtrl<TCtrl>>;
