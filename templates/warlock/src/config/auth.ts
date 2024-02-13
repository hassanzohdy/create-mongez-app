import {Guest, AuthConfigurations } from "@mongez/warlock";
import { User } from "app/users/models/user";
import { env } from "@mongez/dotenv";

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
