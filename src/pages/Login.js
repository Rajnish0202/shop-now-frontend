import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BreadCrumb from '../components/BreadCrumb';
import MetaData from '../utils/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
import { toast } from 'react-toastify';
import { validateEmail } from '../utils/validateEmail';
import Loader from '../components/Loader/Loader';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const loginSubmit = (e) => {
    e.preventDefault();

    // Validation

    if (!email || !password) {
      return toast.error('All fields are required.');
    }

    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email.');
    }

    const formData = new FormData();
    formData.set('email', email);
    formData.set('password', password);

    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate, dispatch]);

  return (
    <>
      <MetaData title='Login' />
      <BreadCrumb title='Login' />
      {!loading && <Loader />}
      <div className='login-wrapper home-wrapper-2 p-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='auth-card'>
                <h3 className='text-center mb-3'>Login</h3>
                <form
                  action=''
                  className='d-flex flex-column gap-15'
                  onSubmit={loginSubmit}
                >
                  <div>
                    <input
                      type='email'
                      className='form-control'
                      placeholder='Email'
                      name='email'
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      type='password'
                      className='form-control'
                      placeholder='Password'
                      name='password'
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <Link className='forgot' to='/forgot-password'>
                      Forgot Password?
                    </Link>
                  </div>
                  <div className='d-flex justify-content-center align-items-center gap-15'>
                    <button type='submit' className='button'>
                      Login
                    </button>
                    <Link to='/register' className='button signup'>
                      Sign Up
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
