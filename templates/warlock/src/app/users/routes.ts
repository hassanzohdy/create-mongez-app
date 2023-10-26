import { guestLogin, router } from "@mongez/warlock";
import {
  adminPath,
  guarded,
  guardedAdmin,
  guardedGuest,
  guardedGuestAdmin,
} from "app/utils/router";
import activateAccount from "./controllers/auth/activateAccount";
import adminLogin from "./controllers/auth/admin-login";
import createAccount from "./controllers/auth/createAccount";
import forgetPassword from "./controllers/auth/forgetPassword";
import login from "./controllers/auth/login";
import logout from "./controllers/auth/logout";
import resendActivationCode from "./controllers/auth/resendActivationCode";
import resetPassword from "./controllers/auth/resetPassword";
import facebookLogin from "./controllers/auth/social/facebook-login";
import { googleLogin } from "./controllers/auth/social/google-login";
import verifyForgetPasswordCode from "./controllers/auth/verify-forget-password-code";
import changePassword from "./controllers/profile/changePassword";
import myProfile from "./controllers/profile/my-profile";
import updateProfile from "./controllers/profile/updateProfile";
import { restfulUsers } from "./controllers/restful-users";

// guest login
router.post([adminPath("/login/guests"), "/login/guests"], guestLogin);

// admin auth
guardedGuestAdmin(() => {
  router.post("/login", adminLogin);
  router.post("/forget-password", forgetPassword);
  router.post("/reset-password", resetPassword);
});

guardedAdmin(() => {
  // users
  router.restfulResource("/users", restfulUsers);
});

// customers auth
guardedGuest(() => {
  router.post("/login", login);
  router.post("/login/google", googleLogin);
  router.post("/login/facebook", facebookLogin);
  router.post("/register", createAccount);
  router.post("/register/verify", activateAccount);
  router.post("/resend-activation-code", resendActivationCode);
  router.post("/forget-password", forgetPassword);
  router.post("/forget-password/verify-code", verifyForgetPasswordCode);
  router.post("/reset-password", resetPassword);
});

// profile routes
guarded(() => {
  router.get("/me", myProfile);
  router.post("/me", updateProfile);
  router.post("/logout", logout);
  router.post("/change-password", changePassword);
});
