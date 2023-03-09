import React from 'react';
import { Link } from 'react-router-dom';
import BreadCrumb from '../components/BreadCrumb';
import MetaData from '../utils/MetaData';

const ForgotPassword = () => {
  return (
    <>
      <MetaData title='Forgot Password' />
      <BreadCrumb title='Forgot Password' />

      <div className='login-wrapper home-wrapper-2 p-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='auth-card'>
                <h3 className='text-center mb-3'>Reset Your Password</h3>
                <p className='text-center mb-3 message'>
                  We will send you an email to reset your password
                </p>
                <form action='' className='d-flex flex-column gap-15'>
                  <div>
                    <input
                      type='email'
                      className='form-control'
                      placeholder='Email'
                    />
                  </div>

                  <div className='d-flex justify-content-center align-items-center gap-15'>
                    <button type='submit' className='button'>
                      Submit
                    </button>
                  </div>
                  <div className='d-flex justify-content-center align-items-center gap-15'>
                    <Link className='forgot' to='/login'>
                      Cancel
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

export default ForgotPassword;
