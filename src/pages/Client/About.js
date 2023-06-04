import React from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import { Link } from 'react-router-dom';
import MetaData from '../../utils/MetaData';

const About = () => {
  return (
    <>
      <MetaData title='About Us' />
      <BreadCrumb title='About Us' />
      <div className='home-wrapper-2 p-4'>
        <div className='container-xxl'>
          <div className='row'>
            <h3 className='text-center mb-4'>
              <u>About Us</u>
            </h3>
            <div className='col-12 px-5'>
              <div className='d-flex align-items-center justify-content-center flex-column'>
                <div className='d-flex align-items-center justify-content-center flex-column'>
                  <div
                    style={{
                      border: '5px solid #febd69',
                      padding: '20px',
                      borderRadius: '100%',
                      width: '240px',
                      height: '240px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 10px 5px rgba(0,0,0,0.25)',
                    }}
                  >
                    <img
                      style={{
                        display: 'block',
                        width: '200px',
                        height: '200px',
                        margin: '20px 0',
                        borderRadius: '100%',
                      }}
                      src='https://res.cloudinary.com/dukdn1bpp/image/upload/v1675181620/y5cs6zkclqnkgrqs48yh.jpg'
                      alt='Founder'
                    />
                  </div>
                  <p className='fs-4 my-4'>
                    <u>Rajnish Kumar</u>
                  </p>
                </div>
                <div className='col-12 d-flex flex-column'>
                  <div className='d-flex align-items-center gap-15'>
                    <div className='w-25'>
                      <Link
                        to='https://mernblog-app.vercel.app'
                        target='_blank'
                        className='border border-2 p-2 text-success fs-6 rounded-2 w-100 text-center'
                      >
                        Visit Mern-Blog
                      </Link>
                    </div>
                    <span>This is a sample Blog MERN wesbite.</span>
                  </div>
                  <div className='d-flex align-items-center gap-15 my-2'>
                    <div className='w-25'>
                      <Link
                        to='https://minventory-app.vercel.app'
                        target='_blank'
                        className='border border-2 p-2 text-success fs-6 rounded-2 w-100 text-center'
                      >
                        Visit Inventory
                      </Link>
                    </div>
                    <span>
                      This is a sample Product Inventory Control MERN wesbite.
                    </span>
                  </div>
                  <div className='d-flex align-items-center gap-15'>
                    <div className='w-25'>
                      <Link
                        to='https://github.com/Rajnish0202'
                        target='_blank'
                        className='border border-2 p-2 text-success fs-6 rounded-2 w-100 text-center'
                      >
                        Visit GitHub
                      </Link>
                    </div>
                    <span>
                      This is a sample wesbite made by @rajnishkumar. Only with
                      the purpose to learn MERN Stack.
                    </span>
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

export default About;
