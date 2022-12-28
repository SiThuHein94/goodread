import { inject } from 'mobx-react';
import { useForm } from 'react-hook-form';
import { ROUTES } from 'definitions';
import React from 'react';
import Input from 'components/common/Form/Input';
import Loading from 'components/common/Loading';
import useToggle from 'hooks/useToggle';
import { useNavigate } from 'react-router-dom';
import ErrorModal from "components/Modals/ErrorModal"
import FormResponseError from 'components/common/Form/FormResponseError'

const SideIcon = ({ action }) => (
  <span onClick={action} className="relative side-icon">
    <i className="fa fa-eye"></i>
  </span>

);

const Login = ({ authStore }) => {
  const navigate = useNavigate()
  const [errors, setErrors] = React.useState([]);
  const methods = useForm();
  const { handleSubmit } = methods;
  const { toggle, handleToggle } = useToggle({
    requestResetModal: false,
    confirmationModal: false,
    accountLockedModal: false,
    accountSuspendedModal: false,
    showPassword: false,
    accountRevokedModal: false,
    errorModal: false,
  });
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (authStore.getAccessToken()) {
      navigate(ROUTES.HOME);
    }
  }, [authStore, navigate]);

  const onSubmit = (data) => {
    setErrors([]);
    setIsLoading(true);
    authStore
      .login(data)
      .then(() => {
        const REDIR = sessionStorage.getItem('REDIRECT');
        setIsLoading(false);
        navigate(REDIR ? REDIR : ROUTES.HOME);
        sessionStorage.removeItem('REDIRECT');
      })
      .catch((err) => {
        setIsLoading(false);
        if (err?.status === 400) {
          setErrors([{ message: 'Incorrect Login ID or Password.' }]);
          methods.setError('username', { message: ' ' });
          methods.setError('password', { message: ' ' });

        } else if (err?.status === 500) {
          setErrors([{ error_description: err.data.error_description }]);
          handleToggle({ errorModal: true });
        } else {
          setErrors([{ error_description: 'Please check your internet connection.' }]);
          handleToggle({ errorModal: true });
        }
      });
  };
  const handleCloseErrorModal = React.useCallback(() => {
    handleToggle({ errorModal: false });
    setErrors([]);
  }, [handleToggle]);
  return (
    <>
      <div className="flex h-screen">

        <div className="flex items-center justify-center w-2/3">
          <div className="flex flex-col items-center justify-between w-1/2 h-screen py-20">
            <div className="w-3/4">
              <h1 className="mb-8 text-4xl font-bold uppercase text- text-primary">Log In</h1>
              <form onSubmit={handleSubmit(onSubmit)}>

                <Input label="Login ID" name="username"
                  type='text' methods={methods} rules={{ required: 'Enter Login ID' }}
                  className="
                    px-4
                    py-2"
                />
                <Input
                  label="Password"
                  name="password"
                  type={toggle.showPassword ? 'text' : 'password'}
                  methods={methods}
                  rules={{ required: 'Enter a password' }}
                  className="
                      px-4
                      py-2"
                  sideIcon={<SideIcon action={() => handleToggle({ showPassword: !toggle.showPassword })} />}
                />

                <div className="flex flex-row w-full mb-4">
                  {errors && !toggle.requestResetModal && !toggle.errorModal && <FormResponseError errors={errors} />}
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
                    type="submit"
                  >
                    Log In
                  </button>
                </div>
              </form>
            </div>
            &nbsp;
          </div>
        </div>
      </div>
      {toggle.errorModal && (
        <ErrorModal description={errors.error} onToggle={handleCloseErrorModal} />
      )}
      {isLoading && <Loading />}
    </>
  );
};

export default inject(({ authStore }) => ({ authStore }))(Login);