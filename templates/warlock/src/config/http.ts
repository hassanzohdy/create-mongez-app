import { env } from "@mongez/dotenv";
import { HttpConfigurations } from "@mongez/warlock";

export const httpConfigurations: HttpConfigurations = {
  port: env("PORT", 3000),
  host: env("HOST", "localhost"),
  log: true,
  fileUploadLimit: 12 * 1024 * 1024 * 1024,
  rateLimit: {
    max: 260,
    duration: 60 * 1000, // 1 minute
  },
  middleware: {
    // apply the middleware to all routes
    all: [],
    // apply the middleware to specific routes
    only: {
      // routes: [],
      // namedRoutes: ["users.list"],
      // middleware: [authMiddleware("user")],
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
