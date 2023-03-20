import axios from 'axios';
import { BACKEND_URL } from '../../utils/backendUrl';
import {
  ALL_TYPE_FAIL,
  ALL_TYPE_REQUEST,
  ALL_TYPE_SUCCESS,
  CLEAR_ERRORS,
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

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
