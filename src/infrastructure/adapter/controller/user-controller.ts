import { Request, Response } from "express";
import { UserUsecase } from "../../../domain/interfaces/dao/user";

class UserController {
  constructor(protected userUsecase: UserUsecase) {}

  public getAll(req: Request, res: Response) {
    const page = 1;
    const limit = 10;
    // console.log(this);
    res.send(this.userUsecase.getWithPaginate({ page, limit }));
  }

  private test() {}
}

export default UserController;
