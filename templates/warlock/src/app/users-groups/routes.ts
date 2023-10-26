import { router } from "@mongez/warlock";
import { guardedAdmin } from "app/utils/router";
import { restfulUsersGroups } from "./controllers/restful-users-groups";

guardedAdmin(() => {
  router.restfulResource("/users-groups", restfulUsersGroups);
});
