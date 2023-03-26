import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BreadCrumb from '../../components/BreadCrumb';
import MetaData from '../../utils/MetaData';
import moment from 'moment';

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <MetaData title='User Profile' />
      <BreadCrumb title='User Profile' />
      <div className='home-wrapper-2 p-4 d-flex align-items-center justify-content-center flex-column gap-15'>
        <h2 className='mb-0'>My Profile</h2>
        <div
          className='d-flex align-items-center justify-content-center p-4'
          style={{
            gap: '5rem',
            border: '1px solid #c8c6c6',
            borderRadius: '10px',
          }}
        >
          <div className='d-flex align-items-center flex-column gap-10'>
            <div style={{ width: '10rem' }}>
              <img
                src='https://res.cloudinary.com/dukdn1bpp/image/upload/v1674883325/MERN-INVENTORY/nbqkarlgegbdyzomwadv.png'
                alt='profile'
                className='img-fluid'
              />
            </div>
            <Link to='/user-profile/update'>Edit Profile</Link>
          </div>
          <div className='d-flex flex-column gap-10'>
            <div>
              <h5 className='mb-0'>Full Name</h5>
              <p className='text-capitalize mb-0'>
                {user?.firstname}&nbsp;{user?.lastname}{' '}
              </p>
            </div>
            <div>
              <h5 className='mb-0'>Email</h5>
              <p className='mb-0'>{user?.email}</p>
            </div>
            <div>
              <h5 className='mb-0'>Mobile</h5>
              <p className='mb-0'>{user?.mobile}</p>
            </div>
            {user?.address && (
              <div>
                <h5 className='mb-0'>Address</h5>
                <p className='mb-0'>
                  {user?.address?.street} <br /> {user?.address?.city}{' '}
                  {user?.address?.state} {user?.address?.country} -{' '}
                  {user?.address?.pinCode}
                </p>
              </div>
            )}
            <div>
              <h5 className='mb-0'>Joined On</h5>
              <p className='mb-0'>
                {moment(user?.createdAt).format('DD MMMM YYYY ')}
              </p>
            </div>
            <div className='d-flex gap-15 mt-2'>
              <Link to='/user-orders'>My Orders</Link>
              <Link to='/user-profile/update'>Change Password</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
