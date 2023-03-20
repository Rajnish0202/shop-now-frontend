import axios from 'axios';
import { BACKEND_URL } from '../../utils/backendUrl';
import {
  ALL_BRAND_FAIL,
  ALL_BRAND_REQUEST,
  ALL_BRAND_SUCCESS,
  CLEAR_ERRORS,
} from '../constants/productBrand';

export const getBrands = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_BRAND_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/brand`);

    dispatch({ type: ALL_BRAND_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_BRAND_FAIL,
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
