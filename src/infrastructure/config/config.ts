import { ResultType } from "../../domain/interfaces/types";

const config = {
  app: {
    port: process.env.APP_PORT,
  },
  database: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    name: process.env.DB_NAME || "dummy",
    host: process.env.DB_HOST || "localhost",
    port: (process.env.DB_PORT || 3306) as number,
  },
  debug: {
    enable: true,
    filters_console: [ResultType.SUCCESS], // filter when debug on then console start to debug specific status
  },
  salt: process.env.HASH_SALT || "poiajsoidaloisfhnosenfoinhsoif",
  secretSign: process.env.SECRET_SIGN_KEY || "none",
  tokenTime: process.env.TOKEN_EXPIRY_TIME || "1d",
};

export default config;
