import moment from 'moment';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const location = useLocation();

  return (
    <div
      className={`${location.pathname === '/blogs' ? 'blog-width' : 'col-3'}`}
    >
      <div className='blog-card'>
        <div className='card-image'>
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
          <h5 className='title'>{blog?.title}</h5>
          <p className='desc'>{blog?.description}</p>
          <Link to={`/blogs/${blog?._id}`} className='button'>
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
