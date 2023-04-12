import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { shortenText } from '../utils/ShortenText';
import { useDispatch } from 'react-redux';
import { addWishlist } from '../redux/actions/wishlistAction';
import { addItemsToCompare } from '../redux/actions/compareAction';
import { toast } from 'react-toastify';

const ProductCard = ({ grid, product }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const compareHandler = (slug) => {
    dispatch(addItemsToCompare(slug));
    toast.success('Added to compare list.');
  };
  const wishHandler = (id) => {
    dispatch(addWishlist(id));
  };
  const viewHandler = (slug) => {
    navigate(`/product/${slug}`);
  };

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
          <button onClick={() => wishHandler(product?._id)}>
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
            {grid && grid > 6
              ? shortenText(product?.title, 50)
              : grid && grid <= 6 && grid && grid > 3
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
            {grid === 6 || grid === 12
              ? shortenText(product?.description, 450)
              : product?.description}
          </p>
          <p className='price'>₹{product?.price}</p>
        </div>
        <div className='action-bar position-absolute'>
          <div className='d-flex flex-column gap-15'>
            <button onClick={() => compareHandler(product?.slug)}>
              <img src='/assests/prodcompare.svg' alt='compare' />
            </button>
            <button onClick={() => viewHandler(product?.slug)}>
              <img src='/assests/view.svg' alt='view' />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
