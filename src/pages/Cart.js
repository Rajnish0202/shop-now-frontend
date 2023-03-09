import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import MetaData from '../utils/MetaData';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Cart = () => {
  return (
    <>
      <MetaData title='Cart' />
      <BreadCrumb title='Cart' />
      <section className='cart-wrapper home-wrapper-2 p-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='d-flex justify-content-between align-items-center p-3 cart-header'>
                <h6 className='cart-col-1'>Product</h6>
                <h6 className='cart-col-2'>Price</h6>
                <h6 className='cart-col-3'>Quantity</h6>
                <h6 className='cart-col-4'>Total</h6>
              </div>
              <div className='cart-data d-flex justify-content-between align-items-center p-3'>
                <div className='cart-col-1 d-flex align-items-center gap-10'>
                  <div>
                    <img
                      src='/assests/acc.jpg'
                      alt='acc'
                      className='img-fluid'
                    />
                  </div>
                  <div>
                    <p className='mb-0'>
                      Kids Headphones Bulk 10 Pack Multi Colored For Stidents
                    </p>
                    <p className='mb-0'>Color: red</p>
                    <p className='mb-0'>Size: XL</p>
                  </div>
                </div>
                <div className='cart-col-2'>
                  <h5 className='mb-0'>₹1250.00</h5>
                </div>
                <div className='cart-col-3 d-flex align-items-center gap-15'>
                  <div>
                    <input
                      type='number'
                      className='form-control'
                      min={1}
                      defaultValue={1}
                    />
                  </div>
                  <div>
                    <button className='trash-btn normal-btn'>
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className='cart-col-4'>
                  <div>
                    <h5 className='mb-0'>₹1250.00</h5>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-12 py-2 mt-4 d-flex justify-content-between'>
              <div>
                <Link to='/ourstore' className='button'>
                  Continue To Shopping
                </Link>
              </div>

              <div className='d-flex justify-content-end flex-column align-items-end px-2'>
                <h4>Subtotal: ₹25412.00</h4>
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
