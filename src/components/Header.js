import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from './Loader/Loader';
import { clearErrors } from '../redux/actions/userActions';
import UserSettings from './UserSettings';

const Header = ({ setCategory }) => {
  const { isAuthenticated, error, user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const {
    loading,
    error: categoriesError,
    productCategories,
  } = useSelector((state) => state.productCategories);

  const dispatch = useDispatch();
  const ref = useRef(null);

  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [settings, setSettings] = useState(false);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/ourstore/${keyword}`);
    } else {
      navigate('/ourstore');
    }
  };

  const categoryHandler = (cate) => {
    navigate('/ourstore');
    setCategory(cate);
  };

  const userSettingHandler = useCallback((e) => {
    if (ref?.current && !ref?.current?.contains(e.target)) {
      setSettings(false);
    }
  }, []);

  const cartTotal =
    cart?.products &&
    cart?.products?.reduce((a, b) => a + b.price * b.count, 0);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    document.addEventListener('mousedown', userSettingHandler);

    if (categoriesError) {
      toast.error(categoriesError);
      dispatch(clearErrors());
    }
  }, [error, dispatch, categoriesError, userSettingHandler]);

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
              <form className='input-group' onSubmit={searchSubmitHandler}>
                <input
                  type='text'
                  className='form-control py-2'
                  placeholder='Search Product Here...'
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <span
                  className='input-group-text p-3'
                  id='basic-addon2'
                  onClick={searchSubmitHandler}
                >
                  <BsSearch className='fs-6' />
                </span>
              </form>
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
                  {!isAuthenticated ? (
                    <Link
                      to='/login'
                      className='d-flex align-items-center gap-10 text-white'
                    >
                      <img src='/assests/user.svg' alt='login' />
                      <p className='mb-0'>
                        Log in <br /> My Account
                      </p>
                    </Link>
                  ) : (
                    <>
                      <button
                        className='normal-btn d-flex align-items-center gap-10 text-white'
                        onClick={() => setSettings(!settings)}
                      >
                        <div>
                          <img
                            src='https://res.cloudinary.com/dukdn1bpp/image/upload/v1674883325/MERN-INVENTORY/nbqkarlgegbdyzomwadv.png'
                            alt='user'
                          />
                        </div>
                        <p
                          className='mb-0 text-capitalize'
                          style={{ color: '#FFFFFF' }}
                        >
                          {user?.firstname}
                        </p>
                      </button>
                      <div ref={ref}>
                        {settings && <UserSettings user={user} />}
                      </div>
                    </>
                  )}
                </div>
                <div>
                  <Link
                    to='/cart'
                    className='d-flex align-items-center gap-10 text-white'
                  >
                    <img src='/assests/cart.svg' alt='cart' />
                    <div className='d-flex flex-column'>
                      <span className='badge bg-white text-dark'>
                        {cart?.products
                          ? cart?.products?.length > 9
                            ? cart?.products?.length
                            : cart?.products?.length.toString().padStart(2, '0')
                          : ''}
                      </span>

                      <p className='mb-0'>
                        {cart?.products ? '₹' : ''}
                        {cartTotal?.toFixed(2)}
                      </p>
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
                      {productCategories &&
                        productCategories.map((category) => {
                          return (
                            <li key={category?.slug}>
                              {loading && <Spinner />}
                              <button
                                className='dropdown-item text-white text-capitalize'
                                onClick={() => categoryHandler(category?._id)}
                              >
                                {category?.title}
                              </button>
                            </li>
                          );
                        })}
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
