import { trans } from "@mongez/localization";
import { toastError, toastSuccess } from "@mongez/moonlight";
import { FormInterface } from "@mongez/react-form";
import parseError from "apps/front-office/utils/parse-error";
import React from "react";
import { subscribeToNewsletter } from "../services/newsletter";

export function useNewsletterSubscription() {
  return (e: React.FormEvent, form: FormInterface) => {
    subscribeToNewsletter(e.target)
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
