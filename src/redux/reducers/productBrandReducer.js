import {
  ALL_BRAND_FAIL,
  ALL_BRAND_REQUEST,
  ALL_BRAND_SUCCESS,
  CLEAR_ERRORS,
  DELETE_BRAND_FAIL,
  DELETE_BRAND_REQUEST,
  DELETE_BRAND_RESET,
  DELETE_BRAND_SUCCESS,
  CREATE_BRAND_REQUEST,
  CREATE_BRAND_SUCCESS,
  CREATE_BRAND_FAIL,
  CREATE_BRAND_RESET,
} from '../constants/productBrand';

export const productBrandReducer = (state = { productBrands: [] }, action) => {
  switch (action.type) {
    case ALL_BRAND_REQUEST:
      return {
        loading: true,
        productBrands: [],
      };

    case ALL_BRAND_SUCCESS:
      return {
        loading: false,
        productBrands: action.payload.brands,
        totalBrands: action.payload.counts,
      };

    case ALL_BRAND_FAIL:
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

// Delete Brand
export const brandActionsReducer = (state = {}, action) => {
  switch (action.type) {
    // case UPDATE_PRODUCT_REQUEST:
    case DELETE_BRAND_REQUEST:
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

    case DELETE_BRAND_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };

    // case UPDATE_PRODUCT_FAIL:
    case DELETE_BRAND_FAIL:
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

    case DELETE_BRAND_RESET:
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

// Create New Brand
export const createBrandReducer = (state = { newBrand: {} }, action) => {
  switch (action.type) {
    case CREATE_BRAND_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_BRAND_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        newBrand: action.payload.brand,
      };

    case CREATE_BRAND_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_BRAND_RESET:
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
