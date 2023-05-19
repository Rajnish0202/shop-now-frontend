import axios from 'axios';
import { BACKEND_URL } from '../../utils/backendUrl';
import {
  ALL_TYPE_COUNT_FAIL,
  ALL_TYPE_COUNT_REQUEST,
  ALL_TYPE_COUNT_SUCCESS,
  ALL_TYPE_FAIL,
  ALL_TYPE_REQUEST,
  ALL_TYPE_SUCCESS,
  CLEAR_ERRORS,
  CREATE_TYPE_FAIL,
  CREATE_TYPE_REQUEST,
  CREATE_TYPE_SUCCESS,
  DELETE_TYPE_FAIL,
  DELETE_TYPE_REQUEST,
  DELETE_TYPE_SUCCESS,
  SINGLE_TYPE_FAIL,
  SINGLE_TYPE_REQUEST,
  SINGLE_TYPE_SUCCESS,
} from '../constants/productTypeConstants';

export const getTypes = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_TYPE_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/product-type`);

    dispatch({ type: ALL_TYPE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_TYPE_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

export const getAllTypesCount = (limit) => async (dispatch) => {
  try {
    dispatch({ type: ALL_TYPE_COUNT_REQUEST });

    const { data } = await axios.get(
      `${BACKEND_URL}/product-type/type?limit=${limit}`
    );

    dispatch({ type: ALL_TYPE_COUNT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_TYPE_COUNT_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

// Get Single Type Details

export const getTypeDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_TYPE_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/product-type/${id}`);

    dispatch({ type: SINGLE_TYPE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SINGLE_TYPE_FAIL,
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
export const deleteProductType = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TYPE_REQUEST });

    const { data } = await axios.delete(`${BACKEND_URL}/product-type/${id}`);

    dispatch({ type: DELETE_TYPE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_TYPE_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

// Create New Type
export const createType = (title) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_TYPE_REQUEST });

    const { data } = await axios.post(`${BACKEND_URL}/product-type`, {
      title,
    });

    dispatch({ type: CREATE_TYPE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_TYPE_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};
