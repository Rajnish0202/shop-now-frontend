import React, { useEffect } from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import MetaData from '../../utils/MetaData';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, TextSpinner } from '../../components/Loader/Loader';
import { emptyCart, userCart } from '../../redux/actions/cartAction';
import { toast } from 'react-toastify';
import {
  REMOVE_ALL_CART_ITEM_RESET,
  REMOVE_CART_ITEM_RESET,
} from '../../redux/constants/cartConstants';
import CartCard from '../../components/CartCard';

const Cart = () => {
  const { loading, cart } = useSelector((state) => state.cart);
  const {
    error,
    isDeleted,
    isEmpty,
    message,
    loading: loadingAdd,
  } = useSelector((state) => state.addCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearCartHandler = () => {
    dispatch(emptyCart());
  };

  const cartTotal = cart?.products
    ? cart?.products?.reduce((a, b) => a + b.price * b.count, 0)
    : 0;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (isDeleted) {
      toast.success('Item removed from cart.');
      dispatch(userCart());
      navigate('/cart');

      dispatch({ type: REMOVE_CART_ITEM_RESET });
    }

    if (isEmpty) {
      toast.success(message);
      dispatch(userCart());
      navigate('/cart');
      dispatch({ type: REMOVE_ALL_CART_ITEM_RESET });
    }
  }, [dispatch, error, navigate, isDeleted, isEmpty, message]);

  return (
    <>
      <MetaData title='Cart' />
      <BreadCrumb title='Cart' />
      <section className='cart-wrapper home-wrapper-2 p-4'>
        {loading && <Spinner />}
        <div className='container-xxl'>
          <div className='row'>
            {cart?.products?.length >= 1 ? (
              <>
                <div className='col-12'>
                  <div className='d-flex justify-content-between align-items-center p-3 cart-header'>
                    <h6 className='cart-col-1'>Product</h6>
                    <h6 className='cart-col-2'>Price</h6>
                    <h6 className='cart-col-3 text-center'>Quantity</h6>
                    <h6 className='cart-col-4'>Total</h6>
                  </div>
                  {cart?.products &&
                    cart?.products.map((product) => {
                      return (
                        <CartCard
                          product={product}
                          key={product?.product?._id}
                        />
                      );
                    })}

                  <div className='mt-4'>
                    <button
                      style={{
                        padding: '10px',
                        background: '#c34a2c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        letterSpacing: '1px',
                        fontSize: '14px',
                      }}
                      onClick={clearCartHandler}
                    >
                      {loadingAdd ? <TextSpinner /> : 'Clear Cart'}
                    </button>
                  </div>
                </div>
                <div className='col-12 py-2 mt-4 d-flex justify-content-between'>
                  <div>
                    <Link to='/ourstore' className='button'>
                      Continue To Shopping
                    </Link>
                  </div>

                  <div className='d-flex justify-content-end flex-column align-items-end px-2'>
                    <h4>Subtotal: ₹{cartTotal.toFixed(2)}</h4>
                    <p>Taxes and shipping calculated at checkout</p>
                    <Link to='/shipping' className='button'>
                      Checkout
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <div
                className='col-12 d-flex flex-column align-items-center justify-content-center'
                style={{ height: '15rem' }}
              >
                <h4>Empty Cart</h4>
                <p>You have no items in your cart. Start adding!</p>
                <div className='d-flex justify-content-center py-2'>
                  <Link to='/ourstore' className='button'>
                    Continue To Shopping
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
