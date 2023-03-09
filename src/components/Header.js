import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import { BsSearch } from 'react-icons/bs';

const Header = () => {
  return (
    <>
      <header className='header-top-strip p-3'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-6'>
              <p className='text-white mb-0'>
                Free Shipping Over ₹200 & Free Returns
              </p>
            </div>
            <div className='col-6'>
              <p className='text-end text-white mb-0'>
                Hotline:{' '}
                <Link className='text-white' to='tel:+91 8960395782'>
                  +91 8960395782
                </Link>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className='header-upper p-3'>
        <div className='container-xxl'>
          <div className='row align-items-center'>
            <div className='col-2'>
              <Link to='/' className='text-white'>
                <h3>Shop-Now</h3>
              </Link>
            </div>
            <div className='col-5'>
              <div className='input-group'>
                <input
                  type='text'
                  className='form-control py-2'
                  placeholder='Search Product Here...'
                  aria-label='Search Product Here...'
                  aria-describedby='basic-addon2'
                />
                <span className='input-group-text p-3' id='basic-addon2'>
                  <BsSearch className='fs-6' />
                </span>
              </div>
            </div>
            <div className='col-5'>
              <div className='header-upper-links d-flex align-items-center justify-content-between'>
                <div>
                  <Link
                    to='/compare-product'
                    className='d-flex align-items-center gap-10 text-white'
                  >
                    <img src='/assests/compare.svg' alt='compare' />
                    <p className='mb-0'>
                      Compare <br /> Products
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to='/wishlist'
                    className='d-flex align-items-center gap-10 text-white'
                  >
                    <img src='/assests/wishlist.svg' alt='wishlist' />
                    <p className='mb-0'>
                      Favourite <br /> Wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to='/login'
                    className='d-flex align-items-center gap-10 text-white'
                  >
                    <img src='/assests/user.svg' alt='login' />
                    <p className='mb-0'>
                      Log in <br /> My Account
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to='/cart'
                    className='d-flex align-items-center gap-10 text-white'
                  >
                    <img src='/assests/cart.svg' alt='cart' />
                    <div className='d-flex flex-column'>
                      <span className='badge bg-white text-dark'>0</span>
                      <p className='mb-0'>₹ 5000</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className='header-bottom p-3'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div
                className='menu-bottom d-flex align-items-center gap-30
              '
              >
                <div>
                  <div className='dropdown'>
                    <button
                      className='btn btn-secondary dropdown-toggle bg-transparent border-0 me-5'
                      type='button'
                      id='dropdownMenuButton1'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                    >
                      <img
                        src='/assests/menu.svg'
                        alt='menu'
                        className='me-3'
                      />
                      <span className='m2-5 d-inline-block '>
                        Shop Categories
                      </span>
                    </button>
                    <ul
                      className='dropdown-menu'
                      aria-labelledby='dropdownMenuButton1'
                    >
                      <li>
                        <Link className='dropdown-item text-white' to='/'>
                          Action
                        </Link>
                      </li>
                      <li>
                        <Link className='dropdown-item text-white' to='/'>
                          Another action
                        </Link>
                      </li>
                      <li>
                        <Link className='dropdown-item text-white' to='/'>
                          Something else here
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='menu-links'>
                  <div className='d-flex align-items-center gap-15'>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/ourstore'>Our Store</NavLink>
                    <NavLink to='/blogs'>Blogs</NavLink>
                    <NavLink to='/contact'>Contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
