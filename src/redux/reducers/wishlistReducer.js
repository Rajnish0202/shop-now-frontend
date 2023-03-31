import {
  ADD_WISHLIST_FAIL,
  ADD_WISHLIST_REQUEST,
  ADD_WISHLIST_RESET,
  ADD_WISHLIST_SUCCESS,
  CLEAR_ERRORS,
  GET_WISHLIST_FAIL,
  GET_WISHLIST_REQUEST,
  GET_WISHLIST_SUCCESS,
  REMOVE_WISHLIST_FAIL,
  REMOVE_WISHLIST_REQUEST,
  REMOVE_WISHLIST_RESET,
  REMOVE_WISHLIST_SUCCESS,
} from '../constants/wishlistConstants';

export const wishlistActionReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_WISHLIST_REQUEST:
    case REMOVE_WISHLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        isAdded: action.payload.success,
      };

    case REMOVE_WISHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        isRemoved: action.payload.success,
      };

    case ADD_WISHLIST_FAIL:
    case REMOVE_WISHLIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_WISHLIST_RESET:
      return {
        ...state,
        isAdded: false,
      };

    case REMOVE_WISHLIST_RESET:
      return {
        ...state,
        isRemoved: false,
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

export const allWishlistReducer = (state = { wishlists: [] }, action) => {
  switch (action.type) {
    case GET_WISHLIST_REQUEST:
      return {
        loading: true,
        wishlists: [],
      };

    case GET_WISHLIST_SUCCESS:
      return {
        loading: false,
        wishlists: action.payload.wishlist,
      };

    case GET_WISHLIST_FAIL:
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
