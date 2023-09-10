import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

const zodErrorHandler = (err: ZodError) => {
  const validationError = fromZodError(err, {
    maxIssuesInMessage: 1,
    prefix: "",
    prefixSeparator: "",
  });

  return validationError.message;
};

export default zodErrorHandler;
