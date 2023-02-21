import { trans } from "@mongez/localization";
import { toastError, toastSuccess } from "@mongez/moonlight";
import { FormInterface } from "@mongez/react-form";
import parseError from "apps/front-office/utils/parse-error";
import { sendContactMessage } from "../services/contact-us-service";

export function useContactForm() {
  return (e: React.FormEvent, form: FormInterface) => {
    sendContactMessage(e.target)
      .then(() => {
        form.reset();
        toastSuccess(trans("contactMessageSent"));
      })
      .catch(error => {
        toastError(parseError(error));
      })
      .finally(() => {
        form.submitting(false);
      });
  };
}
