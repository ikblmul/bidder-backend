import argon2 from "argon2";
import config from "../../infrastructure/config/config";

export const makeHash = async (password: string) => {
  try {
    const hash = await argon2.hash(password, {
      salt: Buffer.from(config.salt),
    });

    return { password: hash, error: false };
  } catch (err) {
    //...

    console.log(err);

    return { message: "something error with hashing", error: true };
  }
};

export const verifyHash = async (hashPassword: string, password: string) => {
  return await argon2.verify(hashPassword, password, {
    salt: Buffer.from(config.salt),
  });
};
