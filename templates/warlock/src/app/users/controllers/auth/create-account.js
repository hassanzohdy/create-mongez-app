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
import confirmRegistrationMail from "app/users/mail/confirmRegistrationMail";
import usersRepository from "app/users/repositories/users-repository";
import { profileDataRules } from "app/users/validation/profile-data-rules";
export default function createAccount(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        usersRepository
            .create(Object.assign(Object.assign({}, request.only([
            "firstName",
            "lastName",
            "email",
            "phoneNumber",
            "password",
        ])), { activationCode: Random.int(100000, 999999) }))
            .then(confirmRegistrationMail);
        return response.success();
    });
}
createAccount.validation = {
    rules: profileDataRules(),
};
