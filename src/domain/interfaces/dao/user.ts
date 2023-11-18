import { NotFound, SomethingWrong, UUID_ID } from "../types";
import {
  PaginateResult,
  PaginateParameter,
  ErrorResult,
  PaginateSort,
  ResultData,
  MessageString,
} from "./helper";

export type USER_ID = UUID_ID;
export interface UserOutput {
  id: USER_ID;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  email: string;
}
export interface UserInput {
  //   id: USER_ID;
  username: string;
  password: string;
  email: string;
}

export type UserInputWithoutPass = Omit<UserOutput, "password">;

// Repositories Contract
export interface UserParam {
  username?: string;
}

export type UserParamAll = Partial<UserParam & PaginateSort & { keyOnly: (keyof UserOutput)[] }>;
export type UserParamUsecase = UserParam & PaginateParameter;
export interface UserRepository {
  getById(id: USER_ID): Promise<UserOutput | NotFound>;
  getByUsername(username: string): Promise<UserOutput | NotFound>;
  // getByEmail(email: string): Promise<UserOutput | NotFound>;
  hasUniqueToOther(keys: Partial<Omit<UserInput, "password">>): Promise<boolean>;
  getAll(payload?: UserParamAll): Promise<UserOutput[]>;
  // count()
  updateById(id: USER_ID, payload: UserInput): Promise<boolean>;
  store(payload: UserInput): Promise<UserOutput | SomethingWrong>;
  hasUniqueUsername(username: string, id: USER_ID): Promise<boolean>;
  deleteById(id: USER_ID): Promise<boolean>;
  count(payload?: Pick<UserParamAll, "username">): Promise<number>;
}

// Usercases Contract
export interface UserUsecase {
  getById(id: USER_ID): Promise<ResultData<UserOutput>>;
  getWithPaginate(
    payload: UserParamUsecase
  ): Promise<ResultData<PaginateResult<UserInputWithoutPass>>>;
  create(payload: UserInput): Promise<ResultData<UserOutput>>;
  updateById(id: USER_ID, payload: UserInput): Promise<ResultData<MessageString>>;
  deleteById(id: USER_ID): Promise<ResultData<MessageString>>;
  deleteBulk(ids: USER_ID[]): Promise<boolean>;
}
