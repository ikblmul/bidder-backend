import ProfileRepositoryImpl from "../../../src/domain/repositories/profile-repository-impl";
import ProfileUsecaseImpl from "../../../src/domain/usecases/profle-usecases-impl";
import { DataSource } from "typeorm";
import { InitDB } from "./init-global";
import { ProfileRepository, ProfileUsecase } from "../../../src/domain/interfaces/dao/profile";

describe("test", () => {
  let UserUsercasesImpl: ProfileUsecase;
  beforeEach(() => {
    let connection: DataSource = InitDB();
    let repo: ProfileRepository = new ProfileRepositoryImpl(connection);
    UserUsercasesImpl = new ProfileUsecaseImpl(repo);
  });

  test("Create Profile ", () => {
    return UserUsercasesImpl.create({
      address : "address",
      fullname : "fullname",
      phoneNumber : "phoneNumber",
      userId : "userId",
      verified : false,
    })
    ).toBe();
  });
});
