import { Guest } from "@mongez/warlock";
import { User } from "app/users/models/user";
import { env } from "@mongez/dotenv";

const authConfigurations = {
  userType: {
    guest: Guest,
    user: User,
  },
  jwt: {
    secret: env("JWT_SECRET"),
  },
};

export default authConfigurations;
