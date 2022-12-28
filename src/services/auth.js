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

  login = (payload) => axios.post(`https://a6f0-103-94-71-36.in.ngrok.io/login`, payload);

  getAccessToken = () => this.http.getAccessToken();

  getAllBooks = () => this.http.get(`https://a6f0-103-94-71-36.in.ngrok.io/all-books`);

}
