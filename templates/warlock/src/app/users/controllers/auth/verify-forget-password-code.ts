import {type  Request, type Response, UniqueRule } from "@mongez/warlock";
import { validateUserForgetPasswordCode } from "app/users/validation/validate-user-forget-password-code";
import { User } from "app/users/models/user";

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
    code: ["required", 'int', "length:6"],
  },
};
