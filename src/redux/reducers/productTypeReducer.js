import {
  ALL_TYPE_COUNT_FAIL,
  ALL_TYPE_COUNT_REQUEST,
  ALL_TYPE_COUNT_SUCCESS,
  ALL_TYPE_FAIL,
  ALL_TYPE_REQUEST,
  ALL_TYPE_SUCCESS,
  CLEAR_ERRORS,
  CREATE_TYPE_FAIL,
  CREATE_TYPE_REQUEST,
  CREATE_TYPE_RESET,
  CREATE_TYPE_SUCCESS,
  DELETE_TYPE_FAIL,
  DELETE_TYPE_REQUEST,
  DELETE_TYPE_RESET,
  DELETE_TYPE_SUCCESS,
  SINGLE_TYPE_FAIL,
  SINGLE_TYPE_REQUEST,
  SINGLE_TYPE_SUCCESS,
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

// DELETE TYPE
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

// Create New Product Type
export const createTypeReducer = (state = { newType: {} }, action) => {
  switch (action.type) {
    case CREATE_TYPE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_TYPE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        newType: action.payload.type,
      };

    case CREATE_TYPE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_TYPE_RESET:
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

// Single Color Details
export const typeDetailsReducer = (state = { type: {} }, action) => {
  switch (action.type) {
    case SINGLE_TYPE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SINGLE_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        type: action.payload.type,
      };

    case SINGLE_TYPE_FAIL:
      return {
        ...state,
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
