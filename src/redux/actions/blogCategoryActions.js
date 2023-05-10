import axios from 'axios';
import {
  ALL_BLOGS_CATEGORY_FAIL,
  ALL_BLOGS_CATEGORY_REQUEST,
  ALL_BLOGS_CATEGORY_SUCCESS,
  CLEAR_ERRORS,
  CREATE_BLOG_CATEGORY_FAIL,
  CREATE_BLOG_CATEGORY_REQUEST,
  CREATE_BLOG_CATEGORY_SUCCESS,
  DELETE_BLOG_CATEGORY_FAIL,
  DELETE_BLOG_CATEGORY_REQUEST,
  DELETE_BLOG_CATEGORY_SUCCESS,
} from '../constants/blogCategoryConstants';
import { BACKEND_URL } from '../../utils/backendUrl';

export const getBlogCategories = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_BLOGS_CATEGORY_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/blog-category`);

    dispatch({ type: ALL_BLOGS_CATEGORY_SUCCESS, payload: data.categories });
  } catch (error) {
    dispatch({
      type: ALL_BLOGS_CATEGORY_FAIL,
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

// Delete Blog Category
export const deleteBlogCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BLOG_CATEGORY_REQUEST });

    const { data } = await axios.delete(`${BACKEND_URL}/blog-category/${id}`);

    dispatch({ type: DELETE_BLOG_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_BLOG_CATEGORY_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

// Create New Blog Category
export const createBlogCategory = (title) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_BLOG_CATEGORY_REQUEST });

    const { data } = await axios.post(`${BACKEND_URL}/blog-category`, {
      title,
    });

    dispatch({ type: CREATE_BLOG_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_BLOG_CATEGORY_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};
