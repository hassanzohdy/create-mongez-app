var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Login } from "app/users/models/login";
import { User } from "app/users/models/user";
export default function adminLogin(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = request.user;
        const auth = yield user.generateAccessToken();
        user.save({
            lastLogin: new Date(),
        });
        Login.create(Object.assign({}, user.except(["id", "_id", "createdAt", "updateAt"]))); // log logins
        return response.success({
            user: Object.assign(Object.assign({}, (yield user.toJSON())), { accessToken: auth, userType: user.userType }),
        });
    });
}
adminLogin.validation = {
    rules: {
        password: ["required"],
        email: ["required", "email"],
    },
    validate: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User.attempt(request.only(["email", "password"]));
        if (!user) {
            return response.badRequest({
                error: "Invalid credentials",
            });
        }
        if (!user.get("isActive")) {
            return response.badRequest({
                error: "Your account is not active, an email has been sent to you with OTP code to activate your account",
            });
        }
        request.user = user;
    }),
};
