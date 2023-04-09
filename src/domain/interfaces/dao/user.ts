import { ID, NotFound, SomethingWrong } from "../types";
import { PaginateResult, paginateParameter, sortSpecs } from "./helper";

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

interface UserParam extends sortSpecs {
  username: string;
}

export interface UserRepository {
  getById(id: ID): Promise<UserOutput | NotFound>;
  getByUsername(username: UserParam): Promise<UserOutput | NotFound>;
  getAll(): Promise<UserOutput[]>;
  updateById(id: ID, payload: UserInput): Promise<UserOutput | NotFound>;
  store(payload: UserInput): Promise<UserOutput | SomethingWrong>;
}

// Usercases Contract

export interface UserUsecase {
  getById(id: ID): Promise<UserOutput | NotFound>;
  authtenicate(
    payload: Omit<UserInput, "fullname">
  ): Promise<UserOutput | NotFound>;
  getWithPaginate(
    payload: paginateParameter
  ): Promise<PaginateResult<Omit<UserOutput, "password">>>;
  create(payload: UserInput): Promise<UserOutput>;
  updateById(id: ID, payload: UserInput): Promise<UserOutput>;
  deleteById(id: ID): Promise<UserOutput>;
  deleteBulk(ids: ID[]): Promise<boolean>;
}
