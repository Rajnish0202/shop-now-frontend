import axios from 'axios';
import { BACKEND_URL } from '../../utils/backendUrl';
import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
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
