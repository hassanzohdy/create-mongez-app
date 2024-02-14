import { UniqueRule, type Request, type Response } from "@mongez/warlock";
import { User } from "app/users/models/user";
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
    email: ["required", "email", new UniqueRule(User)],
    code: ["required", "int", "length:6"],
  },
};
