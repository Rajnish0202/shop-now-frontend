import React, { useEffect, useState } from 'react';
import MetaData from '../../utils/MetaData';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { capitalizeText } from '../../utils/Capitalized';
import { getBlogCategories } from '../../redux/actions/blogCategoryActions';
import { TextSpinner } from '../../components/Loader/Loader';
import { toast } from 'react-toastify';
import { clearErrors, createBlog } from '../../redux/actions/blogActions';
import { CREATE_BLOG_RESET } from '../../redux/constants/blogConstants';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState();
  const [desc, setDesc] = useState('');

  const dispatch = useDispatch();
  const { loading, blogCategories } = useSelector(
    (state) => state.blogCategory
  );

  const {
    loading: loadingBlog,
    error,
    success,
  } = useSelector((state) => state.newBlog);

  const navigate = useNavigate();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!title && !category && !desc) {
      return toast.error('Please Fill All Fields.');
    }

    dispatch(createBlog(title, category, desc));
  };

  const formClearHandler = () => {
    setTitle('');
    setCategory('');
    setDesc('');
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success('Blog Created Successfully.');
      navigate('/admin/dashboard/blog-list');
      dispatch({ type: CREATE_BLOG_RESET });
    }

    dispatch(getBlogCategories());
  }, [dispatch, error, success, navigate]);

  return (
    <>
      <MetaData title='Add Blogs' />
      <div>
        <h3 className='mb-4'>Add Blog</h3>

        <div className='d-flex'>
          <form className='w-100' onSubmit={formSubmitHandler}>
            <div className='form-floating mb-3 w-100'>
              <input
                type='text'
                className='form-control form-border w-100'
                id='floatingInput'
                placeholder='Blog Title'
                name='title'
                value={title}
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
                onClick={(e) => setCategory(e.target.value)}
              >
                <option value={''}>Select Category</option>;
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
                value={desc}
                onChange={setDesc}
                modules={AddProduct.modules}
                formats={AddProduct.formats}
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
                {loadingBlog ? <TextSpinner /> : 'Add Blog'}
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

AddProduct.modules = {
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

AddProduct.formats = [
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

export default AddProduct;
