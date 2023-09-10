import config from "../../infrastructure/config/config";
import { ResultData } from "../interfaces/dao/helper";
import moment from "moment";
import { ResultType } from "../interfaces/types";
import JustLog from "./just-log";

export const resultData = <T = string>(
  status: ResultType,
  message: T,
  tags: string[] = []
): ResultData<T> => {
  // filter exclude from config
  if (config.debug.enable && !config.debug.filters_console.includes(status))
    JustLog(`[${status}] : ${message} (tags :${tags.join(", ")})`);

  return {
    status,
    message,
    tags,
  };
};

export const errorResult = (message: string, tags: string[] = []): ResultData<string> => {
  return resultData(ResultType.ERROR, message, tags);
};

export const validateResult = (message: string, tags: string[] = []): ResultData<string> => {
  return resultData(ResultType.VALIDATION, message, tags);
};

export const successResult = <T extends unknown>(
  message: T,
  tags: string[] = []
): ResultData<T> => {
  return resultData(ResultType.SUCCESS, message, tags);
};
