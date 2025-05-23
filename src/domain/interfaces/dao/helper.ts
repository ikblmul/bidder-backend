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

export interface ErrorResult {
  message: string;
  error: string;
}

export type TypeOfClassMethod<T, M extends keyof T> = T[M] extends Function
  ? T[M]
  : never;
