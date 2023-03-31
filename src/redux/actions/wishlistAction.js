import axios from 'axios';
import { BACKEND_URL } from '../../utils/backendUrl';
import {
  ADD_WISHLIST_FAIL,
  ADD_WISHLIST_REQUEST,
  ADD_WISHLIST_SUCCESS,
  GET_WISHLIST_FAIL,
  GET_WISHLIST_REQUEST,
  GET_WISHLIST_SUCCESS,
  REMOVE_WISHLIST_FAIL,
  REMOVE_WISHLIST_REQUEST,
  REMOVE_WISHLIST_SUCCESS,
} from '../constants/wishlistConstants';

export const addWishlist = (productId) => async (dispatch) => {
  try {
    dispatch({ type: ADD_WISHLIST_REQUEST });

    const { data } = await axios.put(`${BACKEND_URL}/user/add-wishlist`, {
      productId,
    });

    dispatch({ type: ADD_WISHLIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_WISHLIST_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

export const removeWishlist = (productId) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_WISHLIST_REQUEST });

    const { data } = await axios.put(`${BACKEND_URL}/user/remove-wishlist`, {
      productId,
    });

    dispatch({ type: REMOVE_WISHLIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REMOVE_WISHLIST_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

export const getAllWishlist = () => async (dispatch) => {
  try {
    dispatch({ type: GET_WISHLIST_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/user/wishlist`);

    dispatch({ type: GET_WISHLIST_SUCCESS, payload: data.findWishlist });
  } catch (error) {
    dispatch({
      type: GET_WISHLIST_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};
