import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { shortenText } from '../utils/ShortenText';

const ProductCard = ({ grid, product }) => {
  const location = useLocation();

  return (
    <div
      className={`${
        location.pathname === '/ourstore' ? `gr-${grid}` : 'col-3'
      }`}
    >
      <Link
        to={`/product/${product?.slug}`}
        className='product-card position-relative'
      >
        <div className='wishlist-icon position-absolute'>
          <button>
            <img src='/assests/wish.svg' alt='wishlist' />
          </button>
        </div>
        <div className='product-image'>
          <img src={product?.images[0]?.url} alt={product?.slug} />
          <img src={product?.images[1]?.url} alt={product?.slug} />
        </div>
        <div className='product-details'>
          <h6 className='brand'>{product?.brand?.title}</h6>
          <h5 className='title' title={product?.title}>
            {grid && grid >= 6
              ? product?.title
              : grid && grid < 6 && grid && grid > 3
              ? shortenText(product?.title, 30)
              : shortenText(product?.title, 18)}
          </h5>
          <StarRatings
            rating={+product?.totalRating}
            starRatedColor='#febd69'
            starDimension='20px'
            starSpacing='2px'
          />
          <p
            className={`description mb-0 ${
              grid === 12 || grid === 6 ? 'd-block' : 'd-none'
            }`}
          >
            {product?.description}
          </p>
          <p className='price'>₹{product?.price}</p>
        </div>
        <div className='action-bar position-absolute'>
          <div className='d-flex flex-column gap-15'>
            <button to=''>
              <img src='/assests/prodcompare.svg' alt='compare' />
            </button>
            <button to=''>
              <img src='/assests/view.svg' alt='view' />
            </button>

            <button to=''>
              <img src='/assests/add-cart.svg' alt='cart' />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
