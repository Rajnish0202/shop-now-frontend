import React, { useEffect, useState } from 'react';
import BlogCard from '../../components/BlogCard';
import BreadCrumb from '../../components/BreadCrumb';
import MetaData from '../../utils/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, getAllBlogs } from '../../redux/actions/blogActions';
import { Spinner } from '../../components/Loader/Loader';
import { getBlogCategories } from '../../redux/actions/blogCategoryActions';

const Blogs = () => {
  const [limit, setLimit] = useState(8);
  const [category, setCategory] = useState('');

  const { loading, error, blogs } = useSelector((state) => state.allBlogs);

  const {
    loading: categoryLoading,
    error: categoryError,
    blogCategories,
  } = useSelector((state) => state.blogCategory);

  const dispatch = useDispatch();

  const blogMoreHandler = () => {
    if (limit > blogs?.blogCount) return;
    setLimit((prev) => prev + 1);
  };

  const blogLessHandler = () => {
    if (limit > blogs?.blogCount) {
      return;
    }
    setLimit((prev) => prev - 1);
  };

  const resetFilter = () => {
    setCategory();
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (categoryError) {
      toast.error(categoryError);
      dispatch(clearErrors());
    }

    dispatch(getAllBlogs(limit, category));
    dispatch(getBlogCategories());
  }, [error, dispatch, limit, categoryError, category]);

  return (
    <>
      <MetaData title='Our Blogs' />
      <BreadCrumb
        title={`Our Blogs (${
          blogs?.blogCount === undefined
            ? '00'
            : blogs?.blogCount > 10
            ? blogs?.blogCount
            : blogs?.blogCount?.toString()?.padStart(2, '0')
        })`}
      />
      <div className='blog-wrapper home-wrapper-2 p-4'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-3'>
              <div className='filter-card mb-2'>
                <h3 className='filter-title'>find by categories</h3>
                <div>
                  <ul className='ps-0 mb-0'>
                    {categoryLoading && <Spinner />}
                    {blogCategories &&
                      blogCategories?.map((cate) => {
                        return (
                          <li
                            key={cate?._id}
                            onClick={() => setCategory(cate?._id)}
                            style={{ cursor: 'pointer' }}
                          >
                            {cate?.title}
                          </li>
                        );
                      })}
                    <li
                      className='mt-4 border text-center border-dark rounded'
                      onClick={resetFilter}
                    >
                      Reset Filter
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-9'>
              {loading && <Spinner />}
              <div className='d-flex gap-15 flex-wrap'>
                {blogs &&
                  blogs?.allBlog?.map((blog) => {
                    return <BlogCard blog={blog} key={blog?._id} />;
                  })}
              </div>
              <div className='d-flex align-items-center justify-content-center mt-3 gap-15'>
                {limit > 8 && (
                  <button className='button' onClick={blogLessHandler}>
                    Load Less
                  </button>
                )}
                {limit < blogs?.blogCount && (
                  <button className='button' onClick={blogMoreHandler}>
                    Load More
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
