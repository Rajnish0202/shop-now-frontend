import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import WishCard from '../components/WishCard';
import MetaData from '../utils/MetaData';

const Wishlist = () => {
  return (
    <>
      <MetaData title='Your Wishlist' />
      <BreadCrumb title='Your Wishlist' />
      <div className='wishlist-wrapper home-wrapper-2 p-4'>
        <div className='container-xxl'>
          <div className='row'>
            <WishCard />
            <WishCard />
            <WishCard />
            <WishCard />
            <WishCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
