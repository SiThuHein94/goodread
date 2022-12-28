
import AuthStore from './auth';
import services from 'services';
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  authStore: new AuthStore({ api: services.authServices }),
};
