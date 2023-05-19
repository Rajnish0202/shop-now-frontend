import {
  ALL_PRODUCTCATEGORY_COUNT_FAIL,
  ALL_PRODUCTCATEGORY_COUNT_REQUEST,
  ALL_PRODUCTCATEGORY_COUNT_SUCCESS,
  ALL_PRODUCTCATEGORY_FAIL,
  ALL_PRODUCTCATEGORY_REQUEST,
  ALL_PRODUCTCATEGORY_SUCCESS,
  CLEAR_ERRORS,
  DELETE_PRODUCT_CATEGORY_FAIL,
  DELETE_PRODUCT_CATEGORY_REQUEST,
  DELETE_PRODUCT_CATEGORY_RESET,
  DELETE_PRODUCT_CATEGORY_SUCCESS,
  QUICK_CATEGORY_FAIL,
  QUICK_CATEGORY_REQUEST,
  QUICK_CATEGORY_SUCCESS,
  CREATE_PRODUCT_CATEGORY_REQUEST,
  CREATE_PRODUCT_CATEGORY_SUCCESS,
  CREATE_PRODUCT_CATEGORY_FAIL,
  CREATE_PRODUCT_CATEGORY_RESET,
  SINGLE_PRODUCT_CATEGORY_REQUEST,
  SINGLE_PRODUCT_CATEGORY_SUCCESS,
  SINGLE_PRODUCT_CATEGORY_FAIL,
} from '../constants/productCategory';

export const productCategoryReducer = (
  state = { productCategories: [] },
  action
) => {
  switch (action.type) {
    case ALL_PRODUCTCATEGORY_REQUEST:
      return {
        loading: true,
        productCategories: [],
      };

    case ALL_PRODUCTCATEGORY_SUCCESS:
      return {
        loading: false,
        productCategories: action.payload.categories,
        counts: action.payload.count,
      };

    case ALL_PRODUCTCATEGORY_FAIL:
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

export const productCountCategoryReducer = (
  state = { productCountCategories: [] },
  action
) => {
  switch (action.type) {
    case ALL_PRODUCTCATEGORY_COUNT_REQUEST:
      return {
        loading: true,
        productCountCategories: [],
      };

    case ALL_PRODUCTCATEGORY_COUNT_SUCCESS:
      return {
        loading: false,
        productCountCategories: action.payload,
        counts: action.payload.count,
      };

    case ALL_PRODUCTCATEGORY_COUNT_FAIL:
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

export const quickCategoryReducer = (
  state = { quickCategories: [] },
  action
) => {
  switch (action.type) {
    case QUICK_CATEGORY_REQUEST:
      return {
        loading: true,
        quickCategories: [],
      };

    case QUICK_CATEGORY_SUCCESS:
      return {
        loading: false,
        quickCategories: action.payload.categories,
        counts: action.payload.count,
      };

    case QUICK_CATEGORY_FAIL:
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

// Delete Product Category
export const productCategoryActionsReducer = (state = {}, action) => {
  switch (action.type) {
    // case UPDATE_PRODUCT_REQUEST:
    case DELETE_PRODUCT_CATEGORY_REQUEST:
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

    case DELETE_PRODUCT_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };

    // case UPDATE_PRODUCT_FAIL:
    case DELETE_PRODUCT_CATEGORY_FAIL:
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

    case DELETE_PRODUCT_CATEGORY_RESET:
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

// Create New Product Category
export const createProductCategoryReducer = (
  state = { newProductCategory: {} },
  action
) => {
  switch (action.type) {
    case CREATE_PRODUCT_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_PRODUCT_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        newProductCategory: action.payload.category,
      };

    case CREATE_PRODUCT_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_PRODUCT_CATEGORY_RESET:
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

// Single Product Category Details
export const productCategoryDetailsReducer = (
  state = { category: {} },
  action
) => {
  switch (action.type) {
    case SINGLE_PRODUCT_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SINGLE_PRODUCT_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        category: action.payload.category,
      };

    case SINGLE_PRODUCT_CATEGORY_FAIL:
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
