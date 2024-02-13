import { castEmail, expiresAfter, } from "@mongez/monpulse";
import { Auth, uploadable } from "@mongez/warlock";
import castPassword from "app/users/utils/cast-password";
import UserOutput from "../../output/user-output";
export class User extends Auth {
    constructor() {
        super(...arguments);
        /**
         * {@inheritdoc}
         */
        this.syncWith = [];
        /**
         * {@inheritDoc}
         */
        this.defaultValue = {
            isActive: false,
        };
        /**
         * {@inheritDoc}
         */
        this.casts = {
            name: "string",
            firstName: "string",
            lastName: "string",
            gender: "string",
            isActive: "boolean",
            isAdmin: "boolean",
            birthDate: "date",
            lastSeenAt: "date",
            phoneNumber: "string",
            image: uploadable,
            email: castEmail,
            password: castPassword,
            activationCode: "int",
            codeExpiresAt: expiresAfter(30, "minutes"),
        };
        /**
         * Custom casts
         */
        this.customCasts = {
            name: user => {
                const firstName = user.get("firstName");
                const lastName = user.get("lastName");
                if (firstName && lastName) {
                    return `${firstName} ${lastName}`;
                }
                return user.get("name");
            },
        };
        /**
         * {@inheritdoc}
         */
        this.embedded = ["id", "name", "email", "phoneNumber"];
    }
    /**
     * Get user type
     */
    get userType() {
        return "user";
    }
}
/**
 * Collection name
 */
User.collection = "users";
/**
 * Output
 */
User.output = UserOutput;
