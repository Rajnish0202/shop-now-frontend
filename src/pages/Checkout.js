import React from 'react';
import { Link } from 'react-router-dom';
import BreadCrumb from '../components/BreadCrumb';
import MetaData from '../utils/MetaData';

const Checkout = () => {
  return (
    <>
      <MetaData title='Checkout' />
      <BreadCrumb title='Checkout' />
      <div className='checkout-wrapper home-wrapper-2 p-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-7'>
              <div className='checkout-left-data'>
                <h3 className='website-name'>ShopNow</h3>
                <nav
                  style={{
                    '--bs-breadcrumb-divider':
                      "url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E&#34;);",
                  }}
                  aria-label='breadcrumb'
                >
                  <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                      <Link to='/cart'>Cart</Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                      <Link to='/checkout'>Information</Link>
                    </li>
                    <li className='breadcrumb-item'>
                      <Link to='/shipping'>Shipping</Link>
                    </li>
                    <li className='breadcrumb-item'>
                      <Link to='/payment'>Payment</Link>
                    </li>
                  </ol>
                </nav>
                <h2 className='title fs-4'>Contact Information</h2>
                <p className='user-details'>
                  rajnish Kumar (rajnish.0202kumar@gmail.com)
                </p>
                <h4 className='mb-3'>Shipping Address</h4>
                <form
                  action=''
                  className='d-flex gap-15 justify-content-between flex-wrap'
                >
                  <div className='w-100'>
                    <select
                      name=''
                      className='form-control form-select'
                      id=''
                      defaultValue='Select Country'
                    >
                      <option value='Select Country' disabled>
                        Select Country
                      </option>
                    </select>
                  </div>
                  <div className='flex-grow-1'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='First Name'
                    />
                  </div>
                  <div className='flex-grow-1'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Last Name'
                    />
                  </div>
                  <div className='w-100'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Address'
                    />
                  </div>
                  <div className='w-100'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Apartment,Suite,etc.'
                    />
                  </div>
                  <div className='flex-grow-1'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='City'
                    />
                  </div>
                  <div className='flex-grow-1'>
                    <select
                      name=''
                      className='form-control form-select'
                      id=''
                      defaultValue='Select State'
                    >
                      <option value='Select State' disabled>
                        Select State
                      </option>
                    </select>
                  </div>
                  <div className='flex-grow-1'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='ZipCode'
                    />
                  </div>
                  <div className='w-100'>
                    <div className='d-flex justify-content-between align-items-center'>
                      <Link to='/cart' className='text-dark'>
                        &lsaquo; Return To Cart
                      </Link>
                      <Link to='/shipping' className='button'>
                        Continue To Shipping
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className='col-5'>
              <div className='border-bottom py-4'>
                <div className='d-flex align-items-center gap-10'>
                  <div className='w-75 d-flex align-items-center gap-10 '>
                    <div className='w-25 position-relative'>
                      <span className='badge bg-secondary text-white rounded-circle p-2 position-absolute'>
                        1
                      </span>
                      <img
                        src='/assests/acc.jpg'
                        className='img-fluid'
                        alt='acc'
                      />
                    </div>
                    <div>
                      <h5 className='title'>
                        Kids Headphones Bulk 10 Pack Multi Colored For Stidents
                      </h5>
                    </div>
                  </div>
                  <div className='flex-grow-1 check-total'>
                    <h5>₹ 1520.00</h5>
                  </div>
                </div>
              </div>
              <div className='border-bottom py-4'>
                <div className='d-flex justify-content-between align-items-center'>
                  <p className='subtotal'>Subtotal</p>
                  <p className='subtotal'>₹ 15252.00</p>
                </div>

                <div className='d-flex justify-content-between align-items-center'>
                  <p className='mb-0 subtotal'>Shipping</p>
                  <p className='mb-0 subtotal'>₹ 15.00</p>
                </div>
              </div>
              <div className='d-flex justify-content-between align-items-center border-bottom py-4'>
                <h4 className='title text-dark fs-5'>Total</h4>
                <h5 className='fs-4'>₹ 15252.00</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
