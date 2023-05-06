import { ErrorResult } from "../interfaces/dao/helper";

export const errorResult = (
  message: string,
  type: string = "error"
): ErrorResult => {
  console.timeStamp(`${type} [${message}]`);

  return { message, error: type };
};
