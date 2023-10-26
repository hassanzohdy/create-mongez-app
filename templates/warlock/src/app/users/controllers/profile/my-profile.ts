import { Request, Response } from "@mongez/warlock";
import { User } from "app/users/models/user";

export default function myProfile(request: Request<User>, response: Response) {
  const currentUser = request.user;

  return response.success({
    user: currentUser,
  });
}
