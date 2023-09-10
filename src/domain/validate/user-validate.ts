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

    email: z.string().min(6).email(),
    password: z
      .string()
      .min(6)
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message: "Password at least contain one uppercase, number, and one special character",
      }),
  });
};

export const IdUserValidation = () => z.string();
