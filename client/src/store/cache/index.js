const cache = {
  init: (validity = 1 * 86400000 /* 1 day */) => {
    // Cache validity duration
    this.validity = validity;
  },

  get: key => {
    let value, error;

    let validUntil = localStorage.getItem(`${key}-valid-until`);
    let isValid = validUntil && new Date() < new Date(validUntil);

    // Flag the value as outdated if cache is not valid
    // but still retrieve the value in case the subsequent
    // HTTP request fails
    if (!isValid) error = true;

    try {
      value = JSON.parse(localStorage.getItem(key));
    } catch (err) {
      error = err;
    }

    return [error, value];
  },

  set: (key, data) => {
    let value, error;

    try {
      localStorage.setItem(key, JSON.stringify(data));
      localStorage.setItem(
        `${key}-valid-until`,
        new Date(Date.now() + this.validity).toISOString()
      );

      value = data;
    } catch (err) {
      error = err;
    }

    return [error, value];
  },

  remove: key => {
    let value, error;

    try {
      localStorage.removeItem(key);
      localStorage.removeItem(`${key}-valid-until`);

      value = true;
    } catch (err) {
      error = err;
    }

    return [error, value];
  }
};

export default cache;
