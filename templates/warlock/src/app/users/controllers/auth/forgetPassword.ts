import { Random } from "@mongez/reinforcements";
import { Request, Response } from "@mongez/warlock";
import sendForgetPasswordEmail from "app/users/mail/sendForgetPasswordEmail";
import { User } from "app/users/models/user";

export default async function forgetPassword(
  request: Request<User>,
  response: Response,
) {
  const currentUser = request.user;

  currentUser
    .save({
      activatedAt: new Date(),
      activationCode: Random.int(100000, 999999),
    })
    .then(sendForgetPasswordEmail);

  (request.user as any) = undefined;

  return response.success();
}

forgetPassword.validation = {
  rules: {
    email: ["required", "email"],
  },
  validate: async (request: Request, response: Response) => {
    const user = await User.first({
      email: request.input("email"),
    });

    if (!user) {
      return response.notFound();
    }

    request.user = user;
  },
};
