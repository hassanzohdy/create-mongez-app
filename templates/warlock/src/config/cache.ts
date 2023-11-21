import { env } from "@mongez/dotenv";
import {
  CacheConfigurations,
  FileCacheDriver,
  MemoryCacheDriver,
  RedisCacheDriver,
  requestContext,
} from "@mongez/warlock";

const cacheConfigurations: CacheConfigurations = {
  drivers: {
    file: FileCacheDriver,
    memory: MemoryCacheDriver,
    redis: RedisCacheDriver,
  },
  default: env("CACHE_DRIVER", "memory"),
  options: {
    redis: {
      host: env("REDIS_HOST"),
      port: env("REDIS_PORT"),
      url: env("REDIS_URL"),
      globalPrefix: () => {
        const { request } = requestContext();

        if (!request) return "store";

        if (request.client) return `store.${request.client.id}`;

        const domain =
          request.originDomain ||
          request.header("domain") ||
          request.input("domain");

        if (!domain) return "store";

        return `store.` + domain;
      },
    },
  },
};

export default cacheConfigurations;
