import React from 'react';
import { Link } from 'react-router-dom';
import BreadCrumb from '../components/BreadCrumb';
import MetaData from '../utils/MetaData';

const OrderSuccess = () => {
  return (
    <>
      <MetaData title='Order Success' />
      <BreadCrumb title='Order Success' />
      <div className='home-wrapper-2 py-4'>
        <div className='col-12 d-flex flex-column justify-content-center align-items-center p-4 gap-15'>
          <div>
            <h5 className='text-center mb-4'>Thanks For Shopping.</h5>
            <h5 className='text-center mb-4'>Our Order Successfully Placed.</h5>
          </div>
          <div className='d-flex align-items-center gap-30'>
            <Link to='/user-orders' className='button'>
              My Order
            </Link>
            <Link to='/' className='button'>
              Back To Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
