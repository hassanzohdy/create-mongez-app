import { PublicApp } from "@mongez/react-router";

export const frontOfficeApp: PublicApp = {
  path: "/",
  name: "front-office",
  modules: [
    {
      entry: [
        "/account",
        "/login",
        "/register",
        "/forget-password",
        "/rest-password",
      ],
      name: "account",
    },
    {
      entry: ["/", "/404"],
      name: "home",
    },
    {
      entry: ["/about-us", "/privacy-policy", "/terms-conditions"],
      name: "informative-pages",
    },
  ],
};
