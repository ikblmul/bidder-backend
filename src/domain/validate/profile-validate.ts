import { z } from "zod";

export const profileValdation = () => {
  return z.object({
    userId: z.string(),
    fullname: z.string(),
    address: z.string().min(20).optional().default(""),
    phoneNumber: z.string().min(8).optional().default(""),
    verified: z.boolean().default(false),
  });
};

export const IdProfileValidation = () => z.number();
