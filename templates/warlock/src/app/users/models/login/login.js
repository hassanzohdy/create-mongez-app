import { Model } from "@mongez/monpulse";
export class Login extends Model {
    constructor() {
        super(...arguments);
        /**
         * {@inheritDoc}
         */
        this.casts = {};
    }
}
/**
 * Collection name
 */
Login.collection = "logins";
