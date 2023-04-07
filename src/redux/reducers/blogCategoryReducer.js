import {
  ALL_BLOGS_CATEGORY_FAIL,
  ALL_BLOGS_CATEGORY_REQUEST,
  ALL_BLOGS_CATEGORY_SUCCESS,
  CLEAR_ERRORS,
} from '../constants/blogCategoryConstants';

export const allBlogCategoryReducer = (
  state = { blogCategories: [] },
  action
) => {
  switch (action.type) {
    case ALL_BLOGS_CATEGORY_REQUEST:
      return {
        loading: true,
        blogCategories: [],
      };

    case ALL_BLOGS_CATEGORY_SUCCESS:
      return {
        loading: false,
        blogCategories: action.payload,
      };

    case ALL_BLOGS_CATEGORY_FAIL:
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
