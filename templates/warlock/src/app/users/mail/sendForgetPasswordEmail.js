var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { sendMail } from "@mongez/warlock";
export default function sendForgetPasswordEmail(user) {
    return __awaiter(this, void 0, void 0, function* () {
        yield sendMail({
            to: user.get("email"),
            subject: "Reset Password",
            html: `
    <h3>Hello, ${user.get("name")}</h3>

    <p>Use the following code to reset your password:</p>

    <p>Please note that this code will expire in 10 minutes.</p>

    <p>Your reset password code is: <strong>${user.get("activationCode")}</strong></p>
    `,
        });
    });
}
