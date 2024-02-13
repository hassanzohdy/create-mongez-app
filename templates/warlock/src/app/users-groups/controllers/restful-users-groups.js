import { Restful } from "@mongez/warlock";
import { usersGroupsRepository } from "./../repositories/users-groups-repository";
class RestfulUsersGroups extends Restful {
    constructor() {
        super(...arguments);
        /**
         * {@inheritDoc}
         */
        this.repository = usersGroupsRepository;
        /**
         * {@inheritDoc}
         */
        this.validation = {
            all: {},
        };
    }
}
export const restfulUsersGroups = new RestfulUsersGroups();
