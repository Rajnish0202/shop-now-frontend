import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { shortenText } from '../utils/ShortenText';
import { useDispatch } from 'react-redux';
import { addWishlist } from '../redux/actions/wishlistAction';
import { addItemsToCompare } from '../redux/actions/compareAction';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';

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
          <div
            className={`description mb-0 desc ${
              grid === 12 || grid === 6 ? 'd-block' : 'd-none'
            }`}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                grid === 6 || grid === 12
                  ? shortenText(product?.description, 450)
                  : product?.description
              ),
            }}
          ></div>
          {product?.special?.offer && (
            <div
              className={`d-flex align-items-center price ${
                grid === 3 ? 'gap-10' : 'gap-15'
              }`}
            >
              <p
                className='text-danger mb-0'
                style={{
                  fontSize: `${grid === 3 ? '12px' : '16px'}`,
                }}
              >
                -{product?.special?.offer}% off
              </p>
              <p
                className='mb-0 fw-bold'
                style={{
                  fontSize: `${grid === 3 ? '12px' : '16px'}`,
                }}
              >
                ₹{' '}
                {product?.price -
                  ((product?.price * product?.special?.offer) / 100).toFixed(2)}
              </p>
              <div
                style={{
                  fontSize: `${grid === 3 ? '12px' : '16px'}`,
                }}
              >
                {product?.special?.offer && (
                  <p
                    className='mb-0 text-dark fw-bold'
                    style={{ textDecoration: 'line-through' }}
                  >
                    ₹ {product?.price?.toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          )}
          {!product?.special?.offer && (
            <p
              className='price mb-0 fw-bold'
              style={{
                fontSize: `${grid === 3 ? '12px' : '16px'}`,
              }}
            >
              ₹ {product?.price?.toFixed(2)}
            </p>
          )}
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
