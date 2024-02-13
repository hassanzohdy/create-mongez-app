var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { validateUserForgetPasswordCode } from "app/users/validation/validate-user-forget-password-code";
export default function verifyForgetPasswordCode(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        // your code here
        return response.success({});
    });
}
verifyForgetPasswordCode.validation = {
    validate: validateUserForgetPasswordCode,
    rules: {
        email: ["required", "string", "email"],
        code: ["required", "length:6"],
    },
};
