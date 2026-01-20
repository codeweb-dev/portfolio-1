import { LRUCache } from "lru-cache";

type Options = {
  interval: number;
  uniqueTokenPerInterval: number;
};

export function rateLimit(options: Options) {
  const tokenCache = new LRUCache<string, number[]>({
    max: options.uniqueTokenPerInterval,
    ttl: options.interval,
  });

  return {
    check: (token: string, limit: number) => {
      const timestamps = tokenCache.get(token) ?? [];
      const now = Date.now();

      timestamps.push(now);
      tokenCache.set(token, timestamps);

      return timestamps.length <= limit;
    },
  };
}
