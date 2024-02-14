import { Request, Response, t } from "@mongez/warlock";
import confirmRegistrationMail from "app/users/mail/confirmRegistrationMail";
import { Login } from "app/users/models/login";
import { User } from "app/users/models/user";

export default async function login(
  request: Request<User>,
  response: Response,
) {
  const user: User = request.user;

  const auth = await user.generateAccessToken();

  user.save({
    lastLogin: new Date(),
  });

  Login.create({
    user: user.only(["id", "email", "name"]),
  }); // log logins

  return response.success({
    user: {
      ...(await user.toJSON()),
      accessToken: auth,
      userType: user.userType,
    },
  });
}

login.validation = {
  rules: {
    email: ["required", "email"],
    password: ["required", "string"],
  },
  validate: async (request: Request, response: Response) => {
    const user = await User.attempt(request.only(["email", "password"]));

    if (!user) {
      return response.badRequest({
        error: t("auth.invalidCredentials"),
      });
    }

    if (!user.isActive) {
      // you can send the activation code again
      // or just return a bad request with an error message
      confirmRegistrationMail(user);
      return response.forbidden({
        activateAccount: true,
        error: t("auth.accountNotActivated"),
      });
    }

    request.user = user;
  },
};
