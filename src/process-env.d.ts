declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      APP_PORT: number;
      //   DATABASE_URL: string;
      // add more environment variables and their types here
    }
  }
}
