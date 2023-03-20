import {
  ALL_SIZES_FAIL,
  ALL_SIZES_REQUEST,
  ALL_SIZES_SUCCESS,
  CLEAR_ERRORS,
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
