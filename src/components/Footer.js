import React from 'react';
import { BsFacebook, BsGithub, BsInstagram, BsLinkedin } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Footer = ({ setCategory }) => {
  const { quickCategories } = useSelector((state) => state.quickCategories);
  return (
    <>
      <footer className='p-3 py-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-5'>
              <div className='footer-top-data d-flex gap-30 align-items-center'>
                <img src='/assests/newsletter.png' alt='newsletter' />
                <h2 className='mb-0 text-white'>Sign Up for Newsletter </h2>
              </div>
            </div>
            <div className='col-7'>
              <div className='input-group'>
                <input
                  type='text'
                  className='form-control py-1'
                  placeholder='Your Email Address'
                  aria-label='Your Email Address'
                  aria-describedby='basic-addon2'
                />
                <span className='input-group-text p-2' id='basic-addon2'>
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className='p-3 py-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-4'>
              <h4 className='text-white mb-4'>Contact Us</h4>
              <div className='d-flex flex-column'>
                <address className='text-white fs-6'>
                  H.No. 587A/312/4 Gandhi Nagar, <br /> Telibagh, Raibareli
                  Road, <br /> Lucknow, U.P, India - 226002{' '}
                </address>
                <Link
                  to='tel:+91 8960395782'
                  className='mt-2 d-block mb-2 text-white'
                >
                  +91 8960395782
                </Link>
                <Link
                  to='mailto:rajnish.0202kumar@gmail.com'
                  className='mt-2 d-block mb-2 text-white'
                >
                  rajnish.0202kumar@gmail.com
                </Link>
                <div className='social_icons d-flex align-items-center gap-30 mt-2'>
                  <Link to='' className='text-white'>
                    <BsLinkedin size={25} />
                  </Link>
                  <Link to='' className='text-white'>
                    <BsGithub size={25} />
                  </Link>
                  <Link to='' className='text-white'>
                    <BsInstagram size={25} />
                  </Link>
                  <Link to='' className='text-white'>
                    <BsFacebook size={25} />
                  </Link>
                </div>
              </div>
            </div>
            <div className='col-3'>
              <h4 className='text-white mb-4'>Information</h4>
              <div className='d-flex flex-column'>
                <Link to='/privacy-policy' className='text-white py-2 mb-1'>
                  Privacy Policy
                </Link>
                <Link to='/refund-policy' className='text-white py-2 mb-1'>
                  Refund Policy
                </Link>
                <Link to='/shipping-policy' className='text-white py-2 mb-1'>
                  Shipping Policy
                </Link>
                <Link to='/termsandconditions' className='text-white py-2 mb-1'>
                  Terms Of Service
                </Link>
                <Link to='/blogs' className='text-white py-2 mb-1'>
                  Blogs
                </Link>
              </div>
            </div>
            <div className='col-3'>
              <h4 className='text-white mb-4'>Account</h4>
              <div className='d-flex flex-column'>
                <a href='#search' className='text-white py-2 mb-1'>
                  Search
                </a>
                <Link to='about-us' className='text-white py-2 mb-1'>
                  About Us
                </Link>
                <Link to='faq' className='text-white py-2 mb-1'>
                  Faq
                </Link>
                <Link to='contact' className='text-white py-2 mb-1'>
                  Contact
                </Link>
                <Link to='size-chart' className='text-white py-2 mb-1'>
                  Size Chart
                </Link>
              </div>
            </div>
            <div className='col-2'>
              <h4 className='text-white mb-4'>Quick Links</h4>
              <div className='footer-links d-flex flex-column '>
                {quickCategories &&
                  quickCategories.map((quick) => {
                    return (
                      <Link
                        key={quick?._id}
                        to='/ourstore'
                        className='normal-btn text-white py-2 mb-1 text-capitalize text-start'
                        onClick={() => setCategory(quick?._id)}
                      >
                        {quick?.title}
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className='p-3 py-2'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <p className='text-center text-white mb-0'>
                &copy; {new Date().getFullYear()} : Powered by Shop-Now
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
