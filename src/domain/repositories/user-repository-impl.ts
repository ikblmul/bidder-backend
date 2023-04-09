import { DataSource, Repository } from "typeorm";
import { UserInput, UserOutput, UserRepository } from "../interfaces/dao/user";
import { User } from "../orm/typeorm/user";
import { ID } from "../interfaces/types";

class UserRepositoryImpl implements UserRepository {
  private ormRepo: Repository<User>;

  constructor(public dataSource: DataSource) {
    this.ormRepo = dataSource.getRepository(User);
  }

  async getAll(): Promise<UserOutput[]> {
    return (await this.ormRepo.find({})) as UserOutput[];
  }

  async getById(id: ID): Promise<boolean | UserOutput> {
    return await this.ormRepo.findOne({
      where: {
        id,
      },
    });
  }

  async getByUsername(username: string): Promise<boolean | UserOutput> {
    return await this.ormRepo.findOne({
      where: {
        username,
      },
    });
  }

  async updateById(
    id: number,
    { username, password, fullname }: UserInput
  ): Promise<boolean | UserOutput> {
    const update = this.ormRepo.update(id, {
      username,
      password,
      fullname,
    });

    let res;

    update
      .then((d) => {
        res = Promise.resolve({});
      })
      .catch(() => {
        res = Promise.resolve(false);
      });

    return res;
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
