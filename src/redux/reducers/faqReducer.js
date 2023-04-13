import {
  ALL_FAQ_FAIL,
  ALL_FAQ_REQUEST,
  ALL_FAQ_SUCCESS,
  CLEAR_ERRORS,
} from '../constants/faqConstants';

export const allFaqReducer = (state = { faqs: [] }, action) => {
  switch (action.type) {
    case ALL_FAQ_REQUEST:
      return {
        loading: true,
        faqs: [],
      };

    case ALL_FAQ_SUCCESS:
      return {
        loading: false,
        faqs: action.payload,
        faqCategories: action.payload.faqCategories,
      };

    case ALL_FAQ_FAIL:
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
