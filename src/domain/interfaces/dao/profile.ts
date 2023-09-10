import { NotFound, SomethingWrong, UUID_ID } from "../types";
import {
  PaginateResult,
  PaginateParameter,
  ErrorResult,
  PaginateSort,
  ResultData,
  MessageString,
} from "./helper";
import { USER_ID } from "./user";

export type PROFILE_ID = UUID_ID;

export interface ProfileOutput {
  id: PROFILE_ID;
  fullname: string;
  address: string;
  phoneNumber: string;
  verified: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface ProfileInput {
  //   id: Profile_ID;
  userId: USER_ID;
  fullname: string;
  address: string;
  phoneNumber: string;
  verified: boolean;
}

export type ProfileInputWithoutPass = Omit<ProfileOutput, "password">;

// Repositories Contract
export interface ProfileParam {
  fullname?: string;
}

export type ProfileParamAll = Partial<
  ProfileParam & PaginateSort & { keyOnly: (keyof ProfileOutput)[] }
>;
export type ProfileParamUsecase = ProfileParam & PaginateParameter;

export interface ProfileRepository {
  getById(id: PROFILE_ID): Promise<ProfileOutput | NotFound>;
  getAll(payload?: ProfileParamAll): Promise<ProfileOutput[]>;
  updateById(id: PROFILE_ID, payload: Omit<Partial<ProfileInput>, "userId">): Promise<boolean>;
  store(payload: ProfileInput): Promise<ProfileOutput | SomethingWrong>;
  deleteById(id: PROFILE_ID): Promise<boolean>;
  assignToEmptyProfile(userId: USER_ID): Promise<ProfileOutput | SomethingWrong>;
}

// Profilecases Contract
export interface ProfileUsecase {
  getById(id: PROFILE_ID): Promise<ResultData<ProfileOutput>>;
  getWithPaginate(
    payload: ProfileParamUsecase
  ): Promise<ResultData<PaginateResult<ProfileInputWithoutPass>>>;
  create(payload: ProfileInput): Promise<ResultData<ProfileOutput>>;
  updateById(id: PROFILE_ID, payload: ProfileInput): Promise<ResultData<MessageString>>;
  deleteById(id: PROFILE_ID): Promise<ResultData<MessageString>>;
}
