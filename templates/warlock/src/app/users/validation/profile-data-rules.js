import { UniqueRule } from "@mongez/warlock";
import { User } from "../models/user";
export const profileDataRules = () => ({
    firstName: ["required", "string", "minLength:2"],
    lastName: ["required", "string", "minLength:2"],
    password: ["required", "minLength:8", "confirmed"],
    gender: ["in:male,female"],
    phoneNumber: ["required", new UniqueRule(User).exceptCurrentUser()],
    email: [
        "required",
        "email",
        new UniqueRule(User).insensitive().exceptCurrentUser(),
    ],
});
