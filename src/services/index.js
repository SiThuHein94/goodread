import { isBrowser } from 'react-device-detect';

import AuthServices from './auth';
import Http from './http';


const auth = new Http('http://localhost:9009');
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  authServices: new AuthServices({ http: auth }),
  
};
