import { Restful, RouteResource, UniqueRule } from "@mongez/warlock";
import { User } from "../models/user";
import usersRepository from "../repositories/users-repository";

class RestfulUsers extends Restful<User> implements RouteResource {
  /**
   * {@inheritDoc}
   */
  protected repository = usersRepository;

  /**
   * {@inheritDoc}
   */
  public validation: RouteResource["validation"] = {
    create: {
      rules: {
        name: ["required", "min:2"],
        email: ["required", "email", new UniqueRule(User).exceptCurrentUser()],
        phoneNumber: [
          "required",
          "phone",
          new UniqueRule(User).exceptCurrentUser(),
        ],
      },
    },
  };
}

export const restfulUsers = new RestfulUsers();
