import React, { useEffect } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import MetaData from '../utils/MetaData';
import { FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '../components/Loader/Loader';
import { removeItemsFromCart, userCart } from '../redux/actions/cartAction';
import { toast } from 'react-toastify';
import { REMOVE_CART_ITEM_RESET } from '../redux/constants/cartConstants';

const Cart = () => {
  const { loading, cart } = useSelector((state) => state.cart);
  const { error, isDeleted } = useSelector((state) => state.addCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeItemHandler = (id) => {
    dispatch(removeItemsFromCart(id));
  };

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
  }, [dispatch, error, navigate, isDeleted]);

  return (
    <>
      <MetaData title='Cart' />
      <BreadCrumb title='Cart' />
      <section className='cart-wrapper home-wrapper-2 p-4'>
        {loading && <Spinner />}
        <div className='container-xxl'>
          <div className='row'>
            {cart?.products?.length >= 1 ? (
              <div className='col-12'>
                <div className='d-flex justify-content-between align-items-center p-3 cart-header'>
                  <h6 className='cart-col-1'>Product</h6>
                  <h6 className='cart-col-2'>Price</h6>
                  <h6 className='cart-col-3'>Quantity</h6>
                  <h6 className='cart-col-4'>Total</h6>
                </div>
                {cart?.products &&
                  cart?.products.map((product) => {
                    return (
                      <div
                        className='cart-data d-flex justify-content-between align-items-center p-3'
                        key={product?._id}
                      >
                        <div className='cart-col-1 d-flex align-items-center gap-10'>
                          <div>
                            <Link to={`/product/${product?.product?.slug}`}>
                              <img
                                src={product?.product?.images[0]?.url}
                                alt='acc'
                                style={{
                                  width: '5rem',
                                  objectFit: 'cover',
                                }}
                              />
                            </Link>
                          </div>
                          <div>
                            <p className='mb-0'>
                              {product?.product?.title} {product?._id}
                            </p>
                            <p className='mb-0 d-flex gap-5 align-items-center'>
                              Color:
                              <span
                                style={{
                                  display: 'inline-block',
                                  width: '15px',
                                  height: '15px',
                                  backgroundColor: `${product?.color?.hex}`,
                                  borderRadius: '100%',
                                }}
                              ></span>
                            </p>
                            {product?.size && (
                              <p className='mb-0'>
                                Size: {product?.size?.title}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className='cart-col-2'>
                          <h5 className='mb-0'>₹{product?.product?.price}</h5>
                        </div>
                        <div className='cart-col-3 d-flex align-items-center gap-15'>
                          <div>
                            <input
                              type='number'
                              className='form-control'
                              min={1}
                              value={product?.count}
                              readOnly
                            />
                          </div>
                          <div>
                            <button
                              className='trash-btn normal-btn'
                              onClick={() =>
                                removeItemHandler(product?.product?._id)
                              }
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                        <div className='cart-col-4'>
                          <div>
                            <h5 className='mb-0'>
                              ₹{' '}
                              {`${product?.product?.price}` *
                                `${product?.count}`}
                            </h5>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className='col-12 p-4'>
                <p className='text-center w-100' style={{ fontSize: '34px' }}>
                  Your Cart Is Empty
                </p>
              </div>
            )}

            <div className='col-12 py-2 mt-4 d-flex justify-content-between'>
              <div>
                <Link to='/ourstore' className='button'>
                  Continue To Shopping
                </Link>
              </div>

              <div className='d-flex justify-content-end flex-column align-items-end px-2'>
                <h4>Subtotal: ₹{cart.cartTotal}</h4>
                <p>Taxes and shipping calculated at checkout</p>
                <Link to='/checkout' className='button'>
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
