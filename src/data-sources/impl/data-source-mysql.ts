import { DataSource } from "typeorm";
import { SqlConnectionContract } from "../interfaces/sql-connection-contract";

const CreateSqlConnection = ({
  db,
  host,
  password,
  port,
  username,
}: SqlConnectionContract): DataSource => {
  console.log(__dirname + "/../orm/typeorm/**/*.entity.{js,ts}");
  const AppDataSource = new DataSource({
    type: "mysql",
    host,
    port,
    username,
    password,
    database: db,
    synchronize: false,
    logging: true,
    entities: [__dirname + "/../orm/typeorm/*.{js,ts}"],
  });

  AppDataSource.initialize()
    .then(() => {
      console.log("database connected...");
    })
    .catch((err) => {
      console.error("Failed To Initialzed Database", err);
    });

  return AppDataSource;
};

export default CreateSqlConnection;
