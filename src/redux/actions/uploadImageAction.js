import axios from 'axios';
import {
  CLEAR_ERRORS,
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
} from '../constants/uploadImagesConstants';
import { BACKEND_URL } from '../../utils/backendUrl';

export const uploadProductImages = (id, imageData) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_IMAGE_REQUEST });

    const config = {
      headers: {
        Accept: 'multiform/form-data',
        'Content-Type': 'multiform/form-data',
      },
      mode: 'cors',
      credentials: 'include',
      withCredentials: true,
    };

    const { data } = await axios.put(
      `${BACKEND_URL}/product/upload/${id}`,
      imageData,
      config
    );

    dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: data.images });
  } catch (error) {
    dispatch({
      type: UPLOAD_IMAGE_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

export const uploadBlogImages = (id, imageData) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_IMAGE_REQUEST });

    const config = {
      headers: {
        Accept: 'multiform/form-data',
        'Content-Type': 'multiform/form-data',
      },
      mode: 'cors',
      credentials: 'include',
      withCredentials: true,
    };

    const { data } = await axios.put(
      `${BACKEND_URL}/blog/upload/${id}`,
      imageData,
      config
    );

    dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: data.images });
  } catch (error) {
    dispatch({
      type: UPLOAD_IMAGE_FAIL,
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
