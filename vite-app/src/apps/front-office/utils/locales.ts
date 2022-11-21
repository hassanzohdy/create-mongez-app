import { extend, groupedTranslations, trans } from "@mongez/localization";
import { arTranslation, enTranslation } from "@mongez/validator";
import mainTranslation from "shared/localization/index.json";

groupedTranslations(mainTranslation);

extend("en", enTranslation);
extend("ar", arTranslation);

export function the(key: string) {
  return trans("the", { key: trans(key) });
}

// Add only common localization
groupedTranslations({
  the: {
    en: ":key",
    ar: "ال:key",
  },
  updateItem: {
    en: "Update :item",
    ar: "تحديث بيانات :item",
  },
  metaTitleHint: {
    en: "If not set, it will be taken from the name field",
    ar: "إذا لم يتم تعيينه، سيتم الحصول عليه من حقل الاسم",
  },
  metaDescriptionHint: {
    en: "If not set, it will be taken from the short description field",
    ar: "إذا لم يتم تعيينه، سيتم الحصول عليه من حقل الوصف المختصر",
  },
  metaKeywordsHint: {
    en: "If not set, it will be taken from the name field, separate each keyword with a comma",
    ar: "إذا لم يتم تعيينه، سيتم الحصول عليه من حقل الاسم، افصل كل كلمة مفتاحية بفاصلة",
  },
  keywords: {
    en: "Keywords",
    ar: "الكلمات الدليلية",
  },
  property: {
    en: "Property",
    ar: "وحدة",
  },
  createItem: {
    en: "Create new :item",
    ar: "إنشاء :item جديد",
  },
  noData: {
    en: "No data found",
    ar: "لا يوجد بيانات",
  },
  deleteBulk: {
    en: "Delete (:count)",
    ar: "حذف (:count)",
  },
  confirmBulkRows: {
    en: "Are you sure you want to delete (:count) selected rows?",
    ar: "هل أنت متأكد من حذف (:count) الصفوف المحددة؟",
  },
  bulkDeleteHeading: {
    en: "Bulk Delete Confirm",
    ar: "تأكيد حذف متعدد",
  },
  cancelDelete: {
    en: "No don't delete it",
    ar: "لا، لا تحذفه",
  },
  confirmDelete: {
    en: "Yes, delete it",
    ar: "تأكيد الحذف",
  },
  singleDeleteHeading: {
    en: "Delete Confirm",
    ar: "تأكيد الحذف",
  },
  deleting: {
    en: "Deleting...",
    ar: "جاري الحذف...",
  },
  deletingInProgress: {
    en: "Deleting in progress...",
    ar: "جاري الحذف...",
  },
  success: {
    en: "Success",
    ar: "تمت العملية بنجاح",
  },
  deleteSuccess: {
    en: "Delete Operation has been done successfully",
    ar: "تمت عملية الحذف بنجاح",
  },
  deleteError: {
    en: "Error while deleting",
    ar: "حدث خطأ أثناء الحذف",
  },
  group: {
    en: "Group",
    ar: "مجموعة",
  },
  isAdmin: {
    en: "Is Admin",
    ar: "مدير",
  },
  isOwner: {
    en: "Is Owner",
    ar: "مالك",
  },
  isAgent: {
    en: "Is Agent",
    ar: "وكيل",
  },
  isDeveloper: {
    en: "Is Developer",
    ar: "مطور",
  },
  deleteItem: {
    en: "Delete :item",
    ar: "حذف :item",
  },
  loading: {
    en: "Loading...",
    ar: "جار التحميل...",
  },
  login: {
    en: "Login",
    ar: "تسجيل الدخول",
  },
  confirmInput: {
    en: "Confirm :input",
    ar: "تأكيد :input",
  },
  confirm: {
    en: "Confirm",
    ar: "تأكيد",
  },
  phonNumber: {
    en: "Phone Number",
    ar: "رقم الهاتف",
  },
  confirmDeleteMessage: {
    en: "Are you sure you want to delete this record? This action is destructive and can not be restored.",
    ar: "هل أنت متأكد من أنك تريد حذف هذا السجل؟ هذا الإجراء غير قابل للتراجع عنه ولا يمكن إعادته.",
  },
  resetPassword: {
    en: "Reset Password",
    ar: "إسترجاع كلمة المرور",
  },
  backToLogin: {
    en: "Back To Login",
    ar: "الرجوع لصفحة تسجيل الدخول",
  },
  direction: {
    en: "Direction",
    ar: "الإتجاه",
  },
  theme: {
    en: "Theme",
    ar: "التصميم",
  },
  light: {
    en: "Light",
    ar: "فاتح",
  },
  dark: {
    en: "Dark",
    ar: "داكن",
  },
  enterEmail: {
    en: "Enter your Phone Number Or Email",
    ar: "ادخل البريد الالكتروني او رقم الهاتف",
  },
  settings: {
    en: "Settings",
    ar: "الإعدادات",
  },
  AccountSettings: {
    en: "Account Settings",
    ar: "إعدادات الحسآب",
  },
  ChangeAccount: {
    en: "Change Account",
    ar: "تغيير الحسآب",
  },
  logout: {
    en: "Logout",
    ar: "تسجيل الخروج",
  },
  logoutSuccessMessage: {
    en: "You have been logged out successfully",
    ar: "لقد تم تسجيل الخروج بنجاح",
  },
  language: {
    en: "Language",
    ar: "اللغة",
  },
  enterPass: {
    en: "Enter your password",
    ar: "ادخل كلمة المرور",
  },
  forgotPassword: {
    en: "Forgot Password?",
    ar: "نسيت كلمة المرور",
  },
  dashboard: {
    en: "Dashboard",
    ar: "الرئيسية",
  },
  somethingWentWrong: {
    en: "Something Went wrong, please try again later.",
    ar: "حدث خطأ ما, من فضلك حاول مرة أخرى في وقت لاحق.",
  },
  categories: {
    en: "Categories",
    ar: "الأقسام",
  },
  category: {
    en: "Category",
    ar: "القسم",
  },
  analysis: {
    en: "Analysis",
    ar: "التحليلات",
  },
  administrators: {
    en: "Administrators",
    ar: "المسؤولين",
  },
  administrator: {
    en: "Administrator",
    ar: "المسؤول",
  },
  errorHeading: {
    en: "Error!",
    ar: "خطأ!",
  },
  accessDenied: {
    en: "Access Denied!",
    ar: "غير مصرح لك بدخول هذه الصفحة!",
  },
  notFoundPage: {
    en: "Not Found Page",
    ar: "الصفحة المطلوبة غير موجودة",
  },
  minimizeScreen: {
    en: "Minimize Screen",
    ar: "تصغير الشاشة",
  },
  maximizeScreen: {
    en: "Maximize Screen",
    ar: "تكبير الشاشة",
  },
  unreadMessages: {
    en: "Unread Messages",
    ar: "رسائل غير مقروءة",
  },
  youHave: {
    en: "You have",
    ar: "لديك",
  },
  clickOrDarg: {
    en: "Click Or darg and drop file to upload",
    ar: "اضغط او أسحب الملف",
  },
  filtersOff: {
    en: "Filters Off",
    ar: "اخفاء الفلتر",
  },
  filtersOn: {
    en: "Filters On",
    ar: "إظهار الفلتر",
  },
  age: {
    en: "Age",
    ar: "عمر",
  },
  copyRight: {
    en: "Copy Right Reversed",
    ar: "حقوق النشر محفوظة",
  },
});
