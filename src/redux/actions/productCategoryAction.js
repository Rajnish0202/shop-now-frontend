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
  DELETE_PRODUCT_CATEGORY_FAIL,
  DELETE_PRODUCT_CATEGORY_REQUEST,
  DELETE_PRODUCT_CATEGORY_SUCCESS,
  QUICK_CATEGORY_FAIL,
  QUICK_CATEGORY_REQUEST,
  QUICK_CATEGORY_SUCCESS,
  CREATE_PRODUCT_CATEGORY_REQUEST,
  CREATE_PRODUCT_CATEGORY_SUCCESS,
  CREATE_PRODUCT_CATEGORY_FAIL,
  SINGLE_PRODUCT_CATEGORY_REQUEST,
  SINGLE_PRODUCT_CATEGORY_SUCCESS,
  SINGLE_PRODUCT_CATEGORY_FAIL,
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

export const getQuickCategories = () => async (dispatch) => {
  try {
    dispatch({ type: QUICK_CATEGORY_REQUEST });

    const { data } = await axios.get(
      `${BACKEND_URL}/product-category/quick-category`
    );

    dispatch({ type: QUICK_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: QUICK_CATEGORY_FAIL,
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

// ADMIN

// Delete Product Category
export const deleteProductCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_CATEGORY_REQUEST });

    const { data } = await axios.delete(
      `${BACKEND_URL}/product-category/${id}`
    );

    dispatch({ type: DELETE_PRODUCT_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_CATEGORY_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

// Create New Product Category
export const createProductCategory = (title) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_CATEGORY_REQUEST });

    const { data } = await axios.post(`${BACKEND_URL}/product-category`, {
      title,
    });

    dispatch({ type: CREATE_PRODUCT_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_CATEGORY_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

// Get Single Product Category Details

export const getProductCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_PRODUCT_CATEGORY_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/product-category/${id}`);

    dispatch({ type: SINGLE_PRODUCT_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SINGLE_PRODUCT_CATEGORY_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};
