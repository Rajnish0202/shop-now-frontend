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
