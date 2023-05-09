import {
  ALL_TYPE_COUNT_FAIL,
  ALL_TYPE_COUNT_REQUEST,
  ALL_TYPE_COUNT_SUCCESS,
  ALL_TYPE_FAIL,
  ALL_TYPE_REQUEST,
  ALL_TYPE_SUCCESS,
  CLEAR_ERRORS,
  DELETE_TYPE_FAIL,
  DELETE_TYPE_REQUEST,
  DELETE_TYPE_RESET,
  DELETE_TYPE_SUCCESS,
} from '../constants/productTypeConstants';

export const productTypeReducer = (state = { types: [] }, action) => {
  switch (action.type) {
    case ALL_TYPE_REQUEST:
      return {
        loading: true,
        types: [],
      };

    case ALL_TYPE_SUCCESS:
      return {
        loading: false,
        types: action.payload.types,
        totalTypes: action.payload.count,
      };

    case ALL_TYPE_FAIL:
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

export const productTypeCountReducer = (state = { countTypes: [] }, action) => {
  switch (action.type) {
    case ALL_TYPE_COUNT_REQUEST:
      return {
        loading: true,
        countTypes: [],
      };

    case ALL_TYPE_COUNT_SUCCESS:
      return {
        loading: false,
        countTypes: action.payload,
      };

    case ALL_TYPE_COUNT_FAIL:
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

export const productTypeActionsReducer = (state = {}, action) => {
  switch (action.type) {
    // case UPDATE_PRODUCT_REQUEST:
    case DELETE_TYPE_REQUEST:
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

    case DELETE_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };

    // case UPDATE_PRODUCT_FAIL:
    case DELETE_TYPE_FAIL:
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

    case DELETE_TYPE_RESET:
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
