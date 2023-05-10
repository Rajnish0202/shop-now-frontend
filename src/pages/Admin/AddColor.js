import React, { useEffect, useState } from 'react';
import MetaData from '../../utils/MetaData';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { TextSpinner } from '../../components/Loader/Loader';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  clearErrors,
  createColor,
} from '../../redux/actions/productColorAction';
import { CREATE_COLOR_RESET } from '../../redux/constants/productColorConstants';

const AddColor = () => {
  const [title, setTitle] = useState('');
  const [hex, setHex] = useState('');

  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newColor);

  const navigate = useNavigate();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!title && !hex) {
      return toast.error('Please Fill All Fields.');
    }

    dispatch(createColor(title, hex));
  };

  const formClearHandler = () => {
    setTitle('');
    setHex('');
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success('Product Color Created Successfully.');
      navigate('/admin/dashboard/color-list');
      dispatch({ type: CREATE_COLOR_RESET });
    }
  }, [dispatch, error, success, navigate]);

  return (
    <>
      <MetaData title='Add Product Color' />
      <div>
        <h3 className='mb-4'>Add Product Color</h3>

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
              <label htmlFor='floatingInput'>Enter Color Title</label>
            </div>
            <div className='form-floating mb-3 w-100'>
              <input
                type='text'
                className='form-control form-border w-100'
                id='floatingInput'
                placeholder='#ff1205'
                name='hex'
                value={hex}
                onChange={(e) => setHex(e.target.value)}
              />
              <label htmlFor='floatingInput'>
                Enter Color Hex Code (eg. #ff1205)
              </label>
            </div>

            <div className='d-flex align-items-center gap-30'>
              <button
                type='submit'
                className='btn btn-success border-0 rounded-3 my-3'
                disabled={loading ? true : false}
              >
                {loading ? <TextSpinner /> : 'Add Product Color'}
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

export default AddColor;
