import React, { useEffect, useState } from 'react';
import MetaData from '../../utils/MetaData';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { TextSpinner } from '../../components/Loader/Loader';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import {
  clearErrors,
  createBrand,
  getBrands,
} from '../../redux/actions/brandAction';
import { CREATE_BRAND_RESET } from '../../redux/constants/productBrand';

const AddBrand = () => {
  const [title, setTitle] = useState('');

  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newBrand);

  const navigate = useNavigate();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!title) {
      return toast.error('Please Fill All Fields.');
    }

    dispatch(createBrand(title));
  };

  const formClearHandler = () => {
    setTitle('');
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success('Product Brand Created Successfully.');
      navigate('/admin/dashboard/brand-list');
      dispatch({ type: CREATE_BRAND_RESET });
      dispatch(getBrands());
    }
  }, [dispatch, error, success, navigate]);

  return (
    <>
      <MetaData title='Add Product Brand' />
      <div>
        <h3 className='mb-4'>Add Product Brand</h3>

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
              <label htmlFor='floatingInput'>Enter Brand Title</label>
            </div>

            <div className='d-flex align-items-center gap-30'>
              <button
                type='submit'
                className='btn btn-success border-0 rounded-3 my-3'
                disabled={loading ? true : false}
              >
                {loading ? <TextSpinner /> : 'Add Product Brand'}
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

export default AddBrand;
