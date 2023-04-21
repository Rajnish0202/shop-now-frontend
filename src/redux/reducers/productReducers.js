import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  CLEAR_ERRORS,
  FEATURED_PRODUCT_FAIL,
  FEATURED_PRODUCT_REQUEST,
  FEATURED_PRODUCT_SUCCESS,
  POPULAR_PRODUCT_FAIL,
  POPULAR_PRODUCT_REQUEST,
  POPULAR_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  RANDOM_PRODUCT_FAIL,
  RANDOM_PRODUCT_REQUEST,
  RANDOM_PRODUCT_SUCCESS,
  RATING_PRODUCT_FAIL,
  RATING_PRODUCT_REQUEST,
  RATING_PRODUCT_RESET,
  RATING_PRODUCT_SUCCESS,
  RELATED_PRODUCT_FAIL,
  RELATED_PRODUCT_REQUEST,
  RELATED_PRODUCT_SUCCESS,
  SPECIAL_PRODUCT_FAIL,
  SPECIAL_PRODUCT_REQUEST,
  SPECIAL_PRODUCT_SUCCESS,
} from '../constants/productConstants';

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };

    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productCounts: action.payload.productCounts,
        totalProducts: action.payload.totalProducts,
      };

    case ALL_PRODUCT_FAIL:
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

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload.product,
      };

    case PRODUCT_DETAILS_FAIL:
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

export const productRatingsReducer = (state = { ratings: {} }, action) => {
  switch (action.type) {
    case RATING_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        ratings: {},
      };

    case RATING_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        ratings: action.payload,
        isRated: true,
      };

    case RATING_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case RATING_PRODUCT_RESET:
      return {
        ...state,
        isRated: false,
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

export const randomProductReducer = (
  state = { randomProducts: [] },
  action
) => {
  switch (action.type) {
    case RANDOM_PRODUCT_REQUEST:
      return {
        loading: true,
        randomProducts: [],
      };

    case RANDOM_PRODUCT_SUCCESS:
      return {
        loading: false,
        randomProducts: action.payload.randomProducts,
        randomCount: action.payload.randomCount,
      };

    case RANDOM_PRODUCT_FAIL:
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

export const relatedProductReducer = (
  state = { relatedProducts: [] },
  action
) => {
  switch (action.type) {
    case RELATED_PRODUCT_REQUEST:
      return {
        loading: true,
        relatedProducts: [],
      };

    case RELATED_PRODUCT_SUCCESS:
      return {
        loading: false,
        relatedProducts: action.payload.products,
        productCounts: action.payload.counts,
      };

    case RELATED_PRODUCT_FAIL:
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

export const popularProductReducer = (
  state = { popularProducts: [] },
  action
) => {
  switch (action.type) {
    case POPULAR_PRODUCT_REQUEST:
      return {
        loading: true,
        popularProducts: [],
      };

    case POPULAR_PRODUCT_SUCCESS:
      return {
        loading: false,
        popularProducts: action.payload.popular,
        productCounts: action.payload.popularCount,
        totalPopular: action.payload.totalPopular,
      };

    case POPULAR_PRODUCT_FAIL:
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

export const featuredProductReducer = (
  state = { featuredProducts: [] },
  action
) => {
  switch (action.type) {
    case FEATURED_PRODUCT_REQUEST:
      return {
        loading: true,
        featuredProducts: [],
      };

    case FEATURED_PRODUCT_SUCCESS:
      return {
        loading: false,
        featuredProducts: action.payload,
      };

    case FEATURED_PRODUCT_FAIL:
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

export const specialProductReducer = (
  state = { specialProducts: [] },
  action
) => {
  switch (action.type) {
    case SPECIAL_PRODUCT_REQUEST:
      return {
        loading: true,
        specialProducts: [],
      };

    case SPECIAL_PRODUCT_SUCCESS:
      return {
        loading: false,
        specialProducts: action.payload.special,
        totalSpecial: action.payload.specialCount,
      };

    case SPECIAL_PRODUCT_FAIL:
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
