import { env } from "@mongez/dotenv";
import { AuthConfigurations, Guest } from "@mongez/warlock";
import { User } from "app/users/models/user";

const authConfigurations: AuthConfigurations = {
  userType: {
    guest: Guest,
    user: User,
  },
  jwt: {
    secret: env("JWT_SECRET"),
  },
};

export default authConfigurations;
