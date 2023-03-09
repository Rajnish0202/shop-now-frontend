import React from 'react';
import { Link } from 'react-router-dom';
import BreadCrumb from '../components/BreadCrumb';
import MetaData from '../utils/MetaData';
import { HiOutlineArrowLongLeft } from 'react-icons/hi2';

const SingleBlog = () => {
  return (
    <>
      <MetaData title='Dymanic blog' />
      <BreadCrumb title='Dymanic blog' />
      <div className='singleblog-wrapper home-wrapper-2 p-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              <div className='single-blog-card'>
                <div className='back'>
                  <Link to='/blogs'>
                    <HiOutlineArrowLongLeft size={30} />
                    <p className='mb-0'>Back to Blogs</p>
                  </Link>
                </div>
                <h3 className='title'>
                  A BEAUTIFUL SUNDAY MORNING RENAISSANCE
                </h3>
                <img
                  src='/assests/blog-1.jpg'
                  alt='blog'
                  className='single-blog-image my-4'
                />
                <p className='mb-0'>
                  You're only as good as your last collection, which is an
                  enormous pressure. I think there is something about luxury -
                  it's not something people need, but it's what they want. It
                  really pulls at their heart. I have a fantastic relationship
                  with money.Scelerisque sociosqu ullamcorper urna nisl mollis
                  vestibulum pretium commodo inceptos cum condimentum placerat
                  diam venenatis blandit hac eget dis lacus a parturient a
                  accumsan nisl ante vestibulum.
                </p>
                <div className='d-flex align-items-center gap-30'>
                  <code>11 Jun, 2023</code>
                  <code>Kajal Korat</code>
                </div>
              </div>

              {/* <div className='single-blog-comment'>
                <form action='' className='d-flex flex-column gap-15'>
                  <h3>Leave A Comment</h3>
                  <div className='d-flex align-items-center justify-content-between gap-30'>
                    <input
                      type='text'
                      placeholder='Name *'
                      className='form-control'
                    />
                    <input
                      type='email'
                      placeholder='Email *'
                      className='form-control'
                    />
                  </div>
                  <div>
                    <textarea
                      rows='4'
                      cols='30'
                      placeholder='Comment *'
                      className='form-control'
                    ></textarea>
                  </div>

                  <div>
                    <button type='submit' className='button'>
                      Comment
                    </button>
                  </div>
                </form>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
