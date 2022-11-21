import { navigateTo } from "@mongez/react-router";
import user from "apps/front-office/account/user";
import URLS from "apps/front-office/utils/urls";

export function Guardian() {
  if (!user.isLoggedIn() || user.isGuest()) {
    navigateTo(URLS.login);
    return true;
  }

  return null;
}

export function ReverseGuardian() {
  if (user.isLoggedIn() && !user.isGuest()) {
    navigateTo(URLS.home);
    return true;
  }

  return null;
}
