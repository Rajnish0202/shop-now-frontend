import axios from 'axios';
import { BACKEND_URL } from '../../utils/backendUrl';
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  RELATED_PRODUCT_REQUEST,
  RELATED_PRODUCT_SUCCESS,
  RELATED_PRODUCT_FAIL,
} from '../constants/productConstants';

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/product`);

    dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

// Product Details

export const productDetails = (slug) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/product/${slug}`);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

export const getRelatedProducts =
  (productId, categoryId) => async (dispatch) => {
    try {
      dispatch({ type: RELATED_PRODUCT_REQUEST });

      const { data } = await axios.get(
        `${BACKEND_URL}/product/related-product/${productId}/${categoryId}`
      );

      dispatch({ type: RELATED_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: RELATED_PRODUCT_FAIL,
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
