var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Login } from "../models/login/login";
export default function loginSocial(request, response) {
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
