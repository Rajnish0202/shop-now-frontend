import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

const ProductCard = ({ grid }) => {
  const location = useLocation();

  return (
    <div
      className={`${
        location.pathname === '/ourstore' ? `gr-${grid}` : 'col-3'
      }`}
    >
      <Link to='/product/123' className='product-card position-relative'>
        <div className='wishlist-icon position-absolute'>
          <button>
            <img src='/assests/wish.svg' alt='wishlist' />
          </button>
        </div>
        <div className='product-image'>
          <img src='/assests/watch.jpg' alt='watch' />
          <img src='/assests/watch-1.jpg' alt='watch-1' />
        </div>
        <div className='product-details'>
          <h6 className='brand'>Havels</h6>
          <h5 className='title'>
            Kids headphones 10 pack multi colored for students
          </h5>
          <StarRatings
            rating={4}
            starRatedColor='#febd69'
            starDimension='20px'
            starSpacing='2px'
          />
          <p
            className={`description mb-0 ${
              grid === 12 || grid === 6 ? 'd-block' : 'd-none'
            }`}
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati
            corrupti nam dolores odio, fuga iusto fugit delectus necessitatibus
            quisquam qui error eaque id officiis magni laborum aliquid facere
            voluptate minima.
          </p>
          <p className='price'>₹1209.00</p>
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
