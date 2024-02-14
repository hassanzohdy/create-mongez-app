import { Random } from "@mongez/reinforcements";
import { type Request, type Response, UniqueRule } from "@mongez/warlock";
import { User } from "app/users/models/user";

export default async function createAccount(
  request: Request,
  response: Response,
) {
  User
    .create({
      ...request.validated(),
      activationCode: Random.int(100000, 999999),
    });

  return response.success();
}

createAccount.validation = {
  rules: {
    name: ["required", "minLength:2"],
    email: ["required", "email", new UniqueRule(User)],
    password: ['required', 'minLength:8']
  },
};
