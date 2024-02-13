var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ExistsRule } from "@mongez/warlock";
import { User } from "app/users/models/user";
import { validateUserForgetPasswordCode } from "app/users/validation/validate-user-forget-password-code";
export default function resetPassword(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentUser = request.user;
        currentUser.unset("activationCode", "codeExpiresAt");
        currentUser.save({
            password: request.input("password"),
        });
        request.clearCurrentUser();
        return response.success();
    });
}
resetPassword.validation = {
    rules: {
        email: ["required", "email", new ExistsRule(User, 'email').insensitive()],
        password: ["required", "confirmed", "minLength:8"],
        code: ["required", "int"],
    },
    validate: validateUserForgetPasswordCode,
};
