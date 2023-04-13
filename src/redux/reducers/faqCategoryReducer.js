import {
  ALL_FAQ_CATEGORY_FAIL,
  ALL_FAQ_CATEGORY_REQUEST,
  ALL_FAQ_CATEGORY_SUCCESS,
  CLEAR_ERRORS,
} from '../constants/faqCategoryConstants';

export const allFaqCategoryReducer = (state = { faqCategory: [] }, action) => {
  switch (action.type) {
    case ALL_FAQ_CATEGORY_REQUEST:
      return {
        loading: true,
        faqCategory: [],
      };

    case ALL_FAQ_CATEGORY_SUCCESS:
      return {
        loading: false,
        faqCategory: action.payload.faqCategories,
        counts: action.payload.counts,
      };

    case ALL_FAQ_CATEGORY_FAIL:
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
