// append urls here, DO NOT remove this line
const URLS = {
    home: "/",
    notFound: "/404",
    blog: {
        root: "/blog",
        viewRoute: "/blog/:id/:slug",
        view: (post) => `/blog/${post.id}/${post.slug}`,
    },
    faq: "/faq",
    auth: {
        login: "/login",
        forgetPassword: "/forget-password",
        resetPassword: "/rest-password",
        register: "/register",
        verifyForgetPassword: "/forget-password/verify",
    },
    settings: "/settings",
    contactUs: "/contact-us",
    pages: {
        aboutUs: "/about-us",
        termsConditions: "/terms-conditions",
        privacyPolicy: "/privacy-policy",
        viewRoute: "/pages/:slug",
        view: (page) => `/pages/${page.id}/${page.slug}`,
    },
};
export default URLS;
