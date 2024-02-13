import cache from "@mongez/cache";
import { setCurrentUser, User as BaseUser, } from "@mongez/user";
class User extends BaseUser {
    constructor() {
        super(...arguments);
        /**
         * Cache driver
         */
        this.cacheDriver = cache;
    }
    /**
     * {@inheritDoc}
     */
    getCacheKey() {
        return "usr";
    }
    /**
     * Determine if current user is guest
     */
    isGuest() {
        return this.get("type") === "guest";
    }
}
const user = new User();
// boot the class
user.boot();
// update current user instance to be used from other packages
setCurrentUser(user);
export default user;
