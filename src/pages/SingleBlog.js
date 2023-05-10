import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import BreadCrumb from '../components/BreadCrumb';
import MetaData from '../utils/MetaData';
import { HiOutlineArrowLongLeft } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  dislikeBlog,
  getSingleBlog,
  likeBlog,
} from '../redux/actions/blogActions';
import { Spinner, TextSpinner } from '../components/Loader/Loader';
import moment from 'moment';
import { FaEye } from 'react-icons/fa';
import { SlLike, SlDislike } from 'react-icons/sl';
import { toast } from 'react-toastify';
import {
  DISLIKE_BLOG_RESET,
  LIKE_BLOG_RESET,
} from '../redux/constants/blogConstants';
import DOMPurify from 'dompurify';

const SingleBlog = () => {
  const { id } = useParams();

  const { loading, blog } = useSelector((state) => state.singleBlog);
  const {
    loading: likeLoading,
    isLiked,
    error: likeError,
  } = useSelector((state) => state.likeBlog);

  const {
    loading: dislikeLoading,
    isDisliked,
    error: dislikeError,
  } = useSelector((state) => state.dislikeBlog);

  const dispatch = useDispatch();

  const likeHandler = (id) => {
    dispatch(likeBlog(id));
  };

  const dislikeHandler = (id) => {
    dispatch(dislikeBlog(id));
  };

  useEffect(() => {
    if (id) {
      dispatch(getSingleBlog(id));
    }

    if (isLiked) {
      toast.success('You Liked This Blog 😍');
      dispatch({ type: LIKE_BLOG_RESET });
      dispatch(getSingleBlog(id));
    }

    if (isDisliked) {
      toast.success('You Disliked This Blog 😌');
      dispatch({ type: DISLIKE_BLOG_RESET });
      dispatch(getSingleBlog(id));
    }

    if (likeError) {
      toast.error(likeError);
      dispatch(clearErrors());
    }

    if (dislikeError) {
      toast.error(dislikeError);
      dispatch(clearErrors());
    }
  }, [id, dispatch, isLiked, isDisliked, dislikeError, likeError]);

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
                {blog?.images?.map((image) => {
                  return (
                    <img
                      src={image?.url}
                      alt={image?.url}
                      className='single-blog-image my-4'
                    />
                  );
                })}
                <div
                  className='desc mb-2'
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(blog?.description),
                  }}
                ></div>
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
                      {blog?.numViews} &nbsp;
                      {blog?.numViews > 1 ? 'Views' : 'View'}
                    </p>
                  </div>
                  <div
                    className='d-flex align-items-center gap-10'
                    style={{ cursor: 'pointer' }}
                    onClick={() => likeHandler(blog?._id)}
                  >
                    <p className='mb-0'>
                      <SlLike size={25} color='#0B6623' />
                    </p>
                    {likeLoading ? (
                      <TextSpinner />
                    ) : (
                      <p
                        className='mb-0 text-dark fw-bold'
                        style={{ marginTop: '2px', letterSpacing: '1px' }}
                      >
                        {blog?.likes?.length} &nbsp;
                        {blog?.likes?.length > 1 ? 'Likes' : 'Like'}
                      </p>
                    )}
                  </div>
                  <div
                    className='d-flex align-items-center gap-10'
                    style={{ cursor: 'pointer' }}
                    onClick={() => dislikeHandler(blog?._id)}
                  >
                    <p className='mb-0'>
                      <SlDislike size={25} color='#Fe2020' />
                    </p>
                    {dislikeLoading ? (
                      <TextSpinner />
                    ) : (
                      <p
                        className='mb-0 text-dark fw-bold'
                        style={{ marginTop: '2px', letterSpacing: '1px' }}
                      >
                        {blog?.dislikes?.length} &nbsp;
                        {blog?.dislikes?.length > 1 ? 'Dislikes' : 'Dislike'}
                      </p>
                    )}
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
