import { DataSource, FindManyOptions, FindOptionsSelect, Repository } from "typeorm";
import {
  USER_ID,
  UserInput,
  UserOutput,
  UserParam,
  UserParamAll,
  UserRepository,
} from "../interfaces/dao/user";
import { User } from "../../data-sources/orm/typeorm/user";
import { ID, NotFound, SomethingWrong } from "../interfaces/types";
import {
  PROFILE_ID,
  ProfileInput,
  ProfileOutput,
  ProfileParamAll,
  ProfileRepository,
} from "../interfaces/dao/profile";
import { Profile } from "../../data-sources/orm/typeorm/profile";

class ProfileRepositoryImpl implements ProfileRepository {
  private ormRepo: Repository<Profile>;

  constructor(public dataSource: DataSource) {
    this.ormRepo = dataSource.getRepository(Profile);
  }

  async getAll(payload: ProfileParamAll = {}): Promise<ProfileOutput[]> {
    let param: FindManyOptions<Profile> = {};

    payload.skip && (param.skip = payload.skip);

    payload.limit && (param.take = payload.limit);

    payload.fullname && (param.where = { fullname: payload.fullname });

    payload.keyOnly && (param.select = payload.keyOnly as FindOptionsSelect<Profile>);

    return (await this.ormRepo.find(param)) as ProfileOutput[];
  }

  async getById(id: string): Promise<ProfileOutput | null> {
    return (await this.ormRepo.findOne({
      where: {
        id,
      },
    })) as ProfileOutput;
  }

  async updateById(id: string, profile: Partial<ProfileInput>): Promise<boolean> {
    const update = await this.ormRepo.update({ id }, profile);
    return update?.affected === 1;
  }

  async store(payload: ProfileInput): Promise<ProfileOutput | SomethingWrong> {
    const entities = this.ormRepo.create(payload);

    const res = await this.ormRepo.save(entities);

    return res as unknown as ProfileOutput;
  }

  async assignToEmptyProfile(userId: USER_ID): Promise<ProfileOutput | SomethingWrong> {
    const entities = this.ormRepo.create({
      userId,
    });

    console.log(entities, userId);

    const res = await this.ormRepo.insert(entities);

    console.log(res);

    return res as unknown as ProfileOutput;
  }

  async deleteById(id: PROFILE_ID): Promise<boolean> {
    const res = await this.ormRepo.delete({ id });
    return res?.affected === 1;
  }
}

export default ProfileRepositoryImpl;
