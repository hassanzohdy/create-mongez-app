import {
  FilterByOptions,
  RepositoryManager,
  RepositoryOptions,
} from "@mongez/warlock";
import usersRepository from "app/users/repositories/users-repository";
import { UsersGroup } from "../models/users-group";

export class UsersGroupsRepository extends RepositoryManager<UsersGroup> {
  /**
   * {@inheritDoc}
   */
  public model = UsersGroup;

  /**
   * List default options
   */
  protected defaultOptions: RepositoryOptions = this.withDefaultOptions({});

  /**
   * Filter By options
   */
  protected filterBy: FilterByOptions = {};

  /**
   * {@inheritdoc}
   */
  protected clearCacheOnUpdate = [usersRepository];
}

export const usersGroupsRepository = new UsersGroupsRepository();
