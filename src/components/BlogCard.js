import moment from 'moment';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { shortenText } from '../utils/ShortenText';
import DOMPurify from 'dompurify';

const BlogCard = ({ blog }) => {
  const location = useLocation();

  return (
    <div
      className={`${location.pathname === '/blogs' ? 'blog-width' : 'col-3'}`}
    >
      <div className='blog-card'>
        <div
          className={`${
            location.pathname === '/blogs'
              ? 'card-image'
              : 'card-image blog_page_image'
          }`}
        >
          <img
            src={blog?.images[0]?.url}
            className='img-fluid'
            alt={blog?.images[0]?.url}
          />
        </div>
        <div className='blog-content'>
          <div className='d-flex align-items-center justify-content-between'>
            <p className='date'>
              {moment(blog?.createdAt).format('DD MMMM YYYY')}
            </p>
            <p className='text-success text-capitalize'>
              {blog?.category?.title}
            </p>
          </div>
          <h5 className='title' title={blog?.title}>
            {location.pathname === '/blogs'
              ? blog?.title
              : shortenText(blog?.title, 25)}
          </h5>
          <div
            className={`desc ${
              blog?.description?.length >= 200 ? 'mb-2' : 'marginBottom'
            }`}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                location.pathname === '/blogs'
                  ? shortenText(blog?.description, 250)
                  : shortenText(blog?.description, 200)
              ),
            }}
          ></div>
          <Link to={`/blogs/${blog?._id}`} className='button'>
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
