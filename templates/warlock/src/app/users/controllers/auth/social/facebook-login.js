var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User } from "app/users/models/user";
import login from "../login";
export default function facebookLogin(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const userData = request.all();
        const user = yield User.findBy("email", userData.email);
        if (user) {
            let socialLogin = user.get("socialLogin") || [];
            if (!Array.isArray(socialLogin)) {
                socialLogin = [];
            }
            const facebookSocial = socialLogin.find((social) => social.provider === "facebook");
            if (!facebookSocial) {
                socialLogin.push({
                    provider: "facebook",
                    id: userData.userID,
                });
                yield user.save({
                    socialLogin,
                });
            }
            request.user = user;
            return login(request, response);
        }
        const newUser = yield User.create({
            socialLogin: [
                {
                    provider: userData.provider,
                    id: userData.id,
                },
            ],
            firstName: userData.name.split(" ")[0],
            lastName: userData.name.split(" ")[1],
            email: userData.email,
            image: userData.picture.data.url,
        });
        request.user = newUser;
        return login(request, response);
    });
}
