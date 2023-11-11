import { ExistsRule, Request, Response } from "@mongez/warlock";
import { User } from "app/users/models/user";
import { validateUserForgetPasswordCode } from "app/users/validation/validate-user-forget-password-code";

export default async function resetPassword(
  request: Request<User>,
  response: Response,
) {
  const currentUser = request.user;

  currentUser.unset("activationCode", "codeExpiresAt");

  currentUser.save({
    password: request.input("password"),
  });

  request.clearCurrentUser();

  return response.success();
}

resetPassword.validation = {
  rules: {
    email: ["required", "email", new ExistsRule(User, 'email').insensitive()],
    password: ["required", "confirmed", "minLength:8"],
    code: ["required", "int"],
  },
  validate: validateUserForgetPasswordCode,
};
