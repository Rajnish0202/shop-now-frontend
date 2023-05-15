import {
  CLEAR_ERRORS,
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_RESET,
  UPLOAD_IMAGE_SUCCESS,
} from '../constants/uploadImagesConstants';

export const uploadImageReducer = (state = { images: {} }, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPLOAD_IMAGE_SUCCESS:
      return {
        loading: false,
        success: true,
        images: action.payload,
      };

    case UPLOAD_IMAGE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPLOAD_IMAGE_RESET:
      return {
        ...state,
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
