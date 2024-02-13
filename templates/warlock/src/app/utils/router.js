import { authMiddleware, requestContext, router, } from "@mongez/warlock";
export const adminPath = (path) => `/admin${path}`;
/**
 * Check if the current request is for admin
 */
export const isAdminRequest = () => {
    const { request } = requestContext();
    return request.path.includes("/admin");
};
/**
 * Add routes Group
 */
const adminRoutes = (callback) => {
    return router.group({
        prefix: "/admin",
        name: "admin",
    }, callback);
};
/**
 * Register guarded routes that requires user to be logged in to access them.
 */
export const guarded = (callback, moreMiddlewares = []) => {
    return router.group({
        name: "guarded.user",
        middleware: [authMiddleware("user"), ...moreMiddlewares],
    }, callback);
};
/**
 * Only guests can access these routes.
 */
export const guardedGuest = (callback) => {
    return router.group({
        name: "guarded.guest",
        middleware: [authMiddleware("guest")],
    }, callback);
};
/**
 * Guarded guest routes for admin
 */
export const guardedGuestAdmin = (callback) => {
    return adminRoutes(() => {
        router.group({
            name: "guarded.guest",
            middleware: [authMiddleware("guest")],
        }, callback);
    });
};
/**
 * Only admin can access these routes.
 */
export const guardedAdmin = (callback) => {
    return adminRoutes(() => {
        router.group({
            name: "guarded.user",
            middleware: [authMiddleware("user")],
        }, callback);
    });
};
/**
 * Public routes that doesn't require user to be logged in to access them.
 * Just requires an access token.
 */
export const publicRoutes = (callback) => {
    return router.group({
        name: "public",
        middleware: [authMiddleware()],
    }, callback);
};
