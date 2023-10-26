import { Request, Response } from "@mongez/warlock";
import { Login } from "app/users/models/login";
import { User } from "app/users/models/user";

export default async function adminLogin(request: Request, response: Response) {
  const user = request.user;

  const auth = await user.generateAccessToken();

  user.save({
    lastLogin: new Date(),
  });

  Login.create({
    ...user.except(["id", "_id", "createdAt", "updateAt"]),
  }); // log logins

  return response.success({
    user: {
      ...(await user.toJSON()),
      accessToken: auth,
      userType: user.userType,
    },
  });
}

adminLogin.validation = {
  rules: {
    password: ["required"],
    email: ["required", "email"],
  },
  validate: async (request: Request, response: Response) => {
    const user = await User.attempt(request.only(["email", "password"]));

    if (!user) {
      return response.badRequest({
        error: "Invalid credentials",
      });
    }

    if (!user.get("isActive")) {
      return response.badRequest({
        error:
          "Your account is not active, an email has been sent to you with OTP code to activate your account",
      });
    }

    request.user = user;
  },
};
