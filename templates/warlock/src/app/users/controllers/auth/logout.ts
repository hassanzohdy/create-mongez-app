import { Request, Response } from "@mongez/warlock";
import { User } from "app/users/models/user";

export default function logout(request: Request<User>, response: Response) {
  const user = request.user;

  const currentAccessToken = request.authorizationValue();

  user.removeAccessToken(currentAccessToken);

  delete request.user;

  return response.success();
}
