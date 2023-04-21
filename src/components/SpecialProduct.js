import React from 'react';
import StarRatings from 'react-star-ratings';
import Timer from './Timer';
import { shortenText } from '../utils/ShortenText';
import { Link } from 'react-router-dom';

const SpecialProduct = ({ special }) => {
  return (
    <div className='col-6 mb-3'>
      <div className='special-product-card'>
        <div className='d-flex justify-content-between'>
          <div className='special-image'>
            <img
              src={special?.images[0]?.url}
              className='img-fluid'
              alt='speaker'
            />
          </div>
          <div className='special-product-content'>
            <h5 className='brand'>{special?.brand?.title}</h5>
            <h6 className='title' title={special?.title}>
              {shortenText(special?.title, 40)}
            </h6>
            <StarRatings
              rating={special?.totalRating}
              starRatedColor='#febd69'
              starDimension='20px'
              starSpacing='2px'
            />
            <div className='price mt-2'>
              <span className='red-p'>
                ₹
                {((special?.price * special?.special?.offer) / 100)?.toFixed(2)}
              </span>
              &nbsp;
              <strike>₹{special?.price}</strike>
              <div className='discount-till d-flex align-items-center gap-10 mt-2'>
                <Timer deadline={special?.special?.specialTime} />
              </div>
              <div className='prod-count my-3'>
                <p>
                  Products :
                  {special?.quantity > 9
                    ? special?.quantity
                    : special?.quantity?.toString()?.padStart(2, '0')}
                </p>
                <div className='progress'>
                  <div
                    className='progress-bar'
                    role='progressbar'
                    style={{ width: `${special?.quantity}%`, height: '5px' }}
                    aria-valuenow={special?.quantity}
                    aria-valuemin='0'
                    aria-valuemax='100'
                  ></div>
                </div>
              </div>
              <Link to={`/product/${special?.slug}`} className='button'>
                Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialProduct;
