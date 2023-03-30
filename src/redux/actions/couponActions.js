import axios from 'axios';
import { BACKEND_URL } from '../../utils/backendUrl';
import {
  ALL_COUPON_FAIL,
  ALL_COUPON_REQUEST,
  ALL_COUPON_SUCCESS,
  APPLY_COUPON_FAIL,
  APPLY_COUPON_REQUEST,
  APPLY_COUPON_SUCCESS,
  CLEAR_ERRORS,
  COUPON_DETAILS_FAIL,
  COUPON_DETAILS_REQUEST,
  COUPON_DETAILS_SUCCESS,
} from '../constants/couponConstant';

export const getAllCoupons = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_COUPON_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/coupon`);

    dispatch({ type: ALL_COUPON_SUCCESS, payload: data.coupons });
  } catch (error) {
    dispatch({
      type: ALL_COUPON_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

export const getSingleCoupon = (id) => async (dispatch) => {
  try {
    dispatch({ type: COUPON_DETAILS_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/coupon/${id}`);

    dispatch({ type: COUPON_DETAILS_SUCCESS, payload: data.coupon });
  } catch (error) {
    dispatch({
      type: COUPON_DETAILS_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

export const applyCoupon = (coupon) => async (dispatch) => {
  console.log(coupon);
  try {
    dispatch({ type: APPLY_COUPON_REQUEST });

    const { data } = await axios.post(`${BACKEND_URL}/user/cart/apply-coupon`, {
      coupon,
    });

    dispatch({ type: APPLY_COUPON_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: APPLY_COUPON_FAIL,
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