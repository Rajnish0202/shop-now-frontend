import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import BreadCrumb from '../components/BreadCrumb';
import MetaData from '../utils/MetaData';
import { HiOutlineArrowLongLeft } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleBlog } from '../redux/actions/blogActions';
import { Spinner } from '../components/Loader/Loader';
import moment from 'moment';
import { FaEye } from 'react-icons/fa';
import { SlLike, SlDislike } from 'react-icons/sl';

const SingleBlog = () => {
  const { id } = useParams();

  const { loading, blog } = useSelector((state) => state.singleBlog);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getSingleBlog(id));
    }
  }, [id, dispatch]);

  return (
    <>
      <MetaData title={blog?.title} />
      <BreadCrumb title={blog?.title} />
      <div className='singleblog-wrapper home-wrapper-2 p-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-12'>
              {loading && <Spinner />}
              <div className='single-blog-card'>
                <div className='back'>
                  <Link to='/blogs'>
                    <HiOutlineArrowLongLeft size={30} />
                    <p className='mb-0'>Back to Blogs</p>
                  </Link>
                </div>
                <h3 className='title'>{blog?.title}</h3>
                <img
                  src={blog?.images?.[0]?.url}
                  alt={blog?.images?.[0]?.url}
                  className='single-blog-image my-4'
                />
                <p className='mb-0'>{blog?.description}</p>
                <div className='d-flex align-items-center gap-30'>
                  <code>{moment(blog?.createdAt).format('DD MMMM YYYY')}</code>
                  <code className='text-capitalize'>{blog?.author}</code>
                  <code className='text-capitalize text-success'>
                    {blog?.category?.title}
                  </code>
                </div>
                <div className='d-flex align-items-center gap-15 justify-content-end'>
                  <div className='d-flex align-items-center gap-10'>
                    <p className='mb-0'>
                      <FaEye size={25} color='#64C9EA' />
                    </p>
                    <p
                      className='mb-0 text-dark fw-bold'
                      style={{ marginTop: '2px', letterSpacing: '1px' }}
                    >
                      {blog?.numViews} {blog?.numViews > 1 ? 'Views' : 'View'}
                    </p>
                  </div>
                  <div className='d-flex align-items-center gap-10'>
                    <p className='mb-0'>
                      <SlLike size={25} color='#0B6623' />
                    </p>
                    <p
                      className='mb-0 text-dark fw-bold'
                      style={{ marginTop: '2px', letterSpacing: '1px' }}
                    >
                      {blog?.numViews} {blog?.numViews > 1 ? 'Likes' : 'Like'}
                    </p>
                  </div>
                  <div className='d-flex align-items-center gap-10'>
                    <p className='mb-0'>
                      <SlDislike size={25} color='#Fe2020' />
                    </p>
                    <p
                      className='mb-0 text-dark fw-bold'
                      style={{ marginTop: '2px', letterSpacing: '1px' }}
                    >
                      {blog?.numViews}{' '}
                      {blog?.numViews > 1 ? 'Dislikes' : 'Dislike'}
                    </p>
                  </div>
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
