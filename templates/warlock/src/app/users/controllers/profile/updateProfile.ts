import { Request, Response, UniqueRule } from "@mongez/warlock";
import { User } from "app/users/models/user";
import usersRepository from "app/users/repositories/users-repository";

export default async function updateProfile(
  request: Request<User>,
  response: Response,
) {
  const user = request.user;

  usersRepository.update(user, request.all());

  return response.success();
}

updateProfile.validation = {
  rules: {
    firstName: ["required", "minLength:2"],
    lastName: ["required", "minLength:2"],
    gender: ["in:male,female"],
    phoneNumber: ["required", new UniqueRule(User).exceptCurrentUser()],
    phoneNumberCountryCode: ["string"],
    email: [
      "required",
      "email",
      new UniqueRule(User).insensitive().exceptCurrentUser(),
    ],
  },
};
