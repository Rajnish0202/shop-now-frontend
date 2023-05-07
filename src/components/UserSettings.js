import React from 'react';
import { MdDashboardCustomize } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { FaBoxOpen } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';

const UserSettings = ({ user }) => {
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <div className='user-settings'>
      <ul className='d-flex flex-column gap-10 mb-0 px-0 text-white'>
        {user?.role === 'admin' && (
          <Link to='/admin/dashboard' className='text-white'>
            <li className='d-flex align-items-center gap-10'>
              <MdDashboardCustomize size={25} />
              <p className='mb-0'>Dashboard</p>
            </li>
          </Link>
        )}
        <Link to='/user-profile' className='text-white'>
          <li className='d-flex align-items-center gap-10'>
            <CgProfile size={25} />
            <p className='mb-0'>Profile</p>
          </li>
        </Link>
        <Link to='/user-orders' className='text-white'>
          <li className='d-flex align-items-center gap-10'>
            <FaBoxOpen size={25} />
            <p className='mb-0'>Orders</p>
          </li>
        </Link>
        <Link to='/' className='text-white' onClick={logOutHandler}>
          <li className='d-flex align-items-center gap-10'>
            <FiLogOut size={25} />
            <p className='mb-0'>Logout</p>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default UserSettings;
