import {Guest, AuthConfigurations } from "@mongez/warlock";
import { User } from "app/users/models/user";

const authConfigurations: AuthConfigurations = {
  userType: {
    guest: Guest,
    user: User,
  },
  jwt: {
    secret: "secret",
  },
};

export default authConfigurations;
