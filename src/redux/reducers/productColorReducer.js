import {
  ALL_COLOR_FAIL,
  ALL_COLOR_REQUEST,
  ALL_COLOR_SUCCESS,
  CLEAR_ERRORS,
  CREATE_COLOR_FAIL,
  CREATE_COLOR_REQUEST,
  CREATE_COLOR_RESET,
  CREATE_COLOR_SUCCESS,
  DELETE_COLOR_FAIL,
  DELETE_COLOR_REQUEST,
  DELETE_COLOR_RESET,
  DELETE_COLOR_SUCCESS,
} from '../constants/productColorConstants';

export const productColorReducer = (state = { colors: [] }, action) => {
  switch (action.type) {
    case ALL_COLOR_REQUEST:
      return {
        loading: true,
        colors: [],
      };

    case ALL_COLOR_SUCCESS:
      return {
        loading: false,
        colors: action.payload.colors,
        totalColors: action.payload.count,
      };

    case ALL_COLOR_FAIL:
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

// Delete Product Color
export const productColorActionsReducer = (state = {}, action) => {
  switch (action.type) {
    // case UPDATE_PRODUCT_REQUEST:
    case DELETE_COLOR_REQUEST:
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

    case DELETE_COLOR_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };

    // case UPDATE_PRODUCT_FAIL:
    case DELETE_COLOR_FAIL:
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

    case DELETE_COLOR_RESET:
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

// Create New Product Color
export const createColorReducer = (state = { newColor: {} }, action) => {
  switch (action.type) {
    case CREATE_COLOR_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_COLOR_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        newColor: action.payload.color,
      };

    case CREATE_COLOR_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_COLOR_RESET:
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
