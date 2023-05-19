import React, { useEffect, useState } from 'react';
import MetaData from '../../utils/MetaData';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { capitalizeText } from '../../utils/Capitalized';
import { getBlogCategories } from '../../redux/actions/blogCategoryActions';
import { TextSpinner } from '../../components/Loader/Loader';
import { toast } from 'react-toastify';
import {
  clearErrors,
  getSingleBlog,
  updateBlog,
} from '../../redux/actions/blogActions';
import { UPDATE_BLOG_RESET } from '../../redux/constants/blogConstants';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBlog = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState();
  const [desc, setDesc] = useState('');

  const { id } = useParams();

  const dispatch = useDispatch();

  const { blog } = useSelector((state) => state.singleBlog);
  const { loading, blogCategories } = useSelector(
    (state) => state.blogCategory
  );

  const {
    loading: loadingBlog,
    error,
    isUpdated,
  } = useSelector((state) => state.blogActions);

  const navigate = useNavigate();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!title && !category && !desc) {
      return toast.error('Please Fill All Fields.');
    }

    const blogData = new FormData();
    blogData.set('title', title);
    blogData.set('category', category);
    blogData.set('description', desc);

    console.log(...blogData);
    dispatch(updateBlog(id, blogData));
  };

  const formClearHandler = () => {
    setTitle('');
    setCategory('');
    setDesc('');
  };

  useEffect(() => {
    if (id) {
      dispatch(getSingleBlog(id));
      setTitle(blog?.title);
      setCategory(blog?.category?._id);
      setDesc(blog?.description);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success('Blog Updated Successfully.');
      navigate('/admin/dashboard/blog-list');
      dispatch({ type: UPDATE_BLOG_RESET });
    }

    dispatch(getBlogCategories());
  }, [
    dispatch,
    error,
    isUpdated,
    navigate,
    id,
    blog?.title,
    blog?.category?._id,
    blog?.description,
  ]);

  return (
    <>
      <MetaData title='Update Blogs' />
      <div>
        <h3 className='mb-4'>Update Blog</h3>

        <div className='d-flex'>
          <form className='w-100' onSubmit={formSubmitHandler}>
            <div className='form-floating mb-3 w-100'>
              <input
                type='text'
                className='form-control form-border w-100'
                id='floatingInput'
                placeholder='Blog Title'
                name='title'
                value={title || ' '}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor='floatingInput'>Enter Blog Title</label>
            </div>
            <div className='form-floating mb-3 w-100'>
              {loading && <TextSpinner />}
              <select
                className='form-select w-100'
                id='floatingSelect'
                aria-label='Floating label select example'
                style={{ cursor: 'pointer' }}
                name='category'
                onChange={(e) => setCategory(e.target.value)}
              >
                {id ? (
                  <option value={blog?.category?._id}>
                    {capitalizeText(blog?.category?.title)}
                  </option>
                ) : (
                  <option value={''}>Select Category</option>
                )}
                {blogCategories &&
                  blogCategories?.map((category) => {
                    return (
                      <option key={category?._id} value={category?._id}>
                        {capitalizeText(category?.title)}
                      </option>
                    );
                  })}
              </select>
              <label htmlFor='floatingSelect'>Category</label>
            </div>
            <div className='mb-3 w-100'>
              <ReactQuill
                theme='snow'
                value={desc || ''}
                onChange={setDesc}
                modules={UpdateBlog.modules}
                formats={UpdateBlog.formats}
                className='w-100'
                placeholder='Enter Description...'
                name='description'
              />
            </div>
            <div className='d-flex align-items-center gap-30'>
              <button
                type='submit'
                className='btn btn-success border-0 rounded-3 my-3'
                disabled={loadingBlog ? true : false}
              >
                {loadingBlog ? <TextSpinner /> : 'Update Blog'}
              </button>
              <button
                type='button'
                className='btn btn-danger border-0 rounded-3 my-3'
                onClick={() => formClearHandler()}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

UpdateBlog.modules = {
  toolbar: [
    [{ header: 1 }, { header: 2 }],
    [{ font: [] }],

    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['clean'],
  ],
};

UpdateBlog.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'color',
  'background',
  'list',
  'bullet',
  'indent',
  'link',
  'video',
  'image',
  'code-block',
  'align',
];

export default UpdateBlog;
