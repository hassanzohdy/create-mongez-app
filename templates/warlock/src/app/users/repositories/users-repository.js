import { RepositoryManager, } from "@mongez/warlock";
import { User } from "../models/user";
export class UsersRepository extends RepositoryManager {
    constructor() {
        super(...arguments);
        /**
         * {@inheritDoc}
         */
        this.model = User;
        /**
         * List default options
         */
        this.defaultOptions = this.withDefaultOptions({});
        /**
         * Filter By options
         */
        this.filterBy = this.withDefaultFilters({
            isActive: "bool",
            email: "like",
            id: "int",
            phoneNumber: "like",
            gender: "=",
            name: "like",
        });
    }
}
const usersRepository = new UsersRepository();
export default usersRepository;
