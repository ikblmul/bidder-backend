export interface PaginateSort {
  limit: number;
  skip: number;
}
export interface PaginateParameter {
  limit: number;
  page: number;
}

export interface PaginateResult<T> {
  currentPage: number;
  limit: number;
  total: number;
  lastPage: number;
  filterTotal: number;
  data: T[];
}

export interface Result<T> {
  message: T;
  status: string;
  tags?: string[];
}

export interface MessageString {
  message: string;
}

export interface ObjectString<T> {
  [key: string]: T;
}

export type ErrorResult = Result<string>;

export type ResultData<T> = Result<T> | ErrorResult;

export type TypeOfClassMethod<T, M extends keyof T> = T[M] extends Function
  ? T[M]
  : never;
