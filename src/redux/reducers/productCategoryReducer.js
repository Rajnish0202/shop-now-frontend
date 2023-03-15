import {
  ALL_PRODUCTCATEGORY_FAIL,
  ALL_PRODUCTCATEGORY_REQUEST,
  ALL_PRODUCTCATEGORY_SUCCESS,
  CLEAR_ERRORS,
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
