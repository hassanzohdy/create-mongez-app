var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { t } from "@mongez/warlock";
import confirmRegistrationMail from "app/users/mail/confirmRegistrationMail";
import { Login } from "app/users/models/login";
import { User } from "app/users/models/user";
export default function login(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = request.user;
        const auth = yield user.generateAccessToken();
        user.save({
            lastLogin: new Date(),
        });
        Login.create({
            user: user.only(['id', 'email', 'name']),
        }); // log logins
        return response.success({
            user: Object.assign(Object.assign({}, (yield user.toJSON())), { accessToken: auth, userType: user.userType }),
        });
    });
}
login.validation = {
    rules: {
        email: ["required", "email"],
        password: ["required", "string"],
    },
    validate: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User.attempt(request.only(["email", "password"]));
        if (!user) {
            return response.badRequest({
                error: t("auth.invalidCredentials"),
            });
        }
        if (!user.isActive) {
            // you can send the activation code again
            // or just return a bad request with an error message
            confirmRegistrationMail(user);
            return response.forbidden({
                activateAccount: true,
                error: t("auth.accountNotActivated")
            });
        }
        request.user = user;
    }),
};
