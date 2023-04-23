import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BreadCrumb from '../components/BreadCrumb';
import MetaData from '../utils/MetaData';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword } from '../redux/actions/userActions';
import { TextSpinner } from '../components/Loader/Loader';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams();

  const { loading, error } = useSelector((state) => state.forgotPassword);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault();

    if (!password) {
      return toast.error('Please enter a password.');
    }

    if (password.length < 6) {
      return toast.error('Password must be upto 6 characters.');
    }

    if (password !== confirmPassword) {
      return toast.error('Password must be match.');
    }

    dispatch(resetPassword(password, confirmPassword, token));
    navigate('/login');
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

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

                <form
                  onSubmit={formSubmit}
                  className='d-flex flex-column gap-15'
                >
                  <div>
                    <input
                      type='password'
                      className='form-control'
                      placeholder='New Password'
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      type='password'
                      className='form-control'
                      placeholder='Confirm Password'
                      onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ResetPassword;
