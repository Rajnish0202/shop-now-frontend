import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { orderDetailsAdmin } from '../../redux/actions/orderActions';

const OrderDetailsAdmin = () => {
  const { orderId } = useParams();

  const dispatch = useDispatch();
  const { loading, adminOrder } = useSelector(
    (state) => state.adminOrderDetails
  );

  useEffect(() => {
    if (orderId) {
      dispatch(orderDetailsAdmin(orderId));
    }
  }, [dispatch, orderId]);

  return <div>OrderDetailsAdmin {orderId}</div>;
};

export default OrderDetailsAdmin;
