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

  // baseURL = 'http://localhost:9999'
  baseURL = 'https://cfd7-103-94-68-42.ap.ngrok.io'
  
  login = (payload) => axios.post(`${this.baseURL}/login`, payload);

  getAccessToken = () => this.http.getAccessToken();

  logout = () => this.http.removeTokens();

  getAllBooks = () => this.http.get(`${this.baseURL}/all-books`);
  

}
