import { Restful, RouteResource } from "@mongez/warlock";
import { UsersGroup } from "../models/users-group";
import { usersGroupsRepository } from "./../repositories/users-groups-repository";

class RestfulUsersGroups extends Restful<UsersGroup> implements RouteResource {
  /**
   * {@inheritDoc}
   */
  protected repository = usersGroupsRepository;

  /**
   * {@inheritDoc}
   */
  public validation: RouteResource["validation"] = {
    all: {},
  };
}

export const restfulUsersGroups = new RestfulUsersGroups();
