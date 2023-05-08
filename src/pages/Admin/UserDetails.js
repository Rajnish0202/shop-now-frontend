import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import MetaData from '../../utils/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getUserDetails } from '../../redux/actions/userActions';
import { Spinner } from '../../components/Loader/Loader';

const UserDetails = () => {
  const { userId } = useParams();

  const { loading, user } = useSelector((state) => state.adminUserDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getUserDetails(userId));
    }
  }, [dispatch, userId]);

  return (
    <>
      <MetaData title='User Profile' />
      {loading && (
        <div className='my-4'>
          <Spinner />
        </div>
      )}
      <div className='home-wrapper-2 p-2 d-flex align-items-center justify-content-center flex-column gap-15'>
        <h2 className='mb-0'>User's Profile ({user?._id})</h2>
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
            <div>
              <h5 className='mb-0'>Role</h5>
              <p className='mb-0'>{user?.role}</p>
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
                {moment(user?.createdAt).format('DD MMMM YYYY')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
