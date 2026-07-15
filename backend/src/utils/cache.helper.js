import cache from "./cache.js";

const setCache = (key, data, ttl = 60000) => {
  cache.set(key, {
    data,
    expiresAt: Date.now() + ttl,
  });
};

const getCache = (key) => {
  return cache.get(key);
};

export default { setCache, getCache };
