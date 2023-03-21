import {
  ALL_COLOR_FAIL,
  ALL_COLOR_REQUEST,
  ALL_COLOR_SUCCESS,
  CLEAR_ERRORS,
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
