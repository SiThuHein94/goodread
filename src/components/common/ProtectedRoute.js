import { inject, observer } from 'mobx-react';
import React from 'react';
import { Route } from 'react-router-dom';
import { ROUTES } from 'definitions'



const ProtectedRoute = ({ authStore, ...rest }) => {
  // const navigate = useNavigate()
  React.useEffect(() => {
    console.log({authStore})
    // if (authStore.getAccessToken()) {
    //   navigate(ROUTES.HOME);
    // }
    // if () {

    //     history.push('/login');

    // }
  }, []);

  return <Route {...rest} />;
};

export default inject(({ authStore }) => ({ authStore }))(ProtectedRoute);
