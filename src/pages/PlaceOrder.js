import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import BreadCrumb from '../components/BreadCrumb';
import CheckoutWizard from '../components/CheckoutWizard/CheckoutWizard';
import {
  clearErrors,
  getAllCoupons,
  getSingleCoupon,
} from '../redux/actions/couponActions';
import MetaData from '../utils/MetaData';
import moment from 'moment';
import { toast } from 'react-toastify';
import { createOrder } from '../redux/actions/orderActions';
import { shortenText } from '../utils/ShortenText';
import {
  CardNumberElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { BACKEND_URL } from '../utils/backendUrl';
import Payment from '../components/Payment';
import { CREATE_ORDER_RESET } from '../redux/constants/orderConstants';
import { TextSpinner } from '../components/Loader/Loader';
import { emptyCart, userCart } from '../redux/actions/cartAction';

const PlaceOrder = () => {
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showCoupon, setShowCoupon] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [payStripe, setPayStripe] = useState(false);

  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { coupons } = useSelector((state) => state.allCoupon);
  const { singleCoupon } = useSelector((state) => state.singleCoupon);

  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const {
    orderPlaced,
    error: orderError,
    loading,
  } = useSelector((state) => state.newOrder);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const cartTotal = cart?.products
    ? cart?.products?.reduce((a, b) => a + b.price * b.count, 0)
    : 0;
  const shippingPrice = cartTotal > 200 ? 0 : 45;
  const taxPrice = round2(cartTotal * 0.18);
  const totalPrice = cartTotal + shippingPrice + taxPrice;
  let totalAfterDiscount = 0;

  const applyCouponHandler = (id) => {
    dispatch(getSingleCoupon(id));
    setIsApplied(true);
  };

  if (isApplied) {
    totalAfterDiscount = round2(
      cartTotal - (cartTotal * singleCoupon?.discount) / 100
    );
  }

  const totalPriceAfterDiscount = round2(
    totalAfterDiscount + shippingPrice + taxPrice
  );

  const paymentData = {
    amount: isApplied ? totalPriceAfterDiscount * 100 : +totalPrice * 100,
  };

  const name = `${user?.firstname}${user?.lastname}`;

  const paymentHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${BACKEND_URL}/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: name,
            email: user?.email,
            address: {
              line1: shippingAddress?.street,
              city: shippingAddress?.city,
              state: shippingAddress?.state,
              postal_code: shippingAddress?.pinCode,
              country: shippingAddress?.country,
            },
          },
        },
      });

      let paymentInfo = {};

      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message);
        console.log(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(
            createOrder(
              paymentMethod,
              isApplied,
              shippingAddress,
              taxPrice,
              shippingPrice,
              cartTotal,
              totalAfterDiscount,
              paymentInfo
            )
          );
        } else {
          toast.error("There's some issue while processing payyment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  const placeOrderHandler = () => {
    dispatch(
      createOrder(
        paymentMethod,
        isApplied,
        shippingAddress,
        taxPrice,
        shippingPrice,
        cartTotal,
        totalAfterDiscount
      )
    );
  };

  useEffect(() => {
    if (!shippingAddress) {
      setShippingAddress(JSON.parse(localStorage.getItem('shippingAddress')));
    }

    if (!paymentMethod) {
      setPaymentMethod(JSON.parse(sessionStorage.getItem('paymentMethod')));
    }

    if (orderPlaced) {
      toast.success('Your Order Placed Successfully.');
      dispatch(emptyCart());
      dispatch(userCart());
      navigate('/order-success');
      dispatch({ type: CREATE_ORDER_RESET });
    }

    if (orderError) {
      toast.error(orderError);
      dispatch(clearErrors());
    }

    dispatch(getAllCoupons());
  }, [
    shippingAddress,
    paymentMethod,
    dispatch,
    orderPlaced,
    navigate,
    orderError,
  ]);

  return (
    <>
      <MetaData title='Place Order' />
      <BreadCrumb title='Place Order' />
      <div className=' home-wrapper-2 p-4'>
        <CheckoutWizard activeStep={3} />
        <h4 className='text-center'>Place Order</h4>
        <div className='container-xxl col-12 d-flex gap-10'>
          <div className='my-2 col-9 d-flex flex-column gap-30'>
            <div
              className='p-4'
              style={{
                boxShadow: '0 0 10px rgba(0,0,0,0.25)',
                borderRadius: '10px',
              }}
            >
              <h5 className='fw-bolder'>Shipping Address</h5>
              <p className='mb-0'>
                {shippingAddress.street},&nbsp;{shippingAddress.city},&nbsp;
                {shippingAddress.state},&nbsp;{shippingAddress.country} - &nbsp;
                {shippingAddress.pinCode},
              </p>
              <div className='mt-2 d-flex align-items-center gap-10 '>
                <p className='fw-bold mb-0'>Mobile : </p>
                <p className='mb-0'>{shippingAddress.phoneNo}</p>
              </div>
            </div>
            <div
              className='p-4'
              style={{
                boxShadow: '0 0 10px rgba(0,0,0,0.25)',
                borderRadius: '10px',
              }}
            >
              <h5 className='fw-bolder'>Payment Method</h5>
              <p className='mb-0' style={{ fontWeight: '500' }}>
                {paymentMethod}
              </p>
            </div>
            <div
              className='p-4'
              style={{
                boxShadow: '0 0 10px rgba(0,0,0,0.25)',
                borderRadius: '10px',
              }}
            >
              <h5 className='fw-bolder'>Order Items</h5>
              <table className='table'>
                <thead>
                  <tr>
                    <th className='text-start'>Item</th>
                    <th className='text-start'>Title</th>
                    <th className='text-center'>Qunatity</th>
                    <th className='text-end'>Price</th>
                  </tr>
                </thead>

                <tbody>
                  {cart?.products?.map((item) => {
                    return (
                      <tr style={{ verticalAlign: 'middle' }} key={item?._id}>
                        <td>
                          <Link href={`/product/${item?.product?.slug}`}>
                            <img
                              src={item?.product?.images[0]?.url}
                              alt={item?.product?.images[0]?.url}
                              width={80}
                              height={80}
                            />
                          </Link>
                        </td>
                        <td>
                          <Link href={`/product/${item?.product?.slug}`}>
                            <p
                              className='mb-0 text-dark'
                              title={item?.product?.title}
                            >
                              {shortenText(item?.product?.title, 50)}
                            </p>
                          </Link>
                          {item?.size && (
                            <p className='mb-0'>Size: {item?.size?.title}</p>
                          )}
                          {item?.color && (
                            <p className='mb-0 d-flex gap-5 align-items-center'>
                              Color:
                              <span
                                style={{
                                  display: 'inline-block',
                                  width: '15px',
                                  height: '15px',
                                  backgroundColor: `${item?.color?.hex}`,
                                  borderRadius: '100%',
                                }}
                              ></span>
                            </p>
                          )}
                        </td>
                        <td>
                          <p className='mb-0 text-center'>{item?.count}</p>
                        </td>
                        <td>
                          <p className='mb-0 text-end'>
                            ₹ {item?.price?.toFixed(2)}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div
            className='col-3 my-2'
            style={{
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)',
              borderRadius: '10px',
            }}
          >
            <ul className='p-4'>
              <li>
                <div>
                  <h4>Order Summary</h4>
                  <div className='d-flex align-items-center justify-content-between my-2'>
                    <p
                      className='fw-bold mb-0'
                      style={{
                        textDecoration: `${
                          totalAfterDiscount ? 'line-through' : 'none'
                        }`,
                      }}
                    >
                      Items:
                    </p>
                    <p
                      className='mb-0'
                      style={{
                        textDecoration: `${
                          totalAfterDiscount ? 'line-through' : 'none'
                        }`,
                      }}
                    >
                      ₹{cartTotal?.toFixed(2)}
                    </p>
                  </div>
                  {totalAfterDiscount ? (
                    <div className='d-flex align-items-center justify-content-between my-2'>
                      <p className='fw-bold mb-0'>After Discount:</p>
                      <p className='mb-0'>₹{totalAfterDiscount?.toFixed(2)}</p>
                    </div>
                  ) : (
                    ''
                  )}
                  <div className='d-flex align-items-center justify-content-between my-2'>
                    <p className='fw-bold mb-0'>Tax:</p>
                    <p className='mb-0'>₹{taxPrice?.toFixed(2)}</p>
                  </div>
                  <div className='d-flex align-items-center justify-content-between my-2'>
                    <p className='fw-bold mb-0'>Shipping:</p>
                    <p className='mb-0'>₹{shippingPrice?.toFixed(2)}</p>
                  </div>
                  <div className='d-flex align-items-center justify-content-between border-top border-2 mt-2 py-2'>
                    <p
                      className='fw-bold mb-0'
                      style={{
                        textDecoration: `${
                          totalAfterDiscount ? 'line-through' : 'none'
                        }`,
                      }}
                    >
                      Total:
                    </p>
                    <p
                      className='mb-0'
                      style={{
                        textDecoration: `${
                          totalAfterDiscount ? 'line-through' : 'none'
                        }`,
                      }}
                    >
                      ₹{totalPrice?.toFixed(2)}
                    </p>
                  </div>
                  {totalAfterDiscount > 1 && (
                    <div className='d-flex align-items-center justify-content-between border-top border-2 py-2'>
                      <p className='fw-bold mb-0'>Total After Discount:</p>
                      <p className='mb-0'>
                        ₹{totalPriceAfterDiscount?.toFixed(2)}
                      </p>
                    </div>
                  )}
                  {coupons?.filter((expire) => expire?.exipry >= Date.now())
                    .length > 0 && (
                    <div className='d-flex flex-column'>
                      <div
                        className='border-bottom border-top py-2 border-2'
                        style={{ cursor: 'pointer' }}
                        onClick={() => setShowCoupon(!showCoupon)}
                      >
                        <div className='fw-bold mb-0 d-flex align-items-center justify-content-between'>
                          <p className='mb-0'>Apply Coupon</p>
                          <p
                            className='mb-0 text-black-50'
                            style={{ fontSize: '12px' }}
                          >
                            Show
                          </p>
                        </div>
                      </div>
                      {showCoupon &&
                        totalPrice &&
                        totalPrice > 1000 &&
                        coupons
                          ?.filter((expire) => expire?.expiry >= Date.now())
                          .map((coupon) => {
                            return (
                              <div
                                className='mb-2 border-bottom border-2'
                                key={coupon?._id}
                              >
                                <div
                                  className='border-bottom py-2 border-2'
                                  style={{ cursor: 'pointer' }}
                                  onClick={() =>
                                    applyCouponHandler(coupon?._id)
                                  }
                                >
                                  <p
                                    className='mb-1 fw-bold w-100 text-center'
                                    style={{ fontSize: '14px' }}
                                  >
                                    {coupon.name}
                                  </p>
                                  <p
                                    className='mb-0 d-flex align-items-center gap-10 fw-bold'
                                    style={{ fontSize: '12px' }}
                                  >
                                    Discount:
                                    <code className='text-success mb-0'>
                                      {coupon.discount}%
                                    </code>
                                  </p>
                                  <p
                                    className='mb-0 d-flex align-items-center gap-10 fw-bold'
                                    style={{ fontSize: '12px' }}
                                  >
                                    Expiry:
                                    <code className='text-danger mb-0'>
                                      {moment(coupon.expiry).format(
                                        'DD MMMM YYYY'
                                      )}
                                    </code>
                                  </p>
                                </div>
                                <button
                                  className='normal-btn text-danger py-2'
                                  onClick={() => setIsApplied(false)}
                                >
                                  Remove
                                </button>
                              </div>
                            );
                          })}
                    </div>
                  )}
                </div>
              </li>
              <li>
                {paymentMethod === 'CashOnDelivery' ? (
                  <button
                    onClick={placeOrderHandler}
                    className='button w-100 mt-2'
                  >
                    {loading ? <TextSpinner /> : 'Place Order'}
                  </button>
                ) : (
                  <button
                    onClick={() => setPayStripe(true)}
                    className='button w-100 mt-2'
                  >
                    {loading ? <TextSpinner /> : 'Place Order'}
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
        {payStripe && (
          <div className='stripe-payment'>
            <Payment
              submitHandler={paymentHandler}
              totalPriceAfterDiscount={totalPriceAfterDiscount}
              totalPrice={totalPrice}
              isApplied={isApplied}
              payBtn={payBtn}
              setPayStripe={setPayStripe}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default PlaceOrder;
