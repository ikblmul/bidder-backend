import { z } from "zod";
import { AuthType } from "../interfaces/dao/auth";

const typeEnum = z.enum(["google", "local"]);
// const typeEnum = z.enum(Object.values(AuthType) as any);

export const googleValidation = z.object({
  authType: z.literal(typeEnum.enum.google),
  token: z.string(),
});

export const localValidation = z.object({
  authType: z.literal(typeEnum.enum.local),
  username: z.string(),
  password: z.string(),
});

export const AuthenticateValidation = z.discriminatedUnion("authType", [
  googleValidation,
  localValidation,
]);
