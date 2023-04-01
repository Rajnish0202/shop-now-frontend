import React, { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import BreadCrumb from '../components/BreadCrumb';
import ProductCard from '../components/ProductCard';
import MetaData from '../utils/MetaData';
import ReactImageZoom from 'react-image-zoom';
import Color from '../components/Color';
import { BsFillHeartFill, BsHeart, BsLink } from 'react-icons/bs';
import { TiArrowShuffle } from 'react-icons/ti';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  getRelatedProducts,
  productDetails,
  productRatings,
} from '../redux/actions/productActions';
import { shortenText } from '../utils/ShortenText';
import { capitalizeText } from '../utils/Capitalized';
import Loader, { Spinner, TextSpinner } from '../components/Loader/Loader';
import { addItemsToCart, userCart } from '../redux/actions/cartAction';
import { ADD_TO_CART_RESET } from '../redux/constants/cartConstants';
import { addWishlist, removeWishlist } from '../redux/actions/wishlistAction';
import {
  ADD_WISHLIST_RESET,
  REMOVE_WISHLIST_RESET,
} from '../redux/constants/wishlistConstants';
import { addItemsToCompare } from '../redux/actions/compareAction';
import { RATING_PRODUCT_RESET } from '../redux/constants/productConstants';
import { allUserOrders } from '../redux/actions/orderActions';

const SingleProduct = () => {
  const [toggleReview, setToggleReview] = useState(false);
  const [quantity, setQunatity] = useState(1);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [wishAdd, setWishAdd] = useState(false);
  const [compare, setCompare] = useState(false);
  const [star, setStar] = useState(0);
  const [comment, setComment] = useState('');

  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const { user } = useSelector((state) => state.user);

  const { error: addToCartError, isAdded } = useSelector(
    (state) => state.addCart
  );

  const {
    loading: relatedLoading,
    relatedProducts,
    productCounts: count,
  } = useSelector((state) => state.relatedProducts);

  const {
    error: wishError,
    isAdded: addWish,
    isRemoved,
  } = useSelector((state) => state.wishlistAction);

  const {
    error: ratingError,
    isRated,
    loading: ratingLoading,
  } = useSelector((state) => state.ratings);

  const { orders } = useSelector((state) => state.allOrders);

  const isExistsInUserOrders = orders?.map((order) =>
    order?.products.some((prod) => prod?.product?._id === product?._id)
  );
  console.log(isExistsInUserOrders);

  const [imageUrl, setImageUrl] = useState();

  const shareLink = window.location.href;

  const copyToClipboard = (text) => {
    // console.log('text', text);
    const textField = document.createElement('textarea');
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    toast.success('Copied!');
  };

  const props = {
    scale: 1.8,
    zoomWidth: 500,
    img: `${imageUrl ? imageUrl : product?.images && product?.images[0]?.url}`,
  };

  const addToCartHandler = () => {
    if (quantity > product?.quantity) {
      return toast.info('Reached to Max Stock');
    }

    if (!color || !size) {
      return toast.info('Please Select Color And Size');
    }

    dispatch(addItemsToCart(product?._id, quantity, color, size));
  };

  const addWishlistHandler = (productId) => {
    setWishAdd(!wishAdd);
    if (!wishAdd) {
      dispatch(addWishlist(productId));
      dispatch(productDetails(slug));
    } else {
      dispatch(removeWishlist(productId));
      dispatch(productDetails(slug));
    }
  };

  const addToCompareHandler = () => {
    dispatch(addItemsToCompare(slug));
    toast.success('Product added to compare');
  };

  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    setToggleReview(false);
    dispatch(productRatings(product?._id, star, comment));
  };

  useEffect(() => {
    if (slug) {
      dispatch(productDetails(slug));
    }

    if (toggleReview) {
      dispatch(allUserOrders());
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isAdded) {
      toast.success('Item Added To Cart');
      dispatch(userCart());
      navigate('/cart');

      dispatch({ type: ADD_TO_CART_RESET });
    }

    if (addWish) {
      toast.success('Wishlist is added.');
      dispatch({ type: ADD_WISHLIST_RESET });
    }

    if (isRemoved) {
      toast.success('Wishlist is removed.');
      dispatch({ type: REMOVE_WISHLIST_RESET });
    }

    if (isRated) {
      toast.success('Review Added');
      dispatch({ type: RATING_PRODUCT_RESET });
      dispatch(productDetails(slug));
    }

    if (ratingError) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (wishError) {
      toast.error(wishError);
      dispatch(clearErrors());
    }

    if (addToCartError) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (user?.wishlist?.some((wish) => wish?.wishId === product?._id)) {
      setWishAdd(true);
    }

    if (
      localStorage.getItem('compareItems') &&
      JSON.parse(localStorage.getItem('compareItems')).some(
        (compare) => compare?._id === product?._id
      )
    ) {
      setCompare(true);
    }

    dispatch(getRelatedProducts(product?._id, product?.category?._id));
  }, [
    dispatch,
    slug,
    imageUrl,
    product?.category?._id,
    product?._id,
    error,
    isAdded,
    navigate,
    addToCartError,
    wishError,
    addWish,
    isRemoved,
    user?.wishlist,
    isRated,
    ratingError,
    toggleReview,
  ]);

  return (
    <>
      <MetaData
        title={
          product?.title && capitalizeText(shortenText(product?.title, 24))
        }
      />
      <BreadCrumb
        title={
          product?.title && capitalizeText(shortenText(product?.title, 24))
        }
      />
      {loading && <Loader />}
      <div className='main-product-wrapper p-4 home-wrapper-2'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-6'>
              <div className='main-product-image'>
                <div>
                  <ReactImageZoom {...props} />
                </div>
              </div>

              <div className='other-product-images d-flex flex-wrap gap-15'>
                {product?.images &&
                  product?.images.map((img) => {
                    return (
                      <div
                        key={img?.public_id}
                        onClick={() => setImageUrl(img?.url)}
                      >
                        <img src={img?.url} alt={img?.url} />
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className='col-6'>
              <div className='main-product-details'>
                <div className='border-bottom'>
                  <h3 className='title'>{product?.title}</h3>
                </div>

                <div className='border-bottom'>
                  <p className='price'>₹{product?.price}</p>
                  <div className='d-flex  align-items-center gap-5'>
                    {product?.ratings && (
                      <StarRatings
                        rating={+product?.totalRating}
                        starRatedColor='#febd69'
                        starDimension='18px'
                        starSpacing='2px'
                      />
                    )}
                    <p className='mb-0 single-review'>
                      ({product?.ratings?.length}{' '}
                      {product?.ratings?.length > 1 ? 'Reviews' : 'Review'})
                    </p>
                  </div>
                  <div>
                    <a
                      href='#review'
                      className='text-decoration-underline'
                      onClick={() => setToggleReview(!toggleReview)}
                    >
                      Write a Review
                    </a>
                  </div>
                </div>

                <div className='pt-3'>
                  <div className='d-flex align-items-center gap-10 mb-2'>
                    <h6 className='product-heading'>Type :</h6>
                    <p className='product-data text-capitalize'>
                      {product?.type?.title}
                    </p>
                  </div>
                  <div className='d-flex align-items-center gap-10 my-2'>
                    <h6 className='product-heading'>Brand :</h6>
                    <p className='product-data text-capitalize'>
                      {product?.brand?.title}
                    </p>
                  </div>
                  <div className='d-flex align-items-center gap-10 my-2'>
                    <h6 className='product-heading'>Category :</h6>
                    <p className='product-data text-capitalize'>
                      {product?.category?.title}
                    </p>
                  </div>

                  {/* <div className='d-flex align-items-center gap-10 my-2'>
                    <h6 className='product-heading'>SKU :</h6>
                    <p className='product-data'>SKU1254</p>
                  </div> */}
                  <div className='d-flex align-items-center gap-10 my-2'>
                    <h6 className='product-heading'>Availabilty :</h6>
                    <p
                      className={`product-data fw-bold ${
                        product?.quantity > 1 ? 'text-success' : 'text-danger'
                      }`}
                    >
                      {product?.quantity > 1 ? 'In Stock' : 'Out Of Stock'}
                    </p>
                  </div>
                  {product?.sizes?.length > 0 && (
                    <div className='d-flex flex-column gap-5 my-2'>
                      <h6 className='product-heading'>Size :</h6>
                      <div className='d-flex flex-wrap gap-15 mt-2 mb-3'>
                        {product?.sizes.map((size) => {
                          return (
                            <span
                              className='badge border border-1 bg-white text-dark '
                              key={size?._id}
                              onClick={() => setSize(size?._id)}
                              style={{ cursor: 'pointer' }}
                            >
                              {size?.title}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  <div className='d-flex flex-column gap-10 mt-2 mb-3'>
                    <h6 className='product-heading'>Color :</h6>
                    {product?.color && (
                      <Color colors={product?.color} setColor={setColor} />
                    )}
                  </div>
                  <div className='d-flex flex-row align-items-center gap-10 mt-2 '>
                    <h6 className='product-heading'>Quantity :</h6>
                    <div>
                      <input
                        type='number'
                        style={{
                          width: '70px',
                          padding: '5px 10px',
                          textAlign: 'center',
                        }}
                        className='form-control'
                        min={1}
                        value={quantity}
                        onChange={(e) => setQunatity(e.target.value)}
                      />
                    </div>
                    <div>
                      {user ? (
                        <button
                          className='button mx-4'
                          onClick={() => addToCartHandler()}
                          disabled={product?.quantity <= 0}
                        >
                          Add To Cart
                        </button>
                      ) : (
                        <Link to='/login' className='px-4 text-danger fs-6'>
                          Please Login to Add Cart
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className='d-flex align-items-center gap-30 mt-3 '>
                    <div
                      className='additional-btns'
                      onClick={addWishlistHandler}
                    >
                      {wishAdd ? (
                        <BsFillHeartFill size={20} color={'#028a0f'} />
                      ) : (
                        <BsHeart
                          size={20}
                          style={{
                            cursor: 'pointer',
                          }}
                        />
                      )}

                      <button
                        className='normal-btn'
                        style={{
                          color: `${wishAdd ? '#028a0f' : 'initial'}`,
                        }}
                      >
                        Add To Wishlist
                      </button>
                    </div>
                    <div
                      className='additional-btns'
                      onClick={() => addToCompareHandler(product?.slug)}
                    >
                      <TiArrowShuffle
                        size={20}
                        style={{
                          cursor: 'pointer',
                          color: `${compare ? '#00BFFF' : 'initial'}`,
                        }}
                      />
                      <button
                        className='normal-btn'
                        style={{
                          color: `${compare ? '#00BFFF' : 'initial'}`,
                        }}
                      >
                        Add To Compare
                      </button>
                    </div>
                  </div>

                  <div className='accodion d-flex gap-10 align-items-center my-2'>
                    <MdOutlineLocalShipping size={20} />
                    <h6 className='product-heading'>Shipping & Returns :</h6>
                    <p className='product-data'>
                      Free shipping and returns available on all orders! <br />
                      We ship all US domestic orders within &nbsp;
                      <b> 5-10 business days!</b>
                    </p>
                  </div>
                  <div className='links d-flex gap-10 align-items-center my-2'>
                    <BsLink size={20} />
                    <button
                      className='normal-btn'
                      onClick={() => copyToClipboard(shareLink)}
                    >
                      <h6 className='product-heading'>Product Link</h6>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className='description-wrapper home-wrapper-2 p-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <h4>Description</h4>
              <div className=' bg-white p-3' style={{ borderRadius: '10px' }}>
                <p className='mb-0'>{product?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='reviews-wrapper home-wrapper-2 p-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <h4>Reviews</h4>
              <div className='review-inner-wrapper'>
                <div className='review-head d-flex justify-content-between align-items-center'>
                  <div>
                    <h4 className='mb-2'>Customer Reviews</h4>
                    <div className='d-flex align-items-center gap-10'>
                      {product?.ratings && (
                        <StarRatings
                          rating={product?.totalRating}
                          starRatedColor='#febd69'
                          starDimension='20px'
                          starSpacing='2px'
                        />
                      )}
                      <p className='mb-0' style={{ marginTop: '5px' }}>
                        Based on {product?.ratings?.length}{' '}
                        {product?.ratings?.length > 0 ? 'Review' : 'Reviews'}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button
                      className='text-decoration-underline'
                      onClick={() => setToggleReview(!toggleReview)}
                    >
                      Write a Review
                    </button>
                  </div>
                </div>
                {toggleReview && isExistsInUserOrders.includes(true) && (
                  <div className='review-form' id='review'>
                    <h4>Write a Review</h4>
                    <form
                      action=''
                      className='d-flex flex-column gap-15'
                      onSubmit={reviewSubmitHandler}
                    >
                      <div>
                        <StarRatings
                          rating={star}
                          starRatedColor='#febd69'
                          starDimension='20px'
                          starSpacing='2px'
                          numberOfStars={5}
                          starHoverColor='#febd69'
                          changeRating={(e) => setStar(e)}
                        />
                      </div>

                      <div>
                        <textarea
                          type='text'
                          className='form-control'
                          placeholder='Comment...'
                          rows='4'
                          cols='30'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </div>
                      <div className='d-flex justify-content-end'>
                        <button className='button' type='submit'>
                          {ratingLoading ? <TextSpinner /> : 'Submit Review'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                {toggleReview && !isExistsInUserOrders.includes(true) && (
                  <div className='review-form' id='review'>
                    <p className='mb-0 text-center fs-5 text-danger'>
                      You are not allowed to review before buy this product.
                    </p>
                  </div>
                )}
                <div className='reviews'>
                  {product?.ratings &&
                    product?.ratings.map((review) => {
                      return (
                        <div className='review' key={review?._id}>
                          <div className='d-flex gap-15 align-items-center'>
                            <h6 className='mb-0' style={{ marginTop: '5px' }}>
                              {review?.postedby?.firstname} &nbsp;
                              {review?.postedby?.lastname}
                            </h6>
                            <StarRatings
                              rating={review?.star}
                              starRatedColor='#febd69'
                              starDimension='20px'
                              starSpacing='2px'
                            />
                          </div>
                          <p className='p-1 mb-0'>{review?.comment}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='popular-wrapper home-wrapper-2 p-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              {relatedLoading && <Spinner />}
              <h3 className='section-heading'>
                Similar Products(
                {count > 10 ? count : count?.toString().padStart(2, '0')})
              </h3>
            </div>
            <div className='row'>
              {count === 0 && (
                <p className='text-center'>No Similar Product Found.</p>
              )}
              {relatedProducts &&
                relatedProducts.map((product) => {
                  return <ProductCard product={product} key={product._id} />;
                })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
