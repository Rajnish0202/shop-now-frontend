import React, { useEffect, useState } from 'react';
import MetaData from '../../utils/MetaData';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { TextSpinner } from '../../components/Loader/Loader';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import {
  clearErrors,
  getColorDetails,
  updateColor,
} from '../../redux/actions/productColorAction';
import { UPDATE_COLOR_RESET } from '../../redux/constants/productColorConstants';

const UpdateColor = () => {
  const [title, setTitle] = useState('');
  const [hex, setHex] = useState('');

  const { id } = useParams();

  const dispatch = useDispatch();

  const { loading, error, isUpdated } = useSelector(
    (state) => state.colorActions
  );
  const { color } = useSelector((state) => state.colorDetails);

  const navigate = useNavigate();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!title && !hex) {
      return toast.error('Please Fill All Fields.');
    }

    const formData = new FormData();
    formData.set('title', title);
    formData.set('hex', hex);

    dispatch(updateColor(id, formData));
  };

  const formClearHandler = () => {
    setTitle('');
    setHex('');
  };

  useEffect(() => {
    if (id) {
      dispatch(getColorDetails(id));
      setTitle(color?.title);
      setHex(color?.hex);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success('Color Updated Successfully.');
      navigate('/admin/dashboard/color-list');
      dispatch({ type: UPDATE_COLOR_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, id, color?.title, color?.hex]);

  return (
    <>
      <MetaData title='Update Product Color' />
      <div>
        <h3 className='mb-4'>Update Product Color</h3>

        <div className='d-flex'>
          <form className='w-100' onSubmit={formSubmitHandler}>
            <div className='form-floating mb-3 w-100'>
              <input
                type='text'
                className='form-control form-border w-100'
                id='floatingInput'
                placeholder='Blog Title'
                name='title'
                value={title || ''}
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
                value={hex || ''}
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
                {loading ? <TextSpinner /> : 'Update Product Color'}
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

export default UpdateColor;
