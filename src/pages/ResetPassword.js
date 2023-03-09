import React from 'react';
import { Link } from 'react-router-dom';
import BreadCrumb from '../components/BreadCrumb';
import MetaData from '../utils/MetaData';

const ResetPassword = () => {
  return (
    <>
      <MetaData title='Reset Password' />
      <BreadCrumb title='Reset Password' />
      <div className='login-wrapper home-wrapper-2 p-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='auth-card'>
                <h3 className='text-center mb-3'>Reset Password</h3>

                <form action='' className='d-flex flex-column gap-15'>
                  <div>
                    <input
                      type='password'
                      className='form-control'
                      placeholder='New Password'
                    />
                  </div>
                  <div>
                    <input
                      type='password'
                      className='form-control'
                      placeholder='Confirm Password'
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

export default ResetPassword;
