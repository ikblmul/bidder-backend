import { Request, Response } from "express";
import { UserUsecase } from "../../../domain/interfaces/dao/user";
import resultHandler from "../../../domain/helper/result-handler";

class UserController {
  constructor(protected userUsecase: UserUsecase) {}

  public async getAll(req: Request, res: Response) {
    const page = 1;
    const limit = 10;
    // console.log(this);
    res.send(await this.userUsecase.getWithPaginate({ page, limit }));
  }

  public async store(req: Request, res: Response) {
    // console.log(req, res);
    const result = await this.userUsecase.create(req.body);

    resultHandler(res, result);
  }

  public async update(req: Request, res: Response) {
    // console.log(req, res);
    const result = await this.userUsecase.updateById(req.params.id, req.body);

    resultHandler(res, result);
  }

  public async remove(req: Request, res: Response) {
    // console.log(req, res);
    const result = await this.userUsecase.deleteById(req.params.id);

    resultHandler(res, result);
  }

  public async getById(req: Request, res: Response) {
    const result = await this.userUsecase.getById(req.params.id);

    resultHandler(res, result);
  }
}

export default UserController;
