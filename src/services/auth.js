import { isBrowser } from 'react-device-detect'
import axios from 'axios';
import axiosRetry from 'axios-retry';

export default class AuthServices {
  constructor(props) {
    this.url = '/auth';
    this.http = props.http;

    axiosRetry(axios, {
      retries: 3,
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition: axiosRetry.isRetryableError,
    });
  }

  login = (payload) => axios.post(`http://localhost:9999/login`, payload);

  forgotPassword = (payload) =>
    axios.post(`${isBrowser ? window.__ENV.REACT_APP_UAC_SERVER : window.__ENV.REACT_APP_UAC_SERVER_MOBILE}/uac/reset-my-forget-password-with-userid`, payload);

  refreshToken = (payload) => this.http.post(`/refresh`, payload);

  logout = () => this.http.removeTokens();
  getAccessToken = () => this.http.getAccessToken();
  getRefreshToken = () => this.http.getRefreshToken();

  setPasswordExpiryStatus = (value) =>
    localStorage.setItem(`${isBrowser ? window.__ENV.REACT_APP_APP_NAME : window.__ENV.REACT_APP_APP_NAME_MOBILE}_IS_PASSWORD_EXPIRED`, value);

  getPasswordExpiryStatus = () => localStorage.getItem(`${isBrowser ? window.__ENV.REACT_APP_APP_NAME : window.__ENV.REACT_APP_APP_NAME_MOBILE}_IS_PASSWORD_EXPIRED`);
}
