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
export default function activateAccount(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentUser = request.user;
        currentUser.unset("codeExpiresAt", "activationCode");
        currentUser.save({
            isActive: true,
            activatedAt: new Date(),
        });
        const accessToken = yield currentUser.generateAccessToken();
        return response.success({
            user: Object.assign(Object.assign({}, (yield currentUser.toJSON())), { accessToken: accessToken, userType: currentUser.userType }),
        });
    });
}
activateAccount.validation = {
    rules: {
        code: ["required"],
        email: ["required", "email"],
    },
    validate: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User.aggregate()
            .where("email", String(request.input("email")).toLowerCase())
            .where("isActive", false)
            .where("activationCode", request.input("code"))
            .first();
        if (!user) {
            return response.notFound({
                error: "Invalid activation code",
            });
        }
        // if (dayjs(user.get("codeExpiresAt")).isBefore(new Date())) {
        //   return response.badRequest({
        //     error: "Activation code has expired",
        //   });
        // }
        request.user = user;
    }),
};
