import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BlogCard = () => {
  const location = useLocation();

  return (
    <div
      className={`${location.pathname === '/blogs' ? 'blog-width' : 'col-3'}`}
    >
      <div className='blog-card'>
        <div className='card-image'>
          <img src='assests/blog-1.jpg' className='img-fluid' alt='blog' />
        </div>
        <div className='blog-content'>
          <p className='date'>11 June,2022</p>
          <h5 className='title'>A Beautiful Sunday Morning Renaissance</h5>
          <p className='desc'>
            You're only as good as your last collection.Which is an enormous
            pressur. I thinkthere is Something About...
          </p>
          <Link to='/blogs/123' className='button'>
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
