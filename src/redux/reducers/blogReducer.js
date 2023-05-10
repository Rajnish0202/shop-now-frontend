import {
  ALL_BLOGS_REQUEST,
  ALL_BLOGS_SUCCESS,
  ALL_BLOGS_FAIL,
  CLEAR_ERRORS,
  SINGLE_BLOG_REQUEST,
  SINGLE_BLOG_SUCCESS,
  SINGLE_BLOG_FAIL,
  LIKE_BLOG_REQUEST,
  LIKE_BLOG_SUCCESS,
  LIKE_BLOG_FAIL,
  LIKE_BLOG_RESET,
  DISLIKE_BLOG_REQUEST,
  DISLIKE_BLOG_SUCCESS,
  DISLIKE_BLOG_FAIL,
  DISLIKE_BLOG_RESET,
  DELETE_BLOG_REQUEST,
  DELETE_BLOG_SUCCESS,
  DELETE_BLOG_FAIL,
  DELETE_BLOG_RESET,
  CREATE_BLOG_REQUEST,
  CREATE_BLOG_SUCCESS,
  CREATE_BLOG_FAIL,
  CREATE_BLOG_RESET,
} from '../constants/blogConstants.js';

export const allBlogReducer = (state = { blogs: [] }, action) => {
  switch (action.type) {
    case ALL_BLOGS_REQUEST:
      return {
        loading: true,
        blogs: [],
      };

    case ALL_BLOGS_SUCCESS:
      return {
        loading: false,
        blogs: action.payload,
      };

    case ALL_BLOGS_FAIL:
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

export const singleBlogReducer = (state = { blog: {} }, action) => {
  switch (action.type) {
    case SINGLE_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SINGLE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        blog: action.payload,
      };

    case SINGLE_BLOG_FAIL:
      return {
        ...state,
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

export const likeBlogReducer = (state = {}, action) => {
  switch (action.type) {
    case LIKE_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LIKE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        isLiked: true,
        blog: action.payload,
      };

    case LIKE_BLOG_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LIKE_BLOG_RESET:
      return {
        ...state,
        isLiked: false,
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

export const dislikeBlogReducer = (state = {}, action) => {
  switch (action.type) {
    case DISLIKE_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DISLIKE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        isDisliked: true,
        blog: action.payload,
      };

    case DISLIKE_BLOG_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DISLIKE_BLOG_RESET:
      return {
        ...state,
        isDisliked: false,
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

// Delete Blog
export const blogActionsReducer = (state = {}, action) => {
  switch (action.type) {
    // case UPDATE_PRODUCT_REQUEST:
    case DELETE_BLOG_REQUEST:
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

    case DELETE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };

    // case UPDATE_PRODUCT_FAIL:
    case DELETE_BLOG_FAIL:
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

    case DELETE_BLOG_RESET:
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

// Create New Blog
export const createBlogReducer = (state = { blog: {} }, action) => {
  switch (action.type) {
    case CREATE_BLOG_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_BLOG_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        blog: action.payload.newBlog,
      };

    case CREATE_BLOG_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_BLOG_RESET:
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
