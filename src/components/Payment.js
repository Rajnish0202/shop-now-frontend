import React from 'react';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from '@stripe/react-stripe-js';

import { BsFillCreditCard2FrontFill } from 'react-icons/bs';
import { MdEventNote, MdVpnKey } from 'react-icons/md';

const Payment = ({
  submitHandler,
  totalPriceAfterDiscount,
  totalPrice,
  isApplied,
  payBtn,
  setPayStripe,
}) => {
  return (
    <>
      <div className='paymentContainer'>
        <form className='paymentForm' onSubmit={(e) => submitHandler(e)}>
          <h3>Card Info</h3>
          <div>
            <BsFillCreditCard2FrontFill />
            <CardNumberElement className='paymentInput' />
          </div>
          <div>
            <MdEventNote />
            <CardExpiryElement className='paymentInput' />
          </div>
          <div>
            <MdVpnKey />
            <CardCvcElement className='paymentInput' />
          </div>

          <div className='d-flex justify-content-between p-4'>
            <button className='button' onClick={() => setPayStripe(false)}>
              Cancel
            </button>
            <input
              type='submit'
              value={`Pay - ₹${
                isApplied ? totalPriceAfterDiscount : totalPrice
              }`}
              ref={payBtn}
              className='button'
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Payment;
