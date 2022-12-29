import { inject } from 'mobx-react';
import { useForm } from 'react-hook-form';
import { ROUTES } from 'definitions';
import React from 'react';
import Input from 'components/common/Form/Input';
import Loading from 'components/common/Loading';
import useToggle from 'hooks/useToggle';
import { useNavigate } from 'react-router-dom';
import FormResponseError from 'components/common/Form/FormResponseError'
import { Colors } from 'assets/colors';
import logo from 'assets/images/logo4.png'



const Login = ({ authStore }) => {
  const navigate = useNavigate()
  const [errors, setErrors] = React.useState([]);
  const methods = useForm();
  const { handleSubmit } = methods;
  const { toggle, handleToggle } = useToggle({
    showPassword: false,
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const SideIcon = ({ action }) => (
    <span onClick={action} className="relative side-icon transition-all duration-700">
      {!toggle.showPassword?<i className="fa fa-eye"></i>:<i className="fa-sharp fa-solid fa-eye-slash"></i>}
    </span>
  
  );

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

        }
      });
  };

  return (
    <>
      <div className="flex h-screen justify-center">
        <div className="flex items-center justify-center w-2/3">
          <div className="flex flex-col items-center justify-between w-1/2 mb-20">
            <div className="w-3/4 rounded-md" style={{ background: Colors.primary }}>
              <div className='px-10 pt-5 pb-10'>
                <div className='flex justify-between items-center'>

                  <h1 className="mb-8 text-4xl font-bold uppercase text-white">Log In</h1>
                  <img style={{ height: 100 }} src={logo} />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>

                  <Input label="Login ID" name="username"
                    type='text' methods={methods} rules={{ required: 'Enter Login ID' }}
                    className="
                    px-4
                    py-2 mb-2"
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
                      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition-all duration-700'
                      type="submit"
                    >
                      Log In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            &nbsp;
          </div>
        </div>
      </div>

      {isLoading && <Loading />}
    </>
  );
};

export default inject(({ authStore }) => ({ authStore }))(Login);