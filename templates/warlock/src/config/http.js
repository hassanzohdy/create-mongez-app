import { env } from "@mongez/dotenv";
const httpConfigurations = {
    port: env("PORT", 3000),
    host: env("HOST", "localhost"),
    log: true,
    fileUploadLimit: 20 * 1024 * 1024,
    rateLimit: {
        max: 260,
        duration: 60 * 1000, // 1 minute
    },
    cors: {
        // allowed origins
        // origin: ["http://localhost"],
        origin: "*",
        // allowed methods
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    },
    middleware: {
        // apply the middleware to all routes
        all: [],
        // apply the middleware to specific routes
        only: {
            // Example:
            routes: [],
            namedRoutes: [],
            middleware: [],
        },
        // exclude the middleware from specific routes
        except: {
            routes: [],
            namedRoutes: [],
            middleware: [],
        },
    },
};
export default httpConfigurations;
