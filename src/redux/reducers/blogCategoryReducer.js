import {
  ALL_BLOGS_CATEGORY_FAIL,
  ALL_BLOGS_CATEGORY_REQUEST,
  ALL_BLOGS_CATEGORY_SUCCESS,
  CLEAR_ERRORS,
  CREATE_BLOG_CATEGORY_FAIL,
  CREATE_BLOG_CATEGORY_REQUEST,
  CREATE_BLOG_CATEGORY_RESET,
  CREATE_BLOG_CATEGORY_SUCCESS,
  DELETE_BLOG_CATEGORY_FAIL,
  DELETE_BLOG_CATEGORY_REQUEST,
  DELETE_BLOG_CATEGORY_RESET,
  DELETE_BLOG_CATEGORY_SUCCESS,
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

// Admin Actions

// Delete Blog Category
export const blogCategoryActionsReducer = (state = {}, action) => {
  switch (action.type) {
    // case UPDATE_PRODUCT_REQUEST:
    case DELETE_BLOG_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    // case UPDATE_PRODUCT_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     isUpdated: action.payload.success,
    //     message: action.payload.message,
    //   };

    case DELETE_BLOG_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };

    // case UPDATE_PRODUCT_FAIL:
    case DELETE_BLOG_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // case UPDATE_PRODUCT_RESET:
    //   return {
    //     ...state,
    //     isUpdated: false,
    //   };

    case DELETE_BLOG_CATEGORY_RESET:
      return {
        ...state,
        isDeleted: false,
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

// Create New Blog Category
export const createBlogCategoryReducer = (
  state = { blogCategory: {} },
  action
) => {
  switch (action.type) {
    case CREATE_BLOG_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_BLOG_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        blogCategory: action.payload.category,
      };

    case CREATE_BLOG_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_BLOG_CATEGORY_RESET:
      return {
        ...state,
        success: false,
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
