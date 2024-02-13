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
import { ExistsRule } from "@mongez/warlock";
import confirmRegistrationMail from "app/users/mail/confirmRegistrationMail";
import { User } from "app/users/models/user";
export default function resendActivationCode(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        //
        const user = yield User.first({
            email: request.input("email"),
        });
        if (!user) {
            return response.badRequest({
                error: "User not found",
            });
        }
        if (user.get("isActive")) {
            return response.badRequest({
                error: "User already activated",
            });
        }
        user
            .save({
            activationCode: Random.int(100000, 999999),
            codeExpiresAt: true,
        })
            .then(confirmRegistrationMail);
        return response.success({
            message: "Activation code sent",
        });
    });
}
resendActivationCode.validation = {
    rules: {
        email: ["required", "email", new ExistsRule(User, 'email').insensitive()],
    },
};
