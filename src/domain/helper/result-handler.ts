import Express from "express";
import { ObjectString, Result, ResultData } from "../interfaces/dao/helper";
import { ResultType } from "../interfaces/types";
const responseByResult: ObjectString<number> = {
  [ResultType.ERROR]: 500,
  [ResultType.VALIDATION]: 400,
  [ResultType.SUCCESS]: 200,
  [ResultType.NOTFOUND]: 404,
};

const resultHandler = (res: Express.Response, result: ResultData<unknown>) => {
  // set status code depends on status resutl
  res.status(responseByResult[result.status]);

  if (result.status === ResultType.SUCCESS) return res.send(result.message);

  return res.send({ message: result.message });
};

export default resultHandler;
