import React, { useEffect } from 'react';
import { MdOutlineLaunch } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BreadCrumb from '../../components/BreadCrumb';
import { Spinner } from '../../components/Loader/Loader';
import { allUserOrders } from '../../redux/actions/orderActions';
import MetaData from '../../utils/MetaData';
import { shortenText } from '../../utils/ShortenText';

const Orders = () => {
  const { loading, orders } = useSelector((state) => state.allOrders);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const userName = `${user.firstname}${user.lastname}`;

  useEffect(() => {
    dispatch(allUserOrders());
  }, [dispatch]);

  return (
    <>
      <MetaData title='My Orders' />
      <BreadCrumb title='My Orders' />
      <div className='home-wrapper-2 p-4'>
        <h3 className='text-center'>{userName}'s Orders List</h3>
        {loading ? (
          <Spinner />
        ) : (
          <div className='col-12 px-4'>
            <div className='d-flex align-items-center justify-content-between mt-4 pb-2 border-bottom border-secondary '>
              <p className='fw-bold fs-6 mb-0 w-100 text-center'>OrderId</p>
              <p className='fw-bold fs-6 mb-0 w-100 text-center'>Status</p>
              <p className='fw-bold fs-6 mb-0 w-100 text-center'>Payment</p>
              <p className='fw-bold fs-6 mb-0 w-100 text-center'>Item Qty</p>
              <p className='fw-bold fs-6 mb-0 w-100 text-center'>Amount</p>
              <p className='fw-bold fs-6 mb-0 w-100 text-center'>Action</p>
            </div>
            {orders &&
              orders.map((item) => (
                <div
                  className='d-flex align-items-center justify-content-between py-2 border-bottom border-secondary '
                  key={item?._id}
                >
                  <p title={item?._id} className='mb-0 w-100 text-start'>
                    {shortenText(item?._id, 15)}
                  </p>
                  <p className='mb-0 w-100 text-center'>{item?.orderStatus}</p>
                  <p className='mb-0 w-100 text-center'>
                    {item?.paymentIntent?.method === 'Stripe'
                      ? 'Online Pay'
                      : 'COD'}
                  </p>
                  <p className='mb-0 w-100 text-center'>
                    {item?.products?.length}
                  </p>
                  <p className='mb-0 w-100 text-center'>
                    ₹{item?.paymentIntent?.amount}
                  </p>
                  <p className='mb-0 w-100 text-center'>
                    <Link to={`/user-orders/${item?._id}`}>
                      <MdOutlineLaunch size={25} />
                    </Link>
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
