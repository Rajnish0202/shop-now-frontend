import axios from 'axios';
import { BACKEND_URL } from '../../utils/backendUrl';
import {
  ALL_ORDERS_ADMIN_FAIL,
  ALL_ORDERS_ADMIN_REQUEST,
  ALL_ORDERS_ADMIN_SUCCESS,
  ALL_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  CLEAR_ERRORS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  DELIVERED_ORDERS_FAIL,
  DELIVERED_ORDERS_REQUEST,
  DELIVERED_ORDERS_SUCCESS,
  GET_YEARLY_ORDER_FAIL,
  GET_MONTLY_ORDER_INCOME_FAIL,
  GET_MONTLY_ORDER_INCOME_REQUEST,
  GET_MONTLY_ORDER_INCOME_SUCCESS,
  GET_YEARLY_ORDER_REQUEST,
  GET_YEARLY_ORDER_SUCCESS,
  ORDER_DETAILS_ADMIN_FAIL,
  ORDER_DETAILS_ADMIN_REQUEST,
  ORDER_DETAILS_ADMIN_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  OUT_FOR_DELIVERY_FAIL,
  OUT_FOR_DELIVERY_REQUEST,
  OUT_FOR_DELIVERY_SUCCESS,
  PENDING_ORDERS_FAIL,
  PENDING_ORDERS_REQUEST,
  PENDING_ORDERS_SUCCESS,
  SHIPPED_ORDERS_FAIL,
  SHIPPED_ORDERS_REQUEST,
  SHIPPED_ORDERS_SUCCESS,
  UPDATE_ORDER_STATUS_FAIL,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
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

// Admin

export const allOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_ADMIN_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/orders`);

    dispatch({ type: ALL_ORDERS_ADMIN_SUCCESS, payload: data.allOrders });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_ADMIN_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

export const orderDetailsAdmin = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_ADMIN_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/orders/${id}`);

    dispatch({ type: ORDER_DETAILS_ADMIN_SUCCESS, payload: data.orderDetails });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_ADMIN_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

export const pendingOrders = () => async (dispatch) => {
  try {
    dispatch({ type: PENDING_ORDERS_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/orders/pending`);

    dispatch({ type: PENDING_ORDERS_SUCCESS, payload: data.pendingOrders });
  } catch (error) {
    dispatch({
      type: PENDING_ORDERS_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

export const shippedOrders = () => async (dispatch) => {
  try {
    dispatch({ type: SHIPPED_ORDERS_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/orders/shipped`);

    dispatch({ type: SHIPPED_ORDERS_SUCCESS, payload: data.shippedOrders });
  } catch (error) {
    dispatch({
      type: SHIPPED_ORDERS_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

export const outForDeliveryOrders = () => async (dispatch) => {
  try {
    dispatch({ type: OUT_FOR_DELIVERY_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/orders/out-for-delivery`);

    dispatch({
      type: OUT_FOR_DELIVERY_SUCCESS,
      payload: data.outForDeliveryOrders,
    });
  } catch (error) {
    dispatch({
      type: OUT_FOR_DELIVERY_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

export const deliveredOrders = () => async (dispatch) => {
  try {
    dispatch({ type: DELIVERED_ORDERS_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/orders/delivered`);

    dispatch({ type: DELIVERED_ORDERS_SUCCESS, payload: data.deliveredOrders });
  } catch (error) {
    dispatch({
      type: DELIVERED_ORDERS_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

export const updateOrderStatus = (id, statusData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      withCredentials: true,
    };

    const { data } = await axios.put(
      `${BACKEND_URL}/orders/update-order/${id}`,
      statusData,
      config
    );

    dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_STATUS_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

export const getYearlyIncome = () => async (dispatch) => {
  try {
    dispatch({ type: GET_YEARLY_ORDER_REQUEST });

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      withCredentials: true,
    };

    const { data } = await axios.get(
      `${BACKEND_URL}/orders/yearlyorders`,
      config
    );

    dispatch({ type: GET_YEARLY_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_YEARLY_ORDER_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

export const getMonthWiseOrderIncome = () => async (dispatch) => {
  try {
    dispatch({ type: GET_MONTLY_ORDER_INCOME_REQUEST });

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      withCredentials: true,
    };

    const { data } = await axios.get(
      `${BACKEND_URL}/orders/monthwiseincome`,
      config
    );

    dispatch({ type: GET_MONTLY_ORDER_INCOME_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_MONTLY_ORDER_INCOME_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
