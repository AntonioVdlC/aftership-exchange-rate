import deepEqual from 'deep-equal';
import isObject from 'is-obj';

import api from './api';
import cache from './cache';

const store = {
  init: () => {
    api.init();
    cache.init();
  },

  get: async (key, params) => {
    let value, error;

    // We build a special key for caching purpuses on rates
    // based on the base and the target currencies.
    let cacheKey = key === 'rate' ? `${params.base}-${params.target}` : key;

    // Try first to look into the cache!
    [error, value] = await cache.get(cacheKey);

    // Something went wrong or cache outdated
    if (error || value == null) {
      // So let's retrieve data from the API!
      [error, value] = await api.get(key, params);

      if (!error) {
        // Save value into cache
        await cache.set(cacheKey, value);
      } else {
        // The data cannot be retrieved from the API
        //
        // If the data is only outdated, let's just return it and
        // swallow the error
        if (value != null) error = null;
      }
    }

    return new Promise((resolve, reject) => {
      value != null ? resolve(value) : reject(error);
    });
  },

  post: async (key, data) => {
    let value, error;

    // For now we are not persisting anything on the server side
    // so we are directly POSTing and PUTing things into the cache!
    [error, value] = cache.set(key, data);

    return new Promise((resolve, reject) => {
      value != null ? resolve(value) : reject(error);
    });
  },

  put: async (key, data) => {
    let value, error;

    // For now we are not persisting anything on the server side
    // so we are directly POSTing and PUTing things into the cache!
    [error, value] = cache.get(key);

    if (!error) {
      if (Array.isArray(value)) {
        // We are storing an array, so let's just push the new data
        // into it.
        // To get fancy and optimize a bit the cache memory, let's
        // make sure we ain't storing no duplicates!
        if (!value.some(v => deepEqual(v, data))) {
          value.push(data);
        }
      } else if (isObject(value)) {
        // We are storing an object, so let's merge it with the new data
        value = { ...value, ...data };
      } else {
        // We are storing a primitive data, so let's just replace it? 🤷🏾‍♂️
        // This should be a POST though ... 😅
        value = data;
      }

      cache.set(key, value);
    }

    return new Promise((resolve, reject) => {
      value != null ? resolve(value) : reject(error);
    });
  },

  delete: async key => {
    let value, error;

    // For now we are not persisting anything on the server side
    // so we are directly DELETEing things from the cache!
    [error, value] = cache.remove(key);

    return new Promise((resolve, reject) => {
      value != null ? resolve(value) : reject(error);
    });
  }
};

export default store;
