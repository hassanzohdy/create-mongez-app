import { Guest } from "@mongez/warlock";
import { User } from "app/users/models/user";

const authConfigurations = {
  userType: {
    guest: Guest,
    user: User,
  },
  jwt: {
    secret: "secretKey",
  },
};

export default authConfigurations;
