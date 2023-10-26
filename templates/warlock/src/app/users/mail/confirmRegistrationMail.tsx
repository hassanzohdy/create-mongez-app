import { sendReactMail, t } from "@mongez/warlock";
import VerificationMail from "../components/VerificationMail";
import { User } from "../models/user";

export default async function confirmRegistrationMail(user: User) {
  const appName = "";
  const logo = "";

  await sendReactMail({
    to: user.get("email"),
    subject: t("auth.confirmRegistrationSubject"),
    render: <VerificationMail appName={appName} logo={logo} user={user} />,
  });
}
