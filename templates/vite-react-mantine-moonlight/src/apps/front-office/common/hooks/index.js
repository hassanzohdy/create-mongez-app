import { trans } from "@mongez/localization";
import { toastError, toastSuccess } from "@mongez/moonlight";
import parseError from "apps/front-office/utils/parse-error";
import { subscribeToNewsletter } from "../services/newsletter";
export function useNewsletterSubscription() {
    return ({ values, form }) => {
        subscribeToNewsletter(values)
            .then(() => {
            toastSuccess(trans("successfullySubscribed"));
            form.reset();
            form.submitting(false);
        })
            .catch(error => {
            toastError(parseError(error));
            form.submitting(false);
        });
    };
}
