import { AuthUsecase } from "../../../src/domain/interfaces/dao/auth";
import { DataSource } from "typeorm";
import { InitDB } from "./init-global";
import { UserOutput, UserRepository, UserUsecase } from "../../../src/domain/interfaces/dao/user";

import UserRepositoryImpl from "../../../src/domain/repositories/user-repository-impl";
import AuthUsecaseImpl from "../../../src/domain/usecases/auth-usecases-impl";
import ProfileRepositoryImpl from "../../../src/domain/repositories/profile-repository-impl";
import UserUsecaseImpl from "../../../src/domain/usecases/user-usecases-impl";

let connection: DataSource;
let userRepository: UserRepository;
let authUsecase: AuthUsecase;
let userUsecase: UserUsecase;
let userCreated: UserOutput;

describe("Testing Authenticate", () => {
  beforeAll(async () => {
    console.log("init all instances...");
    connection = await InitDB();
    userRepository = new UserRepositoryImpl(connection);
    authUsecase = new AuthUsecaseImpl(userRepository);
    userUsecase = new UserUsecaseImpl(userRepository, new ProfileRepositoryImpl(connection));

    // createing username password for test
    userCreated = (
      await userUsecase.create({
        email: "test.jest@mail.com",
        password: "awokawok",
        username: "test.jest",
      })
    ).message as UserOutput;

    // done();
  });

  afterAll(async () => {
    userUsecase.deleteById(userCreated.id);
  });

  test("Test Traditional Authentication", () => {});

  test("invalidate username and password", () => {});

  test("checking token not valid", () => {});
});
