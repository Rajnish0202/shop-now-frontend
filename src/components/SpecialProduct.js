import React from 'react';
import StarRatings from 'react-star-ratings';

const SpecialProduct = () => {
  return (
    <div className='col-6 mb-3'>
      <div className='special-product-card'>
        <div className='d-flex justify-content-between'>
          <div className='special-image'>
            <img
              src='assests/speaker.jpg'
              className='img-fluid'
              alt='speaker'
            />
          </div>
          <div className='special-product-content'>
            <h5 className='brand'>Sony</h5>
            <h6 className='title'>
              beoplay A1 protable Bluetooth Speaker with...
            </h6>
            <StarRatings
              rating={3.5}
              starRatedColor='#febd69'
              starDimension='20px'
              starSpacing='2px'
            />
            <div className='price mt-2'>
              <span className='red-p'>₹999.00</span> &nbsp;
              <strike>₹1259.00</strike>
              <div className='discount-till d-flex align-items-center gap-10 mt-2'>
                <p className='mb-0'>
                  <b>5 </b> days
                </p>
                <div className='d-flex gap-10 align-items-center'>
                  <span className='badge rounded-circle p-3 bg-danger'>1</span>{' '}
                  :<span className='badge rounded-circle p-3 bg-danger'>1</span>{' '}
                  :<span className='badge rounded-circle p-3 bg-danger'>1</span>
                </div>
              </div>
              <div className='prod-count my-3'>
                <p>Products : 5</p>
                <div className='progress'>
                  <div
                    className='progress-bar'
                    role='progressbar'
                    style={{ width: '25%', height: '5px' }}
                    aria-valuenow='25'
                    aria-valuemin='0'
                    aria-valuemax='100'
                  ></div>
                </div>
              </div>
              <button className='button'>Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialProduct;
