import {
  CLEAR_ERRORS,
  UPDATE_FAIL,
  UPDATE_REQUEST,
  UPDATE_RESET,
  UPDATE_SUCCESS,
} from '../constants/updateConstants';

export const updateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload.success,
      };

    case UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_RESET:
      return {
        ...state,
        isUpdated: false,
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
