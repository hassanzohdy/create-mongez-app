import { Output, UploadOutput } from "@mongez/warlock";
import { UsersGroupOutput } from "app/users-groups/output/users-group-output";
import { withBaseOutputDetails } from "app/utils/output";
export default class UserOutput extends Output {
    constructor() {
        super(...arguments);
        /**
         * Output data
         */
        this.output = withBaseOutputDetails({
            birthDate: "birthDate",
            name: "string",
            firstName: "string",
            lastName: "string",
            phoneNumber: "string",
            email: "string",
            image: UploadOutput,
            group: UsersGroupOutput,
        });
        /**
         * Defaults when key is missing from resource
         */
        this.defaults = {};
        /**
         * User type
         */
        this.userType = "user";
    }
}
/**
 * Disabled keys from being returned in the final output
 */
UserOutput.disabledKeys = [];
/**
 * The only allowed keys
 */
UserOutput.allowedKeys = [];
