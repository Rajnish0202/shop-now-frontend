import React, { useEffect, useState } from 'react';
import MetaData from '../../utils/MetaData';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { TextSpinner } from '../../components/Loader/Loader';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

import { UPDATE_COUPON_RESET } from '../../redux/constants/couponConstant';
import {
  clearErrors,
  getSingleCoupon,
  updateCoupon,
} from '../../redux/actions/couponActions';
import moment from 'moment';

const UpdateCoupon = () => {
  const [title, setTitle] = useState('');
  const [discount, setDiscount] = useState(0);
  const [expiry, setExpiry] = useState('');

  const { id } = useParams();

  const dispatch = useDispatch();

  const { singleCoupon } = useSelector((state) => state.singleCoupon);

  const { loading, error, isUpdated } = useSelector(
    (state) => state.couponActions
  );

  const navigate = useNavigate();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!title && !discount && !expiry) {
      return toast.error('Please Fill All Fields.');
    }

    const formData = new FormData();
    formData.set('name', title);
    formData.set('discount', discount);
    formData.set('expiry', expiry);

    dispatch(updateCoupon(id, formData));
  };

  const formClearHandler = () => {
    setTitle('');
    setDiscount(0);
    setExpiry('');
  };

  useEffect(() => {
    if (id) {
      dispatch(getSingleCoupon(id));
      setTitle(singleCoupon?.name);
      setDiscount(singleCoupon?.discount);
      setExpiry(singleCoupon?.expiry);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success('Coupon Updated Successfully.');
      navigate('/admin/dashboard/coupons-list');
      dispatch({ type: UPDATE_COUPON_RESET });
    }
  }, [
    dispatch,
    error,
    isUpdated,
    navigate,
    singleCoupon?.name,
    singleCoupon?.discount,
    singleCoupon?.expiry,
    id,
  ]);

  return (
    <>
      <MetaData title='Update Coupon' />
      <div>
        <h3 className='mb-4'>Update Coupon</h3>

        <div className='d-flex'>
          <form className='w-100' onSubmit={formSubmitHandler}>
            <div className='form-floating mb-3 w-100'>
              <input
                type='text'
                className='form-control form-border w-100'
                id='floatingInput'
                placeholder='Blog Title'
                name='name'
                value={title || ''}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor='floatingInput'>Enter Coupon Name</label>
            </div>
            <div className='form-floating mb-3 w-100'>
              <input
                type='number'
                className='form-control form-border w-100'
                id='floatingInput'
                name='discount'
                value={discount || ''}
                onChange={(e) => setDiscount(e.target.value)}
                min={1}
              />
              <label htmlFor='floatingInput'>Enter Discount</label>
            </div>

            {id && (
              <div className='form-floating mb-3 w-100'>
                <input
                  type='text'
                  className='form-control form-border w-100'
                  id='floatingInput'
                  value={
                    moment(singleCoupon?.expiry).format(
                      'DD MMMM YYYY hh:mm:ss a'
                    ) || ''
                  }
                  readOnly
                />
                <label htmlFor='floatingInput'>Previous Expiry Date</label>
              </div>
            )}

            <div className='form-floating mb-3 w-100'>
              <input
                type='datetime-local'
                className='form-control form-border w-100'
                id='floatingInput'
                name='expiry'
                value={expiry || ''}
                onChange={(e) => setExpiry(e.target.value)}
              />
              <label htmlFor='floatingInput'>Update Expiry Date</label>
            </div>

            <div className='d-flex align-items-center gap-30'>
              <button
                type='submit'
                className='btn btn-success border-0 rounded-3 my-3'
                disabled={loading ? true : false}
              >
                {loading ? <TextSpinner /> : 'Update Coupon'}
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

export default UpdateCoupon;
