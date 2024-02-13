var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UniqueRule } from "@mongez/warlock";
import { User } from "app/users/models/user";
import usersRepository from "app/users/repositories/users-repository";
export default function updateProfile(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = request.user;
        usersRepository.update(user, request.all());
        return response.success();
    });
}
updateProfile.validation = {
    rules: {
        firstName: ["required", "minLength:2"],
        lastName: ["required", "minLength:2"],
        gender: ["in:male,female"],
        phoneNumber: ["required", new UniqueRule(User).exceptCurrentUser()],
        phoneNumberCountryCode: ["string"],
        email: [
            "required",
            "email",
            new UniqueRule(User).insensitive().exceptCurrentUser(),
        ],
    },
};
