import axios from 'axios';
import { BACKEND_URL } from '../../utils/backendUrl';
import {
  ALL_BLOGS_REQUEST,
  ALL_BLOGS_SUCCESS,
  ALL_BLOGS_FAIL,
  CLEAR_ERRORS,
  SINGLE_BLOG_REQUEST,
  SINGLE_BLOG_SUCCESS,
  SINGLE_BLOG_FAIL,
} from '../constants/blogConstants.js';

export const getAllBlogs = (limit, category) => async (dispatch) => {
  try {
    dispatch({ type: ALL_BLOGS_REQUEST });

    let link = `${BACKEND_URL}/blog?limit=${limit}`;
    if (category) {
      link = `${BACKEND_URL}/blog?limit=${limit}&category=${category}`;
    }

    const { data } = await axios.get(link);

    dispatch({ type: ALL_BLOGS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_BLOGS_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

export const getSingleBlog = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_BLOG_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/blog/${id}`);

    dispatch({ type: SINGLE_BLOG_SUCCESS, payload: data.blog });
  } catch (error) {
    dispatch({
      type: SINGLE_BLOG_FAIL,
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
