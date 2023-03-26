import {
  ADD_TO_CART,
  ADD_TO_CART_FAIL,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_RESET,
  ADD_TO_CART_SUCCESS,
  CLEAR_ERRORS,
  REMOVE_CART_ITEM_FAIL,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_RESET,
  REMOVE_CART_ITEM_SUCCESS,
  USER_CART_FAIL,
  USER_CART_REQUEST,
  USER_CART_SUCCESS,
} from '../constants/cartConstants';

export const addCartReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
    case REMOVE_CART_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        isAdded: true,
        cart: action.payload,
      };

    case REMOVE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: true,
        cart: action.payload,
      };

    case ADD_TO_CART_FAIL:
    case REMOVE_CART_ITEM_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ADD_TO_CART_RESET:
      return {
        ...state,
        isAdded: false,
      };

    case REMOVE_CART_ITEM_RESET:
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

export const cartReducer = (state = { cart: [] }, action) => {
  switch (action.type) {
    case USER_CART_REQUEST:
      return {
        loading: true,
        cart: [],
      };

    case USER_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload,
      };

    case USER_CART_FAIL:
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
