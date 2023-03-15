import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BreadCrumb from '../components/BreadCrumb';
import { clearErrors, registerUser } from '../redux/actions/userActions';
import MetaData from '../utils/MetaData';
import { validateEmail } from '../utils/validateEmail';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!firstName || !lastName || !email || !mobile || !password) {
      return toast.error('All fields are required.');
    }

    if (!validateEmail(email)) {
      return toast.error('Please enter a valid email.');
    }

    if (mobile.length < 10) {
      return toast.error('Please enter a valid mobile Number.');
    }

    const formData = new FormData();
    formData.set('firstname', firstName);
    formData.set('lastname', lastName);
    formData.set('email', email);
    formData.set('mobile', mobile);
    formData.set('password', password);

    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate('/');
    }
  }, [error, dispatch, isAuthenticated, navigate]);

  return (
    <>
      <MetaData title='Sign Up' />
      <BreadCrumb title='Sign Up' />
      {loading && <p className='text-center mb-0'>Loading...</p>}
      <div className='login-wrapper home-wrapper-2 p-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='auth-card'>
                <h3 className='text-center mb-3'>Sign Up</h3>
                <form
                  action=''
                  className='d-flex flex-column gap-15'
                  onSubmit={formSubmit}
                >
                  <div>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='First Name'
                      name='firstname'
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Last Name'
                      name='lastname'
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      type='tel'
                      className='form-control'
                      placeholder='Mobile Number'
                      name='mobile'
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
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

                  <div className='d-flex justify-content-center align-items-center gap-15'>
                    <button
                      type='submit'
                      className='button'
                      disabled={loading ? true : false}
                    >
                      Sign Up
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
