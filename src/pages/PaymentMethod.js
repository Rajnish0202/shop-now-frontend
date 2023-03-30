import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BreadCrumb from '../components/BreadCrumb';
import CheckoutWizard from '../components/CheckoutWizard/CheckoutWizard';
import { SAVE_PAYMENT_METHOD } from '../redux/constants/cartConstants';
import MetaData from '../utils/MetaData';

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      toast.error('Payment method is required');
    } else {
      dispatch({ type: SAVE_PAYMENT_METHOD, payload: paymentMethod });
      sessionStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
      navigate('/placeorder');
    }
  };

  return (
    <>
      <MetaData title='Payment Method' />
      <BreadCrumb title='Payment Method' />
      <div className=' home-wrapper-2 p-4'>
        <CheckoutWizard activeStep={2} />

        <form
          onSubmit={submitHandler}
          className='d-flex flex-column align-items-center justify-content-center'
        >
          <h3 className='text-center'>Payment Method</h3>
          <div
            className='p-4 d-flex flex-column align-items-center justify-content-center gap-15 w-25 mt-4 '
            style={{
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)',
              borderRadius: '10px',
            }}
          >
            {['Stripe', 'CashOnDelivery'].map((payment) => (
              <div
                key={payment}
                className='w-100 d-flex align-items-center gap-10'
              >
                <input
                  type='radio'
                  name='paymentMethod'
                  id={payment}
                  checked={paymentMethod === payment}
                  onChange={() => setPaymentMethod(payment)}
                  style={{ cursor: 'pointer' }}
                />

                <label htmlFor={payment} style={{ cursor: 'pointer' }}>
                  {payment}
                </label>
              </div>
            ))}
            <div className='d-flex gap-15 mt-2'>
              <Link to='/shipping' className='button'>
                Back
              </Link>
              <button
                className='button'
                type='submit'
                disabled={paymentMethod ? false : true}
              >
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default PaymentMethod;
