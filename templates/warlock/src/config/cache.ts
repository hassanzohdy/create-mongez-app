import { env } from "@mongez/dotenv";
import { redisCache } from "@mongez/warlock";

const cacheDriverName = env("CACHE_DRIVER", "redis");

export const cacheDriver = cacheDriverName === "redis" ? redisCache : undefined;

cacheDriver?.setOptions({
  host: env("REDIS_HOST"),
  port: env("REDIS_PORT"),
  url: env("REDIS_URL"),
  globalPrefix: "appName",
});
