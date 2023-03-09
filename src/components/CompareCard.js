import React from 'react';
import Color from './Color';

const CompareCard = () => {
  return (
    <div className='col-3 '>
      <div className='compare-product-card position-relative'>
        <img
          src='assests/cross.svg'
          alt='cross'
          className='position-absolute cross img-fluid'
        />
        <div className='product-card-image'>
          <img src='assests/watch.jpg' alt='watch' />
          <div className='compare-product-details'>
            <h5 className='title'>
              Beoplay A1 Protable Bluetooth Speaker With...
            </h5>
            <h6 className='price'>₹2500.00</h6>
            <div>
              <div className='product-detail'>
                <h5>Brand:</h5>
                <p>Havels</p>
              </div>
              <div className='product-detail'>
                <h5>Type:</h5>
                <p>Tablet Computers</p>
              </div>
              <div className='product-detail'>
                <h5>SKU:</h5>
                <p>Havels</p>
              </div>
              <div className='product-detail'>
                <h5>Availability:</h5>
                <p>In Stock</p>
              </div>
              <div className='product-detail'>
                <h5>Color:</h5>
                <div>
                  <Color />
                </div>
              </div>
              <div className='product-detail'>
                <h5>Size:</h5>
                <div className='d-flex align-items-center gap-10'>
                  <p>S</p>
                  <p>XL</p>
                  <p>XLL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareCard;
