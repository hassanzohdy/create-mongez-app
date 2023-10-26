import { Random } from "@mongez/reinforcements";
import { Request, Response } from "@mongez/warlock";
import confirmRegistrationMail from "app/users/mail/confirmRegistrationMail";
import usersRepository from "app/users/repositories/users-repository";
import { profileDataRules } from "app/users/validation/profile-data-rules";

export default async function createAccount(
  request: Request,
  response: Response,
) {
  usersRepository
    .create({
      ...request.only([
        "firstName",
        "lastName",
        "email",
        "phoneNumber",
        "password",
      ]),
      activationCode: Random.int(100000, 999999),
    })
    .then(confirmRegistrationMail);

  return response.success();
}

createAccount.validation = {
  rules: profileDataRules(),
};
