import {
  UserInput,
  UserInputWithoutPass,
  UserOutput,
  UserRepository,
} from "./../interfaces/dao/user";
import { UserUsecase } from "../interfaces/dao/user";
import {
  ErrorResult,
  PaginateParameter,
  PaginateResult,
} from "../interfaces/dao/helper";
import { userValdation } from "../validate/user-validate";

class userUsercasesImpl implements UserUsecase {
  constructor(public userRepository: UserRepository) {}

  async create(payload: UserInput): Promise<UserOutput | ErrorResult> {
    const validation = userValdation().safeParse(payload);

    if (!validation.success) return { message: validation.error.message };

    // check if username not Exists
    if (!(await this.userRepository.getByUsername(validation.data.username)))
      return {
        message:
          "what da heil is your insert ?, is in database alredy pick another username",
      };

    const userStore = await this.userRepository.store(validation.data);

    if (!userStore) return { message: "something when wrong with userStore" };

    return userStore as UserOutput;
  }

  async updateById(
    id: number,
    payload: UserInput
  ): Promise<UserOutput | ErrorResult> {
    const validation = userValdation().safeParse(payload);

    if (!validation.success) return { message: validation.error.message };

    if (!(await this.userRepository.hasUniqueUsername(payload.username, id)))
      return {
        message:
          "what da heil is your insert ?, is in database alredy pick another username",
      };

    const userUpdate = await this.userRepository.updateById(
      id,
      validation.data
    );

    return userUpdate as UserOutput;
  }

  async getWithPaginate(
    payload: PaginateParameter
  ): Promise<PaginateResult<UserInputWithoutPass>> {}
}
