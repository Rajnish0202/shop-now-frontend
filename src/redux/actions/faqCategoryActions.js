import axios from 'axios';
import { BACKEND_URL } from '../../utils/backendUrl';
import {
  ALL_FAQ_CATEGORY_FAIL,
  ALL_FAQ_CATEGORY_REQUEST,
  ALL_FAQ_CATEGORY_SUCCESS,
  CLEAR_ERRORS,
} from '../constants/faqCategoryConstants';

export const getAllFaqCategories = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_FAQ_CATEGORY_REQUEST });

    let link = `${BACKEND_URL}/faq-category`;

    const { data } = await axios.get(link);

    dispatch({ type: ALL_FAQ_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_FAQ_CATEGORY_FAIL,
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
