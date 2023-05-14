import axios from 'axios';
import { BACKEND_URL } from '../../utils/backendUrl';
import {
  ALL_COLOR_FAIL,
  ALL_COLOR_REQUEST,
  ALL_COLOR_SUCCESS,
  CLEAR_ERRORS,
  DELETE_COLOR_FAIL,
  DELETE_COLOR_REQUEST,
  DELETE_COLOR_SUCCESS,
  CREATE_COLOR_REQUEST,
  CREATE_COLOR_SUCCESS,
  CREATE_COLOR_FAIL,
} from '../constants/productColorConstants';

export const getAllColors = (createdAt) => async (dispatch) => {
  try {
    dispatch({ type: ALL_COLOR_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/color`);

    dispatch({ type: ALL_COLOR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_COLOR_FAIL,
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

// Delete Color
export const deleteProductColor = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_COLOR_REQUEST });

    const { data } = await axios.delete(`${BACKEND_URL}/color/${id}`);

    dispatch({ type: DELETE_COLOR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_COLOR_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

// Create New Color
export const createColor = (title, hex) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_COLOR_REQUEST });

    const { data } = await axios.post(`${BACKEND_URL}/color`, {
      title,
      hex,
    });

    dispatch({ type: CREATE_COLOR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_COLOR_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};
