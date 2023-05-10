import axios from 'axios';
import { BACKEND_URL } from '../../utils/backendUrl';
import {
  ALL_SIZES_FAIL,
  ALL_SIZES_REQUEST,
  ALL_SIZES_SUCCESS,
  CLEAR_ERRORS,
  CREATE_SIZE_FAIL,
  CREATE_SIZE_REQUEST,
  CREATE_SIZE_SUCCESS,
  DELETE_SIZE_FAIL,
  DELETE_SIZE_REQUEST,
  DELETE_SIZE_SUCCESS,
} from '../constants/sizesConstants';

export const getSizes = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_SIZES_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/product-size`);

    dispatch({ type: ALL_SIZES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_SIZES_FAIL,
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

// Delete Size
export const deleteProductSize = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SIZE_REQUEST });

    const { data } = await axios.delete(`${BACKEND_URL}/product-size/${id}`);

    dispatch({ type: DELETE_SIZE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_SIZE_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

// Create New Size
export const createSize = (title) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SIZE_REQUEST });

    const { data } = await axios.post(`${BACKEND_URL}/product-size`, {
      title,
    });

    dispatch({ type: CREATE_SIZE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_SIZE_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};
