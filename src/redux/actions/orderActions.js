import axios from 'axios';
import { BACKEND_URL } from '../../utils/backendUrl';
import {
  ALL_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} from '../constants/orderConstants';

export const createOrder =
  (
    method,
    couponApplied,
    shippingAddress,
    taxPrice,
    shippingPrice,
    cartTotal,
    totalAfterDiscount,
    paymentInfo
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: CREATE_ORDER_REQUEST });

      const { data } = await axios.post(`${BACKEND_URL}/user/order`, {
        method,
        couponApplied,
        shippingAddress,
        taxPrice,
        shippingPrice,
        cartTotal,
        totalAfterDiscount,
        paymentInfo,
      });

      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data.newOrder });
    } catch (error) {
      dispatch({
        type: CREATE_ORDER_FAIL,
        payload:
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString(),
      });
    }
  };

export const allUserOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/user/get-orders`);

    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.myOrders });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

export const orderdetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/user/get-orders/${id}`);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.myOrder });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};
