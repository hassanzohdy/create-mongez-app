import { RepositoryManager, } from "@mongez/warlock";
import usersRepository from "app/users/repositories/users-repository";
import { UsersGroup } from "../models/users-group";
export class UsersGroupsRepository extends RepositoryManager {
    constructor() {
        super(...arguments);
        /**
         * {@inheritDoc}
         */
        this.model = UsersGroup;
        /**
         * List default options
         */
        this.defaultOptions = this.withDefaultOptions({});
        /**
         * Filter By options
         */
        this.filterBy = {};
        /**
         * {@inheritdoc}
         */
        this.clearCacheOnUpdate = [usersRepository];
    }
}
export const usersGroupsRepository = new UsersGroupsRepository();
