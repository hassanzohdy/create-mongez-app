import endpoint from "shared/endpoint";
/**
 * Get Guest token
 */
export function getGuestToken() {
    return endpoint.post("/login/guests");
}
/**
 * Perform login
 */
export function login(data) {
    return endpoint.post("/login", data);
}
/**
 * Create new account
 */
export function register(data) {
    return endpoint.post("/register", data);
}
/**
 * Get current user data
 */
export function getMe() {
    return endpoint.get("/me");
}
/**
 * Edit user profile
 */
export function editProfile(data) {
    return endpoint.post("/me", data);
}
/**
 * Change password
 */
export function changePassword(data) {
    return endpoint.post("/change-password", data);
}
/**
 * Forget password request
 */
export function forgetPassword(data) {
    return endpoint.post("/forget-password", data);
}
/**
 * Verify forget password code
 */
export function verifyForgetPassword(data) {
    return endpoint.post("/verify-code", data);
}
/**
 * Reset password
 */
export function resetPassword(data) {
    return endpoint.post("/reset-password", data);
}
/**
 * Register verification code
 */
export function verifyCode(data) {
    return endpoint.post("/register/verify-code", data);
}
/**
 * Login using google
 */
export function loginByGoogle(token) {
    return endpoint.post("/login/google", { token });
}
/**
 * Login using facebook
 */
export function loginByFacebook(token) {
    return endpoint.post("/login/facebook", { token });
}
