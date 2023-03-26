import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import MetaData from '../../utils/MetaData';
import {
  MdFace,
  MdMailOutline,
  MdOutlineRealEstateAgent,
} from 'react-icons/md';
import { BsTelephoneFill } from 'react-icons/bs';
import { MdLock, MdLockOpen, MdVpnKey } from 'react-icons/md';
import { FaCity, FaHome, FaStreetView } from 'react-icons/fa';
import { GiEarthAmerica } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  loadUser,
  passwordUpdate,
  profileUpdate,
  saveAddress,
} from '../../redux/actions/userActions';
import { UPDATE_PROFILE_RESET } from '../../redux/constants/userConstants';
import { toast } from 'react-toastify';

const EditProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [pin, setPin] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector(
    (state) => state.userAction
  );

  const navigate = useNavigate();

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('firstname', firstName);
    myForm.set('lastname', lastName);
    myForm.set('email', email);
    myForm.set('mobile', phone);

    dispatch(profileUpdate(myForm));
  };

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('oldPassword', oldPassword);
    myForm.set('confirmPassword', confirmPassword);
    myForm.set('newPassword', newPassword);
    dispatch(passwordUpdate(myForm));
  };

  const saveAddressSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('street', street);
    myForm.set('city', city);
    myForm.set('state', state);
    myForm.set('country', country);
    myForm.set('pin', pin);
    dispatch(saveAddress(myForm));
    dispatch(loadUser());
    navigate('/user-profile');
  };

  useEffect(() => {
    if (user) {
      setFirstName(user?.firstname);
      setLastName(user?.lastname);
      setEmail(user?.email);
      setPhone(user?.mobile);
    }

    if (localStorage.getItem('address')) {
      const { street, city, state, country, pinCode } = JSON.parse(
        localStorage.getItem('address')
      );
      setStreet(street);
      setCity(city);
      setState(state);
      setCountry(country);
      setPin(pinCode);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      dispatch(loadUser());
      navigate('/user-profile');

      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [user, dispatch, isUpdated, navigate, error]);

  return (
    <>
      <MetaData title='Edit Profile' />
      <BreadCrumb title='Edit Profile' />
      <div className='home-wrapper-2 p-4 d-flex align-items-center justify-content-center flex-column gap-15'>
        <div>
          <h2 className='mb-4 text-center'>Update Profile</h2>
          <form onSubmit={updateProfileSubmit}>
            <div
              className='d-flex align-items-center justify-content-between p-4'
              style={{
                gap: '2rem',
                border: '1px solid #c8c6c6',
                borderRadius: '10px',
                width: '40rem',
              }}
            >
              <div style={{ width: '15rem' }}>
                <img
                  src='https://res.cloudinary.com/dukdn1bpp/image/upload/v1674883325/MERN-INVENTORY/nbqkarlgegbdyzomwadv.png'
                  alt='profile'
                  className='img-fluid'
                />
              </div>
              <div className='d-flex flex-column gap-15 w-75'>
                <div className='updateProfileInput'>
                  <MdFace size={25} />
                  <input
                    type='text'
                    placeholder='First Name'
                    required
                    name='firstname'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className='updateProfileInput'>
                  <MdFace size={25} />
                  <input
                    type='text'
                    placeholder='Last Name'
                    required
                    name='lastname'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className='updateProfileInput'>
                  <MdMailOutline size={25} />
                  <input
                    type='email'
                    placeholder='Email'
                    required
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className='updateProfileInput'>
                  <BsTelephoneFill size={25} />
                  <input
                    type='tel'
                    placeholder='Phone'
                    required
                    name='phone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <input
                  type='submit'
                  value='Update Profile'
                  className='button'
                  disabled={loading ? true : false}
                />
              </div>
            </div>
          </form>
        </div>

        <div
          className='d-flex align-items-start justify-content-between w-75 py-2 mt-2 '
          style={{ borderTop: '2px solid #c8c6c6' }}
        >
          <div className='m-2 d-flex align-items-center justify-content-center flex-column'>
            <h2 className='mb-4 text-center'>Update Address</h2>
            <form style={{ width: '25rem' }} onSubmit={saveAddressSubmit}>
              <div
                className='d-flex align-items-center justify-content-center flex-column p-4 w-100'
                style={{
                  gap: '1rem',
                  border: '1px solid #c8c6c6',
                  borderRadius: '10px',
                }}
              >
                <div className='updateProfileInput '>
                  <FaHome size={25} />
                  <input
                    type='text'
                    placeholder='Street'
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>

                <div className='updateProfileInput'>
                  <FaCity size={25} />
                  <input
                    type='text'
                    placeholder='City'
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className='updateProfileInput'>
                  <MdOutlineRealEstateAgent size={25} />
                  <input
                    type='text'
                    placeholder='State'
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
                <div className='updateProfileInput'>
                  <GiEarthAmerica size={25} />

                  <input
                    type='text'
                    placeholder='Country'
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div className='updateProfileInput'>
                  <FaStreetView size={25} />

                  <input
                    type='text'
                    placeholder='Pin/Zip Code'
                    required
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                  />
                </div>
                <input
                  type='submit'
                  value='Save Address'
                  className='button w-100'
                  disabled={loading ? true : false}
                />
              </div>
            </form>
          </div>

          <div className='m-2 d-flex align-items-center justify-content-center flex-column'>
            <h2 className='mb-4 text-center'>Update Password</h2>
            <form style={{ width: '25rem' }} onSubmit={updatePasswordSubmit}>
              <div
                className='d-flex align-items-center justify-content-center flex-column p-4 w-100'
                style={{
                  gap: '1rem',
                  border: '1px solid #c8c6c6',
                  borderRadius: '10px',
                }}
              >
                <div className='updateProfileInput '>
                  <MdVpnKey size={25} />
                  <input
                    type='password'
                    placeholder='Old Password'
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className='updateProfileInput'>
                  <MdLockOpen size={25} />
                  <input
                    type='password'
                    placeholder='New Password'
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className='updateProfileInput'>
                  <MdLock size={25} />
                  <input
                    type='password'
                    placeholder='Confirm Password'
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type='submit'
                  value='Change Password'
                  className='button w-100'
                  disabled={loading ? true : false}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
