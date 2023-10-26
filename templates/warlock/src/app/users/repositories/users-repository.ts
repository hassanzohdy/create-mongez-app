import {
  FilterByOptions,
  RepositoryManager,
  RepositoryOptions,
} from "@mongez/warlock";

import { User } from "../models/user";

export class UsersRepository extends RepositoryManager<User> {
  /**
   * {@inheritDoc}
   */
  public model = User;

  /**
   * List default options
   */
  protected defaultOptions: RepositoryOptions = this.withDefaultOptions({});

  /**
   * Filter By options
   */
  protected filterBy: FilterByOptions = this.withDefaultFilters({
    isActive: "bool",
    email: "like",
    id: "int",
    phoneNumber: "like",
    gender: "=",
    name: "like",
  });
}

const usersRepository = new UsersRepository();

export default usersRepository;
