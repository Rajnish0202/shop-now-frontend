import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import MetaData from '../utils/MetaData';

const Signup = () => {
  return (
    <>
      <MetaData title='Sign Up' />
      <BreadCrumb title='Sign Up' />
      <div className='login-wrapper home-wrapper-2 p-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='auth-card'>
                <h3 className='text-center mb-3'>Sign Up</h3>
                <form action='' className='d-flex flex-column gap-15'>
                  <div>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='First Name'
                    />
                  </div>
                  <div>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Last Name'
                    />
                  </div>
                  <div>
                    <input
                      type='tel'
                      className='form-control'
                      placeholder='Mobile Number'
                    />
                  </div>
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

                  <div className='d-flex justify-content-center align-items-center gap-15'>
                    <button type='submit' className='button'>
                      Create
                    </button>
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

export default Signup;
