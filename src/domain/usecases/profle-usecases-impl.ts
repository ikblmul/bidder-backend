import {
  ProfileInput,
  ProfileInputWithoutPass,
  ProfileOutput,
  ProfileParamUsecase,
  ProfileRepository,
  ProfileUsecase,
} from "./../interfaces/dao/profile";
import { successResult, errorResult, validateResult } from "../helper/result-data-helper";
import { MessageString, PaginateResult, ResultData } from "../interfaces/dao/helper";
import { userValdation } from "../validate/user-validate";
import paginateHelper from "../helper/paginate";
import { UUID_ID } from "../interfaces/types";
import zodErrorHandler from "../helper/zodError";
import { profileValdation } from "../validate/profile-validate";

class ProfileUsecaseImpl implements ProfileUsecase {
  constructor(public profileRepository: ProfileRepository) {}

  async create(payload: ProfileInput): Promise<ResultData<ProfileOutput>> {
    const validation = profileValdation().safeParse(payload);

    if (!validation.success) return validateResult(zodErrorHandler(validation.error));

    // store
    const userStore = await this.profileRepository.store(validation.data);

    console.log(userStore);

    if (!userStore) return errorResult("something when wrong with store profile");

    // send confirmation
    return successResult(userStore as ProfileOutput);
  }

  async deleteById(id: string): Promise<ResultData<MessageString>> {
    return errorResult("Not implemented");
  }

  async updateById(id: string, payload: ProfileInput): Promise<ResultData<MessageString>> {
    return errorResult("Not Implemented");
  }

  async getWithPaginate(
    payload: ProfileParamUsecase
  ): Promise<ResultData<PaginateResult<ProfileInputWithoutPass>>> {
    // not implemented

    return errorResult("not implemented");
  }

  async getById(id: string): Promise<ResultData<ProfileOutput>> {
    return errorResult("not implemented");
  }
}

export default ProfileUsecaseImpl;
