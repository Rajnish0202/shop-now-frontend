import {
  ALL_SIZES_FAIL,
  ALL_SIZES_REQUEST,
  ALL_SIZES_SUCCESS,
  CLEAR_ERRORS,
  DELETE_SIZE_FAIL,
  DELETE_SIZE_REQUEST,
  DELETE_SIZE_RESET,
  DELETE_SIZE_SUCCESS,
} from '../constants/sizesConstants';

export const productSizeReducer = (state = { brands: [] }, action) => {
  switch (action.type) {
    case ALL_SIZES_REQUEST:
      return {
        loading: true,
        productSizes: [],
      };

    case ALL_SIZES_SUCCESS:
      return {
        loading: false,
        productSizes: action.payload.sizes,
        totalSizes: action.payload.count,
      };

    case ALL_SIZES_FAIL:
      return {
        loading: false,
        error: action.payload,
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

// Admin Actions

export const productSizeActionsReducer = (state = {}, action) => {
  switch (action.type) {
    // case UPDATE_PRODUCT_REQUEST:
    case DELETE_SIZE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    // case UPDATE_PRODUCT_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     isUpdated: action.payload.success,
    //     message: action.payload.message,
    //   };

    case DELETE_SIZE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };

    // case UPDATE_PRODUCT_FAIL:
    case DELETE_SIZE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // case UPDATE_PRODUCT_RESET:
    //   return {
    //     ...state,
    //     isUpdated: false,
    //   };

    case DELETE_SIZE_RESET:
      return {
        ...state,
        isDeleted: false,
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
