import { Request, Restful, RouteResource, UniqueRule } from "@mongez/warlock";
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
        firstName: ["required", "min:2"],
        lastName: ["required", "min:2"],
        email: ["required", "email", new UniqueRule(User).except("id")],
        phoneNumber: ["required", "phone", new UniqueRule(User).except("id")],
        gender: ["in:male,female"],
      },
    },
  };

  /**
   * {@inheritDoc}
   */
  public onSave(request: Request<User>, user?: User) {
    if (request.user?.id === user?.id) {
      request.user = user;
    }
  }
}

export const restfulUsers = new RestfulUsers();
