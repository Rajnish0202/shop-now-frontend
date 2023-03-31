import React from 'react';
import { Link } from 'react-router-dom';
import { shortenText } from '../utils/ShortenText';

const WishCard = ({ wish, removeWishlistHandler }) => {
  return (
    <div className='col-3'>
      <div className='wishlist-card position-relative'>
        <img
          src='assests/cross.svg'
          alt='cross'
          className='position-absolute cross img-fluid'
          onClick={() => removeWishlistHandler(wish?.wishId?._id)}
        />
        <Link to={`/product/${wish?.wishId?.slug}`}>
          <div className='wishlist-card-image w-100 mb-3'>
            <img
              src={wish?.wishId?.images[0]?.url}
              className='w-100 img-fluid'
              alt={wish?.wishId?.images[0]?.url}
            />
          </div>
          <h5 className='title' title={wish?.title}>
            {shortenText(wish?.wishId?.title, 24)}
          </h5>
          <h6 className='price'>₹{wish?.wishId?.price.toFixed(2)}</h6>
        </Link>
      </div>
    </div>
  );
};

export default WishCard;
