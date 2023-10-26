import { Request, Response } from "@mongez/warlock";
import { User } from "../models/user";

export async function validateUserForgetPasswordCode(
  request: Request,
  response: Response,
) {
  try {
    const user = await User.first({
      email: request.input("email"),
      activationCode: request.int("code"),
    });

    if (!user) {
      return response.notFound();
    }

    request.user = user;
  } catch (error: any) {
    return response.badRequest(error.message);
  }
}
