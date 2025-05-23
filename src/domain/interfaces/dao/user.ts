import { ID, NotFound, SomethingWrong } from "../types";
import {
  PaginateResult,
  PaginateParameter,
  ErrorResult,
  PaginateSort,
} from "./helper";

export interface UserOutput {
  id: ID;
  username: string;
  password: string;
  fullname: string;
}

export interface UserInput {
  //   id: ID;
  username: string;
  password: string;
  fullname: string;
}

export type UserInputWithoutPass = Omit<UserOutput, "password">;

// Repositories Contract

export interface UserParam {
  username?: string;
}

export type UserParamAll = Partial<
  UserParam & PaginateSort & { keyOnly: (keyof UserOutput)[] }
>;
export type UserParamUsecase = UserParam & PaginateParameter;
export interface UserRepository {
  getById(id: ID): Promise<UserOutput | NotFound>;
  getByUsername(username: string): Promise<UserOutput | NotFound>;
  getAll(payload?: UserParamAll): Promise<UserOutput[]>;
  updateById(id: ID, payload: UserInput): Promise<UserOutput | NotFound>;
  store(payload: UserInput): Promise<UserOutput | SomethingWrong>;
  hasUniqueUsername(username: string, id: ID): Promise<boolean>;
}

// Usercases Contract

export interface UserUsecase {
  getById(id: ID): Promise<UserOutput | ErrorResult>;
  authtenicate(
    payload: Omit<UserInput, "fullname">
  ): Promise<UserOutput | ErrorResult>;
  getWithPaginate(
    payload: UserParamUsecase
  ): Promise<PaginateResult<UserInputWithoutPass>>;
  create(payload: UserInput): Promise<UserOutput | ErrorResult>;
  updateById(id: ID, payload: UserInput): Promise<UserOutput | ErrorResult>;
  deleteById(id: ID): Promise<UserOutput>;
  deleteBulk(ids: ID[]): Promise<boolean>;
}
