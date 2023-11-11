import { Random } from "@mongez/reinforcements";
import { ExistsRule, Request, Response } from "@mongez/warlock";
import confirmRegistrationMail from "app/users/mail/confirmRegistrationMail";
import { User } from "app/users/models/user";

export default async function resendActivationCode(
  request: Request,
  response: Response,
) {
  //
  const user = await User.first({
    email: request.input("email"),
  });

  if (!user) {
    return response.badRequest({
      error: "User not found",
    });
  }

  if (user.get("isActive")) {
    return response.badRequest({
      error: "User already activated",
    });
  }

  user
    .save({
      activationCode: Random.int(100000, 999999),
      codeExpiresAt: true,
    })
    .then(confirmRegistrationMail);

  return response.success({
    message: "Activation code sent",
  });
}

resendActivationCode.validation = {
  rules: {
    email: ["required", "email", new ExistsRule(User, 'email').insensitive()],
  },
};
