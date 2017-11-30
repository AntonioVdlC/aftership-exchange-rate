import config from '../../config';
import checkStatus from '../../utils/check-http-status';

const api = {
  init: () => {},
  get: async (key, params) => {
    let value, error;

    let resource;
    switch (key) {
      case 'currencies':
        resource = 'currencies';
        break;
      default:
        resource = `${key}`;
    }

    try {
      value = await fetch(`${config.url}/api/${resource}`)
        .then(checkStatus)
        .then(res => res.json());
    } catch (err) {
      error = err;
    }

    return [error, value];
  }
};

export default api;
