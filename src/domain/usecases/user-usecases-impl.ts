import {
  UserInput,
  UserInputWithoutPass,
  UserOutput,
  UserParamAll,
  UserParamUsecase,
  UserRepository,
} from "./../interfaces/dao/user";
import { UserUsecase } from "../interfaces/dao/user";
import {
  ErrorResult,
  PaginateParameter,
  PaginateResult,
} from "../interfaces/dao/helper";
import { userValdation } from "../validate/user-validate";
import paginateHelper from "../helper/paginate";
import { userAuthenticateValidation } from "../validate/user-validate";
import { makeHash, verifyHash } from "../helper/hash";
import { errorResult } from "../helper/error";

class UserUsercasesImpl implements UserUsecase {
  constructor(public userRepository: UserRepository) {}

  async authtenicate(
    payload: Omit<UserInput, "fullname">
  ): Promise<UserOutput | ErrorResult> {
    const validation = userAuthenticateValidation().safeParse(payload);

    if (!validation.success)
      return errorResult(validation.error.message, "validation");

    const user = await this.userRepository.getByUsername(
      validation.data.username
    );

    // check if username not Exists
    if (!user) return errorResult("Username Not Found", "validation");

    if (!(await verifyHash(user.password, payload.password)))
      return errorResult("password doesn't match", "validation");

    return user;
  }

  async create(payload: UserInput): Promise<UserOutput | ErrorResult> {
    const validation = userValdation().safeParse(payload);

    if (!validation.success) return errorResult(validation.error.message);

    // check if username not Exists
    if (!(await this.userRepository.getByUsername(validation.data.username)))
      return errorResult(
        "what da heil is your insert ?, is in database alredy pick another username",
        "validation"
      );

    // hashing password
    const hash = await makeHash(validation.data.password);

    if (hash.error) return errorResult(hash.message as string);

    validation.data.password = hash.password as string;

    // store
    const userStore = await this.userRepository.store(validation.data);

    if (!userStore) return errorResult("something when wrong with store user");

    return userStore as UserOutput;
  }

  async updateById(
    id: number,
    payload: UserInput
  ): Promise<UserOutput | ErrorResult> {
    const validation = userValdation().safeParse(payload);

    if (!validation.success)
      return errorResult(validation.error.message, "validation");

    if (!(await this.userRepository.hasUniqueUsername(payload.username, id)))
      return errorResult(
        "what da heil is your insert ?, is in database alredy pick another username"
      );

    const userUpdate = await this.userRepository.updateById(
      id,
      validation.data
    );

    return userUpdate as UserOutput;
  }

  async getWithPaginate({
    limit,
    page,
    username,
  }: UserParamUsecase): Promise<PaginateResult<UserInputWithoutPass>> {
    // Default Limit is 10

    let param: UserParamAll = {
      limit: limit,
      skip: limit * page,
      keyOnly: ["id", "fullname", "username"],
    };

    console.log(param);

    username && (param.username = username);

    return paginateHelper<UserInputWithoutPass>({
      data: (await this.userRepository.getAll(param)) as UserInputWithoutPass[],
      total: 0,
      filterTotal: 9,
      limit,
      page,
    });
  }

  async deleteBulk(ids: number[]): Promise<boolean> {
    return false;
  }

  async getById(id: number): Promise<UserOutput | ErrorResult> {
    return errorResult("Not Implemented");
  }

  async deleteById(id: number): Promise<UserOutput> {
    return {} as UserOutput;
  }
}

export default UserUsercasesImpl;
