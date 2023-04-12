import {
  ALL_PRODUCTCATEGORY_COUNT_FAIL,
  ALL_PRODUCTCATEGORY_COUNT_REQUEST,
  ALL_PRODUCTCATEGORY_COUNT_SUCCESS,
  ALL_PRODUCTCATEGORY_FAIL,
  ALL_PRODUCTCATEGORY_REQUEST,
  ALL_PRODUCTCATEGORY_SUCCESS,
  CLEAR_ERRORS,
  QUICK_CATEGORY_FAIL,
  QUICK_CATEGORY_REQUEST,
  QUICK_CATEGORY_SUCCESS,
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
