import { ID, NotFound, SomethingWrong } from "../types";
import {
  PaginateResult,
  PaginateParameter,
  SortSpecs,
  ErrorResult,
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

// Repositories Contract

interface UserParam extends SortSpecs {
  username: string;
}

export interface UserRepository {
  getById(id: ID): Promise<UserOutput | NotFound>;
  getByUsername(username: string): Promise<UserOutput | NotFound>;
  getAll(payload: UserParam): Promise<UserOutput[]>;
  updateById(id: ID, payload: UserInput): Promise<UserOutput | NotFound>;
  store(payload: UserInput): Promise<UserOutput | SomethingWrong>;
  hasUniqueUsername(username: string, id: ID): Promise<boolean>;
}

// Usercases Contract

export interface UserUsecase {
  getById(id: ID): Promise<UserOutput | NotFound>;
  authtenicate(
    payload: Omit<UserInput, "fullname">
  ): Promise<UserOutput | NotFound>;
  getWithPaginate(
    payload: PaginateParameter
  ): Promise<PaginateResult<Omit<UserOutput, "password">>>;
  create(payload: UserInput): Promise<UserOutput | ErrorResult>;
  updateById(id: ID, payload: UserInput): Promise<UserOutput | ErrorResult>;
  deleteById(id: ID): Promise<UserOutput>;
  deleteBulk(ids: ID[]): Promise<boolean>;
}
