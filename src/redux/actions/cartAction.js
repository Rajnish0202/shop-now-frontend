import { BACKEND_URL } from '../../utils/backendUrl';
import {
  ADD_TO_CART_FAIL,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  REMOVE_ALL_CART_ITEM_FAIL,
  REMOVE_ALL_CART_ITEM_REQUEST,
  REMOVE_ALL_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM_FAIL,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  SAVE_SHIPPING_INFO,
  UPDATE_CART_QUANTITY_FAIL,
  UPDATE_CART_QUANTITY_REQUEST,
  UPDATE_CART_QUANTITY_SUCCESS,
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

// Update Cart

export const updateQtyInCart = (productId, qty) => async (dispatch) => {
  console.log(productId, qty);
  try {
    dispatch({
      type: UPDATE_CART_QUANTITY_REQUEST,
    });

    const { data } = await axios.put(`${BACKEND_URL}/user/cart-update`, {
      productId,
      count: +qty,
    });

    dispatch({ type: UPDATE_CART_QUANTITY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_CART_QUANTITY_FAIL,
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

export const emptyCart = () => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_ALL_CART_ITEM_REQUEST });
    const { data } = await axios.put(`${BACKEND_URL}/user/all-empty-cart`);

    dispatch({ type: REMOVE_ALL_CART_ITEM_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: REMOVE_ALL_CART_ITEM_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};
