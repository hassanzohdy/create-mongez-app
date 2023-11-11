import { groupedTranslations } from "@mongez/localization";

groupedTranslations("auth", {
  confirmRegistrationSubject: {
    en: "Activate your account",
    ar: "تفعيل حسابك",
  },
  invalidCredentials: {
    en: "Invalid credentials",
    ar: "بيانات الدخول غير صحيحة",
  },
  accountNotActivated: {
    en: "Your account is not active, an email has been sent to you with OTP code to activate your account",
    ar: "حسابك غير مفعل، تم إرسال رسالة بريد إلكتروني إليك برمز التفعيل",
  },
});
