import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import BreadCrumb from '../components/BreadCrumb';
import { Spinner } from '../components/Loader/Loader';
import WishCard from '../components/WishCard';
import { clearErrors } from '../redux/actions/productActions';
import { loadUser } from '../redux/actions/userActions';
import {
  getAllWishlist,
  removeWishlist,
} from '../redux/actions/wishlistAction';
import { REMOVE_WISHLIST_RESET } from '../redux/constants/wishlistConstants';
import MetaData from '../utils/MetaData';

const Wishlist = () => {
  const { loading, error, wishlists } = useSelector(
    (state) => state.getAllWishlist
  );

  const { isRemoved, error: removeError } = useSelector(
    (state) => state.wishlistAction
  );

  const dispatch = useDispatch();

  const removeWishlistHandler = (productId) => {
    dispatch(removeWishlist(productId));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isRemoved) {
      toast.success('Product Removed From Wishlist');
      dispatch(loadUser());
      dispatch({ type: REMOVE_WISHLIST_RESET });
    }

    if (removeError) {
      toast.error(removeError);
      dispatch(clearErrors());
    }

    dispatch(getAllWishlist());
  }, [dispatch, error, isRemoved, removeError]);

  return (
    <>
      <MetaData title='Your Wishlist' />
      <BreadCrumb title='Your Wishlist' />
      <div className='wishlist-wrapper home-wrapper-2 p-4'>
        <div className='container-xxl'>
          {loading && <Spinner />}
          {wishlists && wishlists?.length === 0 ? (
            <div className='row'>
              <div className='col-12'>
                <h4>Empty Wishlist</h4>
                <p>You have no items in your wishlist. Start adding!</p>
              </div>
            </div>
          ) : (
            <div className='row'>
              {wishlists?.map((wish) => {
                return (
                  <WishCard
                    key={wish?._id}
                    wish={wish}
                    removeWishlistHandler={removeWishlistHandler}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
