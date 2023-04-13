import axios from 'axios';
import { BACKEND_URL } from '../../utils/backendUrl';
import {
  ALL_FAQ_FAIL,
  ALL_FAQ_REQUEST,
  ALL_FAQ_SUCCESS,
  CLEAR_ERRORS,
} from '../constants/faqConstants';

export const getAllFaqs = (limit, category) => async (dispatch) => {
  try {
    dispatch({ type: ALL_FAQ_REQUEST });

    let link = `${BACKEND_URL}/faq?limit=${limit}`;

    if (category) {
      link = `${BACKEND_URL}/faq?limit=${limit}&category=${category}`;
    }

    const { data } = await axios.get(link);

    dispatch({ type: ALL_FAQ_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_FAQ_FAIL,
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
