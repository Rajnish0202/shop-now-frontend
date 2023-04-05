import {
  ALL_TYPE_COUNT_FAIL,
  ALL_TYPE_COUNT_REQUEST,
  ALL_TYPE_COUNT_SUCCESS,
  ALL_TYPE_FAIL,
  ALL_TYPE_REQUEST,
  ALL_TYPE_SUCCESS,
  CLEAR_ERRORS,
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
