import { trans } from "@mongez/localization";
import { catchError, toastError, toastSuccess } from "@mongez/moonlight";
import router, { navigateBack, navigateTo, refresh, } from "@mongez/react-router";
import parseError from "apps/front-office/utils/parse-error";
import URLS from "apps/front-office/utils/urls";
import { resetPasswordAtom } from "../atoms";
import { forgetPassword, login, register, resetPassword, verifyCode, verifyForgetPassword, } from "../service/auth";
import user from "../user";
const goBack = () => {
    setTimeout(() => {
        if (!Object.values(URLS.auth).includes(router.getPreviousRoute())) {
            navigateBack();
        }
        else {
            navigateTo(URLS.home);
        }
    }, 0);
};
const onSuccessLogin = () => {
    goBack();
    toastSuccess(trans("successfullyLoggedIn"));
};
const onError = catchError;
/**
 * Login hook
 * It return the onSubmit callback
 */
export function useLogin() {
    const loginSubmit = ({ values, form }) => {
        login(values)
            .then(onSuccessLogin)
            .catch(error => {
            toastError(parseError(error));
            form.submitting(false);
        });
    };
    return loginSubmit;
}
/**
 * Create account/Register hook
 * It return the onSubmit callback
 */
export function useCreateAccount() {
    const createAccount = ({ values, form }) => {
        register(values)
            .then(() => {
            toastSuccess(trans("successfullyCreatedAccount"));
            goBack();
        })
            .catch(error => {
            onError(error);
            form.submitting(false);
        });
    };
    return createAccount;
}
/**
 * Verify register code hook
 * Use this hook to verify user account after registration
 */
export function useCreateAccountVerifyCode() {
    const verifyCodeSubmit = ({ values, form }) => {
        verifyCode(values)
            .then(() => {
            onSuccessLogin();
        })
            .catch(error => {
            onError(error);
            form.submitting(false);
        });
    };
    return verifyCodeSubmit;
}
/**
 * Perform logout
 */
export function useLogout(hardReload = true) {
    return () => {
        user.logout();
        toastSuccess(trans("loggedOutSuccessfully"));
        setTimeout(() => {
            if (hardReload) {
                window.location.reload();
            }
            else {
                refresh();
            }
        }, 0);
    };
}
/**
 * Send forget password request hook
 */
export function useForgetPassword() {
    const forgetPasswordSubmit = ({ values, form }) => {
        forgetPassword(values)
            .then(() => {
            resetPasswordAtom.update(Object.assign(Object.assign({}, resetPasswordAtom.value), { 
                // use only the email or phone number
                email: form.value("email"), phoneNumber: form.value("phoneNumber") }));
            setTimeout(() => {
                navigateTo(URLS.auth.verifyForgetPassword);
            }, 10);
        })
            .catch(error => {
            onError(error);
            form.submitting(false);
        });
    };
    return forgetPasswordSubmit;
}
/**
 * Verify forget password code hook
 */
export function useVerifyForgetPasswordOTP() {
    const verifyForgetPasswordOTPSubmit = (e, form) => {
        verifyForgetPassword({
            email: resetPasswordAtom.get("email"),
            phoneNumber: resetPasswordAtom.get("phoneNumber"),
            code: resetPasswordAtom.get("tempOTP"),
        })
            .then(() => {
            resetPasswordAtom.change("code", resetPasswordAtom.get("tempOTP"));
            navigateTo(URLS.auth.resetPassword);
        })
            .catch(error => {
            onError(error);
            form.submitting(false);
        });
    };
    return verifyForgetPasswordOTPSubmit;
}
/**
 * Reset password hook
 */
export function useResetPassword() {
    const resetPasswordSubmit = ({ values, form }) => {
        resetPassword(values)
            .then(() => {
            toastSuccess(trans("resetPasswordSuccess"));
            navigateTo(URLS.auth.login);
            resetPasswordAtom.reset();
        })
            .catch(error => {
            onError(error);
            form.submitting(false);
        });
    };
    return resetPasswordSubmit;
}
