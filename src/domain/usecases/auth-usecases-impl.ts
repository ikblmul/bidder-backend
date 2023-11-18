import {
  AuthType,
  AuthUsecase,
  AuthenticationInput,
  AuthenticationOutput,
  AuthoriationInput,
  AuthorizationOutput,
} from "../interfaces/dao/auth";
import { ProfileRepository } from "../interfaces/dao/profile";
import { successResult, errorResult, validateResult } from "../helper/result-data-helper";
import { makeHash, verifyHash } from "../helper/hash";
import { ResultType, UUID_ID } from "../interfaces/types";
import zodErrorHandler from "../helper/zodError";
import { UserOutput, UserRepository } from "../interfaces/dao/user";
import { PromiseData, ResultData } from "../interfaces/dao/helper";
import { AuthenticateValidation } from "../validate/auth-validate";
import { z } from "zod";
import * as jwt from "jsonwebtoken";
import config from "../../infrastructure/config/config";

/**
 *
 * TODO: create validate login with changeable validation when auth type is local or google
 * TODO: create more
 *
 */
class AuthUsecaseImpl implements AuthUsecase {
  constructor(public userRepository: UserRepository) {}

  async authenticate(payload: AuthenticationInput): PromiseData<AuthenticationOutput> {
    const validation = AuthenticateValidation.safeParse(payload);
    if (!validation.success) return validateResult(zodErrorHandler(validation.error));

    const userInfo = await this.authByType(validation.data.authType as AuthType, validation.data);

    if (userInfo.status === ResultType.VALIDATION || userInfo.status === ResultType.ERROR)
      return userInfo as ResultData<AuthenticationOutput>;

    // begin abstraction by authentication type why any cause abstracting data lol
    // return this.authByType(authType, validation.data as any);

    return await this.generateToken(userInfo.message as UserOutput);
  }

  async getUserToken(token: string) {
    this.validateToken(token);
  }

  private async generateToken(user: UserOutput): PromiseData<AuthenticationOutput> {
    return successResult(
      await jwt.sign(user, config.secretSign, {
        expiresIn: config.tokenTime,
      })
    );
  }

  private validateToken(token: string) {
    return jwt.verify(token, config.secretSign);
  }

  private async authByType(type: AuthType, payload: any): PromiseData<UserOutput> {
    switch (type) {
      case "local":
        return this.authLocal(payload);
      case "google":
        return this.authGoogle(payload);
      default:
        return errorResult("Invalid auth type hint : maybe you forgot add the logic ?");
    }
  }

  private async authLocal(
    payload: z.infer<typeof AuthenticateValidation.local>
  ): PromiseData<UserOutput> {
    const user = await this.userRepository.getByUsername(payload.username);

    // check if username not Exists
    if (!user) return validateResult("Username Not Found");

    if (!(await verifyHash(user.password, payload.password)))
      return validateResult("password doesn't match");

    return successResult(user as UserOutput);
  }
  private async authGoogle(payload: AuthenticationInput): PromiseData<UserOutput> {}
}

export default UserUsercasesImpl;
