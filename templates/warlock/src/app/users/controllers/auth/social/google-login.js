var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { env } from "@mongez/dotenv";
import { GoogleProvider } from "@mongez/warlock";
import { User } from "app/users/models/user";
import login from "../login";
export function googleLogin(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const googleProvider = new GoogleProvider({
            clientId: env("GOOGLE_CLIENT_ID"),
            scope: request.input("scope"),
        });
        const userData = yield googleProvider.login(request.input("token"));
        // first check if user exists with that email
        const userWithEmail = yield User.findBy("email", userData.email);
        if (userWithEmail) {
            let socialLogin = userWithEmail.get("socialLogin") || [];
            if (!Array.isArray(socialLogin)) {
                socialLogin = [];
            }
            const googleSocial = socialLogin.find((social) => social.provider === userData.provider);
            if (!googleSocial) {
                socialLogin.push({
                    provider: userData.provider,
                    id: userData.id,
                });
                yield userWithEmail.save({
                    socialLogin,
                });
            }
            request.user = userWithEmail;
            return login(request, response);
        }
        const user = yield User.create({
            socialLogin: [
                {
                    provider: userData.provider,
                    id: userData.id,
                },
            ],
            name: userData.name,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            image: userData.avatarUrl,
        });
        request.user = user;
        return login(request, response);
    });
}
googleLogin.validation = {
    rules: {
        token: ["required", "string"],
        scope: ["string"],
    },
};
