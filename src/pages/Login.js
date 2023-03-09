import React from 'react';
import { Link } from 'react-router-dom';
import BreadCrumb from '../components/BreadCrumb';
import MetaData from '../utils/MetaData';

const Login = () => {
  return (
    <>
      <MetaData title='Login' />
      <BreadCrumb title='Login' />
      <div className='login-wrapper home-wrapper-2 p-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='auth-card'>
                <h3 className='text-center mb-3'>Login</h3>
                <form action='' className='d-flex flex-column gap-15'>
                  <div>
                    <input
                      type='email'
                      className='form-control'
                      placeholder='Email'
                    />
                  </div>
                  <div>
                    <input
                      type='password'
                      className='form-control'
                      placeholder='Password'
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
