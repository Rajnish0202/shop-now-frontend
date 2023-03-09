import React from 'react';
import BlogCard from '../components/BlogCard';
import BreadCrumb from '../components/BreadCrumb';
import MetaData from '../utils/MetaData';

const Blogs = () => {
  return (
    <>
      <MetaData title='Our Blogs' />
      <BreadCrumb title='Our Blogs' />
      <div className='blog-wrapper home-wrapper-2 p-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-3'>
              <div className='filter-card mb-2'>
                <h3 className='filter-title'>find by categories</h3>
                <div>
                  <ul className='ps-0 mb-0'>
                    <li>Watch</li>
                    <li>Television</li>
                    <li>Mobile</li>
                    <li>laptop</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-9'>
              <div className='d-flex gap-15 flex-wrap'>
                <BlogCard />
                <BlogCard />
                <BlogCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
