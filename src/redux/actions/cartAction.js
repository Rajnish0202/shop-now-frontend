import { BACKEND_URL } from '../../utils/backendUrl';
import {
  ADD_TO_CART_FAIL,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  REMOVE_CART_ITEM_FAIL,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  USER_CART_FAIL,
  USER_CART_REQUEST,
  USER_CART_SUCCESS,
} from '../constants/cartConstants';
import axios from 'axios';

// ADD TO CART
export const addItemsToCart =
  (productId, qty, color, size) => async (dispatch) => {
    try {
      dispatch({
        type: ADD_TO_CART_REQUEST,
      });

      const { data } = await axios.put(`${BACKEND_URL}/user/cart`, {
        productId,
        count: +qty,
        size,
        color,
      });

      dispatch({ type: ADD_TO_CART_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADD_TO_CART_FAIL,
        payload:
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString(),
      });
    }
  };

export const userCart = () => async (dispatch) => {
  try {
    dispatch({ type: USER_CART_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/user/cart`);

    dispatch({ type: USER_CART_SUCCESS, payload: data.cart });
  } catch (error) {
    dispatch({
      type: USER_CART_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

export const removeItemsFromCart = (productId) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_CART_ITEM_REQUEST });
    const { data } = await axios.put(`${BACKEND_URL}/user/empty-cart`, {
      productId,
    });

    dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: data.cart });
  } catch (error) {
    dispatch({
      type: REMOVE_CART_ITEM_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};
