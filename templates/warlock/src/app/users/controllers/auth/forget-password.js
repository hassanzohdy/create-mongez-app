var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Random } from "@mongez/reinforcements";
import sendForgetPasswordEmail from "app/users/mail/sendForgetPasswordEmail";
import { User } from "app/users/models/user";
export default function forgetPassword(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentUser = request.user;
        currentUser
            .save({
            activatedAt: new Date(),
            activationCode: Random.int(100000, 999999),
        })
            .then(sendForgetPasswordEmail);
        request.user = undefined;
        return response.success();
    });
}
forgetPassword.validation = {
    rules: {
        email: ["required", "email"],
    },
    validate: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User.first({
            email: request.input("email"),
            // if the app requires an active account, uncomment the following line
            // isActive: true,
        });
        if (!user) {
            return response.notFound();
        }
        request.user = user;
    }),
};
