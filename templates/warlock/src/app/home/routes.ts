import { router } from "@mongez/warlock";
import adminHome from "app/home/controllers/admin-home";
import userHome from "app/home/controllers/user-home";
import { guardedAdmin, publicRoutes } from "app/utils/router";

guardedAdmin(() => {
  router.get("/home", adminHome);
});

publicRoutes(() => {
  router.get("/home", userHome);
});
