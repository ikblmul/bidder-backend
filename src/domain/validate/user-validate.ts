import { z } from "zod";

export const userAuthenticateValidation = () => {
  return z.object({
    username: z.string(),
    password: z.string(),
    rememberMe: z.optional(z.string()),
  });
};

export const userValdation = () => {
  return z.object({
    username: z.string().min(6),
    password: z
      .string()
      .min(6)
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])$/, {
        message:
          "Password at least contain one uppercase, number, and one special character",
      }),
    fullname: z.string(),
  });
};
