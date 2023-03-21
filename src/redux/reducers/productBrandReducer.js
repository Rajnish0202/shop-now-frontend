import {
  ALL_BRAND_FAIL,
  ALL_BRAND_REQUEST,
  ALL_BRAND_SUCCESS,
  CLEAR_ERRORS,
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
