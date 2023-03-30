import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  ADD_TO_CART_RESET,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  REMOVE_CART_ITEM_FAIL,
  REMOVE_CART_ITEM_RESET,
  SAVE_SHIPPING_INFO,
  USER_CART_REQUEST,
  USER_CART_SUCCESS,
  USER_CART_FAIL,
  CLEAR_ERRORS,
  SAVE_PAYMENT_METHOD,
  REMOVE_ALL_CART_ITEM_REQUEST,
  REMOVE_ALL_CART_ITEM_SUCCESS,
  REMOVE_ALL_CART_ITEM_FAIL,
  REMOVE_ALL_CART_ITEM_RESET,
} from '../constants/cartConstants';

export const addCartReducer = (
  state = { shippingAddress: {}, paymentMethod: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
    case REMOVE_CART_ITEM_REQUEST:
    case REMOVE_ALL_CART_ITEM_REQUEST:
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

    case REMOVE_ALL_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        isEmpty: true,
        message: action.payload,
      };

    case ADD_TO_CART_FAIL:
    case REMOVE_CART_ITEM_FAIL:
    case REMOVE_ALL_CART_ITEM_FAIL:
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

    case REMOVE_ALL_CART_ITEM_RESET:
      return {
        ...state,
        isEmpty: false,
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
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
