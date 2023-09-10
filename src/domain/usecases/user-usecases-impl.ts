import { ProfileRepository } from "./../interfaces/dao/profile";
import { successResult, errorResult, validateResult } from "./../helper/result-data-helper";
import {
  UserInput,
  UserInputWithoutPass,
  UserOutput,
  UserParamAll,
  UserParamUsecase,
  UserRepository,
} from "./../interfaces/dao/user";
import { UserUsecase } from "../interfaces/dao/user";
import { MessageString, PaginateResult, ResultData } from "../interfaces/dao/helper";
import { userValdation } from "../validate/user-validate";
import paginateHelper from "../helper/paginate";
import { userAuthenticateValidation } from "../validate/user-validate";
import { makeHash, verifyHash } from "../helper/hash";
import { UUID_ID } from "../interfaces/types";
import zodErrorHandler from "../helper/zodError";

class UserUsercasesImpl implements UserUsecase {
  constructor(public userRepository: UserRepository, public profileRepository: ProfileRepository) {}

  async authtenicate(payload: Omit<UserInput, "fullname">): Promise<ResultData<UserOutput>> {
    const validation = userAuthenticateValidation().safeParse(payload);

    if (!validation.success) return validateResult(zodErrorHandler(validation.error));

    const user = await this.userRepository.getByUsername(validation.data.username);

    // check if username not Exists
    if (!user) return validateResult("Username Not Found");

    if (!(await verifyHash(user.password, payload.password)))
      return validateResult("password doesn't match");

    return successResult(user as UserOutput);
  }

  async create(payload: UserInput): Promise<ResultData<UserOutput>> {
    const validation = userValdation().safeParse(payload);

    if (!validation.success) return validateResult(zodErrorHandler(validation.error));

    // check if username or email exists not Exists
    if (
      await this.userRepository.hasUniqueToOther({
        username: validation.data.username,
        email: validation.data.email,
      })
    )
      return validateResult("the username or email has exists please try new one");

    // hashing password
    const hash = await makeHash(validation.data.password);

    if (hash.error) return errorResult(hash.message as string);

    validation.data.password = hash.password as string;

    // store user information
    const userStore = await this.userRepository.store(validation.data);

    console.log(userStore);

    if (!userStore) return errorResult("something when wrong with store user");

    console.log(userStore.id);
    // store profile information
    await this.profileRepository.assignToEmptyProfile(userStore.id);

    // send confirmation
    return successResult(userStore as UserOutput);
  }

  async updateById(id: UUID_ID, payload: UserInput): Promise<ResultData<MessageString>> {
    const validation = userValdation().safeParse(payload);

    if (!validation.success) return validateResult(validation.error.message);

    if (!(await this.userRepository.hasUniqueUsername(payload.username, id)))
      return errorResult(
        "what da heil is your insert ?, is in database alredy pick another username"
      );

    const userUpdate = await this.userRepository.updateById(id, validation.data);

    if (!userUpdate) errorResult("Something went wrong when update data");

    return successResult({ message: "success update data" });
  }

  async getWithPaginate({
    limit,
    page,
    username,
  }: UserParamUsecase): Promise<ResultData<PaginateResult<UserInputWithoutPass>>> {
    let param: UserParamAll = {
      limit: limit,
      skip: limit * (page <= 1 ? 0 : page),
      keyOnly: ["id", "username", "createdAt", "updatedAt", "email"],
    };

    username && (param.username = username);

    return successResult(
      paginateHelper<UserInputWithoutPass>({
        data: (await this.userRepository.getAll(param)) as UserInputWithoutPass[],
        filterTotal: await this.userRepository.count(param),
        total: -1,
        limit,
        page,
      })
    );
  }

  async deleteBulk(ids: UUID_ID[]): Promise<boolean> {
    return false;
  }

  async getById(id: UUID_ID): Promise<ResultData<UserOutput>> {
    // convert type to partial causing delete password
    const user = ((await this.userRepository.getById(id)) as Partial<UserOutput>) || null;

    if (!user) return errorResult("User Not Found");

    delete user.password;

    return successResult<UserOutput>(user as unknown as UserOutput);

    // return errorResult("Not Implemented");
  }

  async deleteById(id: UUID_ID): Promise<ResultData<MessageString>> {
    if (await this.userRepository.deleteById(id))
      return errorResult("there was error when deleting user");

    return successResult({ message: "Delete Successfully" });
  }
}

export default UserUsercasesImpl;
