import { DataSource, FindManyOptions, Repository } from "typeorm";
import {
  UserInput,
  UserOutput,
  UserParam,
  UserParamAll,
  UserRepository,
} from "../interfaces/dao/user";
import { User } from "../orm/typeorm/user";
import { ID, NotFound } from "../interfaces/types";

class UserRepositoryImpl implements UserRepository {
  private ormRepo: Repository<User>;

  constructor(public dataSource: DataSource) {
    this.ormRepo = dataSource.getRepository(User);
  }

  async getAll(payload: UserParamAll): Promise<UserOutput[]> {
    let param: FindManyOptions<User> = {};

    payload.skip && (param.skip = payload.skip);

    payload.limit && (param.skip = payload.limit);

    payload.username && (param.where = { fullname: payload.username });

    return (await this.ormRepo.find(param)) as UserOutput[];
  }

  // async getAll(payload: UserParam): Promise<UserOutput[]> {

  //   return (await this.ormRepo.find({
  //     skip : payload.skip,
  //     take : payload.limit,
  //   })) as UserOutput[];
  // }

  // // async getAll(): Promise<UserOutput[]> {
  //   return (await this.ormRepo.find({})) as UserOutput[];
  // // }

  async getById(id: ID): Promise<NotFound | UserOutput> {
    return await this.ormRepo.findOne({
      where: {
        id,
      },
    });
  }

  async getByUsername(username: string): Promise<NotFound | UserOutput> {
    return await this.ormRepo.findOne({
      where: {
        username,
      },
    });
  }

  async updateById(
    id: number,
    { username, password, fullname }: UserInput
  ): Promise<NotFound | UserOutput> {
    const update = await this.ormRepo.update(id, {
      username,
      password,
      fullname,
    });
    return update.raw?.[0];
  }

  async store({
    username,
    password,
    fullname,
  }: UserInput): Promise<boolean | UserOutput> {
    return await this.ormRepo.create({
      fullname,
      username,
      password,
    });
  }
}

export default UserRepositoryImpl;
