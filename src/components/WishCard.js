import React from 'react';

const WishCard = () => {
  return (
    <div className='col-3'>
      <div className='wishlist-card position-relative'>
        <img
          src='assests/cross.svg'
          alt='cross'
          className='position-absolute cross img-fluid'
        />
        <div className='wishlist-card-image w-100 mb-3'>
          <img src='assests/acc.jpg' className='w-100 img-fluid' alt='acc' />
        </div>
        <h5 className='title'>Smart Watch Series 7</h5>
        <h6 className='price'>₹1524.00</h6>
      </div>
    </div>
  );
};

export default WishCard;
