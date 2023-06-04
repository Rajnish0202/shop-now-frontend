/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import MetaData from '../../utils/MetaData';
import { IoCall, IoHome, IoInformationCircle, IoMail } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <>
      <MetaData title='Contact Us' />
      <BreadCrumb title='Contact Us' />
      <div className='contact-wrapper p-4 home-wrapper-2'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7123.74667978029!2d80.9438004!3d26.780307100000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1677916156048!5m2!1sen!2sin'
                width='600'
                height='450'
                className='border-0 w-100'
                loading='lazy'
              ></iframe>
            </div>
            <div className='col-12 mt-5'>
              <div className='contact-inner-wrapper d-flex jusrify-content-between'>
                <div>
                  <h3 className='contact-title'>Contact</h3>
                  <form action='' className='d-flex flex-column gap-15'>
                    <div>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Name'
                      />
                    </div>
                    <div>
                      <input
                        type='email'
                        className='form-control'
                        placeholder='Email'
                      />
                    </div>
                    <div>
                      <input
                        type='tel'
                        className='form-control'
                        placeholder='Mobile Number'
                      />
                    </div>
                    <div>
                      <textarea
                        type='text'
                        className='form-control'
                        placeholder='Comment...'
                        rows='4'
                        cols='30'
                      ></textarea>
                    </div>
                    <div>
                      <button className='button' type='submit'>
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
                <div>
                  <h3 className='contact-title'>Get In Touch with us</h3>
                  <div>
                    <ul className='ps-0'>
                      <li>
                        <IoHome />
                        <address className='mb-0'>
                          H.No: 587A/312/4 Gandhi Nagar, Telibagh, <br />{' '}
                          Raibareli Road, Lucknow U.P. India 226002
                        </address>
                      </li>
                      <li>
                        <IoCall />
                        <Link to='tel:+91 8960395782'>+91 8960395782</Link>
                      </li>
                      <li>
                        <IoMail />
                        <Link to='mailto:rajnish.0202kumar@gmail.com'>
                          rajnish.0202kumar@gmail.com
                        </Link>
                      </li>
                      <li>
                        <IoInformationCircle />
                        <p className='mb-0'>Monday - friday 10 AM - 8 PM</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
