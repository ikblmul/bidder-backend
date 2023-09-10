export type ID = number;
export type UUID_ID = string;
export type SomethingWrong = undefined;
export type NotFound = null;

export enum ResultType {
  ERROR = "error",
  SUCCESS = "success",
  VALIDATION = "validation",
  NOTFOUND = "not found",
}
