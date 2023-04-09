const config = {
  database: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    name: process.env.DB_NAME,
    host: process.env.DB_HOST || "localhost",
    port: (process.env.DB_PORT || 3306) as number,
  },
};

export default config;
