import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BreadCrumb from '../components/BreadCrumb';
import MetaData from '../utils/MetaData';
import { clearErrors, forgotPassword } from '../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { TextSpinner } from '../components/Loader/Loader';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const dispatch = useDispatch();

  const forgotHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      toast.success(message);
    }
  }, [error, dispatch, message]);

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
                <form
                  action=''
                  className='d-flex flex-column gap-15'
                  onSubmit={forgotHandler}
                >
                  <div>
                    <input
                      type='email'
                      className='form-control'
                      placeholder='Email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className='d-flex justify-content-center align-items-center gap-15'>
                    <button type='submit' className='button'>
                      {loading ? <TextSpinner /> : 'Submit'}
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
