import React from 'react';
import Color from './Color';
import { shortenText } from '../utils/ShortenText';

const CompareCard = ({ compare, removeFromCompare }) => {
  return (
    <div className='col-3 '>
      <div className='compare-product-card position-relative'>
        <img
          src='assests/cross.svg'
          alt='cross'
          className='position-absolute cross img-fluid'
          onClick={() => removeFromCompare(compare?._id)}
        />
        <div className='product-card-image'>
          <img
            src={compare?.images?.[0]?.url}
            alt={compare?.images?.[0]?.url}
            className='img-fluid'
          />
          <div className='compare-product-details'>
            <h5 className='title' title={compare?.title}>
              {shortenText(compare?.title, 30)}
            </h5>
            <h6 className='price'>₹{compare?.price?.toFixed(2)}</h6>
            <div>
              <div className='product-detail'>
                <h5>Brand:</h5>
                <p>{compare?.brand?.title}</p>
              </div>
              <div className='product-detail'>
                <h5>Type:</h5>
                <p>{compare?.type?.title}</p>
              </div>
              <div className='product-detail'>
                <h5>Category:</h5>
                <p>{compare?.category?.title}</p>
              </div>
              <div className='product-detail'>
                <h5>Availability:</h5>
                <p
                  style={{
                    color: `${compare?.quantity >= 1 ? '#028a0f' : '#ff2400'}`,
                  }}
                >
                  {compare?.quantity >= 1 ? 'In Stock' : 'Out Stock'}
                </p>
              </div>
              <div className='product-detail'>
                <h5>Color:</h5>
                <div>
                  <Color colors={compare?.color} />
                </div>
              </div>
              <div className='product-detail'>
                <h5>Size:</h5>
                <div className='d-flex align-items-center gap-10'>
                  {compare?.sizes &&
                    compare?.sizes?.map((size) => {
                      return <p key={size?._id}>{size?.title}</p>;
                    })}
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
