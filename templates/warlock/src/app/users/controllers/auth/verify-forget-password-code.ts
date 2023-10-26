import { Request, Response } from "@mongez/warlock";
import { validateUserForgetPasswordCode } from "app/users/validation/validate-user-forget-password-code";

export default async function verifyForgetPasswordCode(
  request: Request,
  response: Response,
) {
  // your code here

  return response.success({});
}

verifyForgetPasswordCode.validation = {
  validate: validateUserForgetPasswordCode,
  rules: {
    email: ["required", "string", "email"],
    code: ["required", "length:6"],
  },
};
