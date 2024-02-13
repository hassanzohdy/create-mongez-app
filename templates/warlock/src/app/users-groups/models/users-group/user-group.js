import { Model } from "@mongez/monpulse";
import { User } from "app/users/models/user";
import { UsersGroupOutput } from "../../output/users-group-output";
export class UsersGroup extends Model {
    constructor() {
        super(...arguments);
        /**
         * {@inheritDoc}
         */
        this.syncWith = [User.sync("group").unsetOnDelete()];
        /**
         * Default value for model data
         * Works only when creating new records
         */
        this.defaultValue = {};
        /**
         * Cast data types before saving documents into database
         */
        this.casts = {
            name: "string",
            permissions: "array",
            isActive: "boolean",
        };
        /**
         * {@inheritDoc}
         */
        this.embedded = ["id", "name", "permissions"];
    }
}
/**
 * Collection name
 */
UsersGroup.collection = "usersGroup";
/**
 * Output class
 */
UsersGroup.output = UsersGroupOutput;
