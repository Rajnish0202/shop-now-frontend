import { DELETE_COUPON_FAIL } from '../constants/couponConstant';
import { DELETE_COUPON_RESET } from '../constants/couponConstant';
import { DELETE_COUPON_SUCCESS } from '../constants/couponConstant';
import {
  ALL_COUPON_FAIL,
  ALL_COUPON_REQUEST,
  ALL_COUPON_SUCCESS,
  APPLY_COUPON_FAIL,
  APPLY_COUPON_REQUEST,
  APPLY_COUPON_RESET,
  APPLY_COUPON_SUCCESS,
  CLEAR_ERRORS,
  COUPON_DETAILS_FAIL,
  COUPON_DETAILS_REQUEST,
  COUPON_DETAILS_SUCCESS,
  CREATE_COUPON_FAIL,
  CREATE_COUPON_REQUEST,
  CREATE_COUPON_RESET,
  CREATE_COUPON_SUCCESS,
  DELETE_COUPON_REQUEST,
} from '../constants/couponConstant';

export const allCouponReducer = (state = { coupons: [] }, action) => {
  switch (action.type) {
    case ALL_COUPON_REQUEST:
      return {
        loading: true,
        coupons: [],
      };

    case ALL_COUPON_SUCCESS:
      return {
        loading: false,
        coupons: action.payload,
      };

    case ALL_COUPON_FAIL:
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

export const couponReducer = (state = {}, action) => {
  switch (action.type) {
    case APPLY_COUPON_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case APPLY_COUPON_SUCCESS:
      return {
        loading: false,
        couponApplied: true,
        isApplied: true,
        message: action.payload,
      };

    case APPLY_COUPON_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case APPLY_COUPON_RESET:
      return {
        ...state,
        couponApplied: false,
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

export const couponDetailsReducer = (state = { singleCoupon: {} }, action) => {
  switch (action.type) {
    case COUPON_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case COUPON_DETAILS_SUCCESS:
      return {
        loading: false,
        singleCoupon: action.payload,
      };

    case COUPON_DETAILS_FAIL:
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

// DELETE AND UPDATE COUPON
export const couponActionsReducer = (state = {}, action) => {
  switch (action.type) {
    // case UPDATE_PRODUCT_REQUEST:
    case DELETE_COUPON_REQUEST:
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

    case DELETE_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };

    // case UPDATE_PRODUCT_FAIL:
    case DELETE_COUPON_FAIL:
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

    case DELETE_COUPON_RESET:
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

// Create New Coupon
export const createCouponReducer = (state = { coupon: {} }, action) => {
  switch (action.type) {
    case CREATE_COUPON_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_COUPON_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        coupon: action.payload.newCoupon,
      };

    case CREATE_COUPON_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_COUPON_RESET:
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
