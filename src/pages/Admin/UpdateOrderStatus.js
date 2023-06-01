import React, { useEffect, useState } from 'react';
import MetaData from '../../utils/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { capitalizeText } from '../../utils/Capitalized';
import { TextSpinner } from '../../components/Loader/Loader';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import {
  clearErrors,
  orderDetailsAdmin,
  updateOrderStatus,
} from '../../redux/actions/orderActions';
import moment from 'moment';
import { UPDATE_ORDER_STATUS_RESET } from '../../redux/constants/orderConstants';

const UpdateOrderStatus = () => {
  const [status, setStatus] = useState([]);

  const [choose, setChoose] = useState('');

  const { page, id } = useParams();

  const dispatch = useDispatch();

  const { adminOrder, error, loading } = useSelector(
    (state) => state.adminOrderDetails
  );

  const {
    loading: statusLoading,
    error: statusError,
    statusUpdated,
  } = useSelector((state) => state.orderStatus);

  const filterStatus = status.filter(
    (item) => item?.step !== adminOrder?.orderStatus
  );

  const navigate = useNavigate();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!status) {
      return toast.error('Please Select Status.');
    }

    const statusData = new FormData();
    statusData.set('status', choose);

    console.log(...statusData);
    dispatch(updateOrderStatus(id, statusData));
  };

  const formClearHandler = () => {
    setStatus('');
  };

  useEffect(() => {
    if (id) {
      dispatch(orderDetailsAdmin(id));
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (page === 'pending') {
      setStatus([
        {
          id: 1,
          step: 'Shipped',
        },
      ]);
    } else if (page === 'shipped') {
      setStatus([
        {
          id: 2,
          step: 'Out For Delivery',
        },
      ]);
    } else if (page === 'outfordelivery') {
      setStatus([
        {
          id: 3,
          step: 'Delivered',
        },
      ]);
    } else {
      setStatus([
        {
          id: 1,
          step: 'Shipped',
        },
        {
          id: 2,
          step: 'Out For Delivery',
        },
        {
          id: 3,
          step: 'Delivered',
        },
      ]);
    }

    if (statusUpdated) {
      toast.success('Order Status Changed.');
      dispatch({ type: UPDATE_ORDER_STATUS_RESET });
      if (page === 'pending') {
        navigate('/admin/dashboard/shipped_orders');
      } else if (page === 'shipped') {
        navigate('/admin/dashboard/out_for_delivery_orders');
      } else if (page === 'outfordelivery') {
        navigate('/admin/dashboard/delivered_orders');
      }
    }

    if (statusError) {
      toast.error(statusError);
      dispatch(clearErrors());
    }
  }, [dispatch, error, navigate, id, page, statusUpdated, statusError]);

  return (
    <>
      <MetaData title={`Update Order Status ${adminOrder?._id} `} />
      <div>
        <h3 className='mb-2'>{`Update Order Status (${adminOrder?._id})`}</h3>
        <h4 className='mb-2'>
          Order By: {adminOrder?.orderby?.firstname}{' '}
          {adminOrder?.orderby?.lastname}
        </h4>
        <h5 className='mb-4'>
          {Date.parse(adminOrder?.createdAt) > Date.parse(adminOrder?.updatedAt)
            ? 'Order Place At:'
            : 'Order Status Updated At'}
          :{' '}
          {moment(
            Date.parse(adminOrder?.createdAt) >
              Date.parse(adminOrder?.updatedAt)
              ? adminOrder?.createdAt
              : adminOrder?.updatedAt
          ).format('DD MMMM YYYY mm:ss')}
        </h5>

        <div className='d-flex'>
          <form className='w-100' onSubmit={formSubmitHandler}>
            <div className='form-floating mb-3 w-100'>
              {loading && <TextSpinner />}
              <select
                className='form-select w-100'
                id='floatingSelect'
                aria-label='Floating label select example'
                style={{ cursor: 'pointer' }}
                name='status'
                onChange={(e) => setChoose(e.target.value)}
              >
                {id ? (
                  <option value={adminOrder?.orderStatus}>
                    {adminOrder?.orderStatus}
                  </option>
                ) : (
                  <option value={''}>Update Order Status</option>
                )}
                {filterStatus &&
                  filterStatus?.map((item) => {
                    return (
                      <option key={item?.id} value={item?.step}>
                        {capitalizeText(item?.step)}
                      </option>
                    );
                  })}
              </select>
              <label htmlFor='floatingSelect'>Order Status</label>
            </div>

            <div className='d-flex align-items-center gap-30'>
              <button
                type='submit'
                className='btn btn-success border-0 rounded-3 my-3'
                disabled={loading ? true : false}
              >
                {statusLoading ? <TextSpinner /> : 'Update Order Status'}
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

export default UpdateOrderStatus;
