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

class UserRepositoryImpl implements UserRepository {
  private ormRepo: Repository<User>;

  constructor(public dataSource: DataSource) {
    this.ormRepo = dataSource.getRepository(User);
  }

  async getAll(payload: UserParamAll = {}): Promise<UserOutput[]> {
    let param: FindManyOptions<User> = {};

    payload.skip && (param.skip = payload.skip);

    payload.limit && (param.take = payload.limit);

    payload.username && (param.where = { username: payload.username });

    payload.keyOnly && (param.select = payload.keyOnly as FindOptionsSelect<User>);

    // await this.ormRepo.findAndCount(param);

    return (await this.ormRepo.find(param)) as UserOutput[];
  }

  async count(payload: Pick<UserParamAll, "username">): Promise<number> {
    let param: FindManyOptions<User> = {};
    payload.username && (param.where = { username: payload.username });

    return await this.ormRepo.count(param);
  }

  async hasUniqueToOther(keys: Omit<UserInput, "password">): Promise<boolean> {
    // @ts-ignore
    let where = Object.keys(keys).map((k) => ({ [k]: keys[k] }));

    return this.ormRepo.exist({
      where,
    });
  }
  // // async getAll(): Promise<UserOutput[]> {
  //   return (await this.ormRepo.find({})) as UserOutput[];
  // // }

  async getById(id: USER_ID): Promise<NotFound | UserOutput> {
    return (await this.ormRepo.findOne({
      where: {
        id,
      },
    })) as UserOutput;
  }

  async getByUsername(username: string): Promise<NotFound | UserOutput> {
    return (await this.ormRepo.findOne({
      where: {
        username,
      },
    })) as UserOutput;
  }

  async updateById(id: USER_ID, { username, password, email }: UserInput): Promise<boolean> {
    const update = await this.ormRepo.update(
      { id },
      {
        username,
        password,
        email,
      }
    );
    return update?.affected === 1;
  }

  async store({ username, password, email }: UserInput): Promise<UserOutput | SomethingWrong> {
    const entities = this.ormRepo.create({
      username,
      password,
      email,
    });
    await this.ormRepo.insert(entities);
    // console.log(insert, entities);
    return entities as unknown as UserOutput;
  }

  async deleteById(id: USER_ID): Promise<boolean> {
    const res = await this.ormRepo.delete({ id });
    return res?.affected === 1;
  }

  hasUniqueUsername(username: string, id: USER_ID): Promise<boolean> {
    return this.ormRepo.exist({
      where: {
        username,
        id,
      },
    });
  }
}

export default UserRepositoryImpl;
