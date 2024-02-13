import { Restful, UniqueRule } from "@mongez/warlock";
import { User } from "../models/user";
import usersRepository from "../repositories/users-repository";
class RestfulUsers extends Restful {
    constructor() {
        super(...arguments);
        /**
         * {@inheritDoc}
         */
        this.repository = usersRepository;
        /**
         * {@inheritDoc}
         */
        this.validation = {
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
    }
    /**
     * {@inheritDoc}
     */
    onSave(request, user) {
        var _a;
        if (((_a = request.user) === null || _a === void 0 ? void 0 : _a.id) === (user === null || user === void 0 ? void 0 : user.id)) {
            request.user = user;
        }
    }
}
export const restfulUsers = new RestfulUsers();
