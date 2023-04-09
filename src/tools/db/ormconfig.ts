import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "localhost",
  database: "bidder",
  //   entities: ["dist/**/*.entity.js"],
  logging: true,
  synchronize: false,
  migrationsRun: false,
  // migrations: ["src/tools/db/migration/*.ts"],
  migrationsTableName: "history",
});

AppDataSource.initialize();

export default AppDataSource;
