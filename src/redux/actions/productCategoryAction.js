import axios from 'axios';
import { BACKEND_URL } from '../../utils/backendUrl';
import {
  ALL_PRODUCTCATEGORY_COUNT_FAIL,
  ALL_PRODUCTCATEGORY_COUNT_REQUEST,
  ALL_PRODUCTCATEGORY_COUNT_SUCCESS,
  ALL_PRODUCTCATEGORY_FAIL,
  ALL_PRODUCTCATEGORY_REQUEST,
  ALL_PRODUCTCATEGORY_SUCCESS,
  CLEAR_ERRORS,
} from '../constants/productCategory';

export const getProductCategories = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTCATEGORY_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/product-category`);

    dispatch({ type: ALL_PRODUCTCATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTCATEGORY_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

// Product Count In Each Category

export const getProductCountCategories = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTCATEGORY_COUNT_REQUEST });

    const { data } = await axios.get(
      `${BACKEND_URL}/product-category/product-count-category`
    );

    dispatch({ type: ALL_PRODUCTCATEGORY_COUNT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTCATEGORY_COUNT_FAIL,
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
