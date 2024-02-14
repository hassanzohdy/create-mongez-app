import { Random } from "@mongez/reinforcements";
import { type Request, type Response, UniqueRule } from "@mongez/warlock";
import sendForgetPasswordEmail from "app/users/mail/send-forget-password-email";
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

  request.user = undefined;

  return response.success();
}

forgetPassword.validation = {
  rules: {
    email: ["required", "email", new UniqueRule(User)],
  },
  validate: async (request: Request, response: Response) => {
    const user = await User.first({
      email: request.input("email"),
      // if the app requires an active account, uncomment the following line
      // isActive: true,
    });

    if (!user) {
      return response.notFound();
    }

    request.user = user;
  },
};
