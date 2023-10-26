import { Request, Response } from "@mongez/warlock";
import { Login } from "../models/login/login";

export default async function loginSocial(
  request: Request,
  response: Response,
) {
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
