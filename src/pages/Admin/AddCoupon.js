import React, { useEffect, useState } from 'react';
import MetaData from '../../utils/MetaData';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { TextSpinner } from '../../components/Loader/Loader';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { CREATE_COUPON_RESET } from '../../redux/constants/couponConstant';
import {
  clearErrors,
  createCoupon,
  getAllCoupons,
} from '../../redux/actions/couponActions';

const AddCoupon = () => {
  const [title, setTitle] = useState('');
  const [discount, setDiscount] = useState(0);
  const [expiry, setExpiry] = useState('');

  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newCoupon);

  const navigate = useNavigate();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!title && !discount && !expiry) {
      return toast.error('Please Fill All Fields.');
    }

    dispatch(createCoupon(title, discount, expiry));
  };

  const formClearHandler = () => {
    setTitle('');
    setDiscount(0);
    setExpiry('');
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success('Coupon Created Successfully.');
      navigate('/admin/dashboard/coupons-list');
      dispatch({ type: CREATE_COUPON_RESET });
      dispatch(getAllCoupons());
    }
  }, [dispatch, error, success, navigate]);

  return (
    <>
      <MetaData title='Add Coupon' />
      <div>
        <h3 className='mb-4'>Add Coupon</h3>

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
              <label htmlFor='floatingInput'>Enter Coupon Name</label>
            </div>
            <div className='form-floating mb-3 w-100'>
              <input
                type='number'
                className='form-control form-border w-100'
                id='floatingInput'
                name='discount'
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                min={1}
              />
              <label htmlFor='floatingInput'>Enter Discount</label>
            </div>

            <div className='form-floating mb-3 w-100'>
              <input
                type='datetime-local'
                className='form-control form-border w-100'
                id='floatingInput'
                name='expiry'
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
              <label htmlFor='floatingInput'>Enter Expiry Date</label>
            </div>

            <div className='d-flex align-items-center gap-30'>
              <button
                type='submit'
                className='btn btn-success border-0 rounded-3 my-3'
                disabled={loading ? true : false}
              >
                {loading ? <TextSpinner /> : 'Add Coupon'}
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

export default AddCoupon;
