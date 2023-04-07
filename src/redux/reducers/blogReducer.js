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
