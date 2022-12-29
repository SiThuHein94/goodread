// import { ROUTES } from 'definitions';
import { includes } from 'lodash';
import { isBrowser } from 'react-device-detect'
import axios from 'axios';
import stores from 'stores';

// const APP_NAME = isBrowser ? window.__ENV.REACT_APP_APP_NAME : window.__ENV.REACT_APP_APP_NAME_MOBILE;
const TOKENS_KEY = `TOKENS`;

const headers = (params) => {
  return {
    headers: {
      ...params,
    },
  };
};

const responseParser = (res) => res.data;
const errorParser = (res) => {
  console.error(res.response);
  return res.response;
};

export default class Http {
  constructor(props) {
    this.axiosInstance = axios.create({
      // eslint-disable-next-line no-undef
      baseURL: props.endpoint,
    });

    this.createAxiosResponseInterceptor();
  }

  createAxiosResponseInterceptor() {
    this.axiosInstance.interceptors.response.use(
      function (config) {
        return config;
      },
      (error) => {
        if (error.message === 'Network Error') {
          // window.location = '/504';
        }
        const {
          response: { status = null },
        } = error;
        const originalRequest = error.config;

        switch (status) {
          case 404:
            // window.location = `/404`;
            break;
          case 401:
            stores.errorStore.setError('Your token is expired now. Please login again!');
            window.location = '/login';
            return Promise.reject(error);
          case 400:
            return Promise.reject(error);
          case 403:
            sessionStorage.setItem('REDIRECT', window.location.pathname);
            // localStorage.removeItem(`${APP_NAME}_TOKENS`);
            stores.errorStore.setError(error.response.data.error_description || 'Error');
            // window.location = `${window.location.origin}/${ROUTES.LOGIN}`;
            return Promise.reject(error);
          case 408:
            this.removeTokens();
            window.location = '/login';
            return Promise.reject(error);
          case 500:
            if (error.response.data.error_class === 'SQLException' || error.response.data.error_class === 'TransactionSystemException') {
              stores.errorStore.setError('Internal Server Error!');
            } else {
              stores.errorStore.setError(error.response.data.error_description);
            }

            return Promise.reject(error);
          default:
            break;
        }
        return Promise.reject(error);
      }
    );
  }

  getAuthTokens = () => localStorage.getItem(TOKENS_KEY) || null;
  getAccessToken = () => {
    if (!this.getAuthTokens()) {
      return null;
    }

    const tokens = JSON.parse(this.getAuthTokens());
    return tokens.accessToken;
  };

  setTokens = (tokens) => {
    localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
  };

  removeTokens = () => {
    console.log('here')
    // localStorage.removeItem(TOKENS_KEY);
    localStorage.removeItem('TOKENS');
  };

  authenticatedHeader = () => {
    return {
      Authorization: `Bearer ${this.getAccessToken()}`,
      accept: '*/*',
    };
  };

  get = (url, payload = {}, options) => {
    
    const authenticatedHeader = this.authenticatedHeader();
    const config = Object.assign({ params: payload }, headers(authenticatedHeader), options);
    console.log(url,payload,config)
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(url, config)
        .then((res) => resolve(responseParser(res)))
        .catch((err) => reject(errorParser(err)));
    });
  };

  getWithoutAuthHeader = (url) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(url)
        .then((res) => resolve(responseParser(res)))
        .catch((err) => reject(errorParser(err)));
    });
  };

  post = (url, payload, options) => {
    const authenticatedHeader = this.authenticatedHeader();
    const config = Object.assign(headers(authenticatedHeader), options);

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post(url, payload, config)
        .then((res) => resolve(responseParser(res)))
        .catch((err) => reject(errorParser(err)));
    });
  };

  postWithoutAuthHeader = (url, payload) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post(url, payload)
        .then((res) => resolve(responseParser(res)))
        .catch((err) => reject(errorParser(err)));
    });
  };


  put = (url, payload) => {
    const authenticatedHeader = this.authenticatedHeader();
    const config = Object.assign(headers(authenticatedHeader), {});
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .put(url, payload, config)
        .then((res) => resolve(responseParser(res)))
        .catch((err) => reject(errorParser(err)));
    });
  };

  delete = (url) => {
    const config = Object.assign(headers({ Token: this.getToken() }), {});
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .delete(url, config)
        .then((res) => resolve(responseParser(res)))
        .catch((err) => reject(errorParser(err)));
    });
  };
}
