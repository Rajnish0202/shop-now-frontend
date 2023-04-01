import axios from 'axios';
import { BACKEND_URL } from '../../utils/backendUrl';
import { toast } from 'react-toastify';
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  RELATED_PRODUCT_REQUEST,
  RELATED_PRODUCT_SUCCESS,
  RELATED_PRODUCT_FAIL,
  RANDOM_PRODUCT_SUCCESS,
  RANDOM_PRODUCT_FAIL,
  RANDOM_PRODUCT_REQUEST,
  RATING_PRODUCT_REQUEST,
  RATING_PRODUCT_SUCCESS,
  RATING_PRODUCT_FAIL,
} from '../constants/productConstants';

export const getProducts =
  (
    keyword = '',
    limit = '',
    category,
    brand,
    stock,
    price = [0, 100000],
    type,
    rating,
    sortBy = '',
    sizes,
    color
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      let link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&totalRating[gte]=${rating}&sort=${sortBy}`;

      if (category) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (brand) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&brand=${brand}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (stock) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${price[1]}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (type) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&type=${type}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (sizes) {
        link = `${BACKEND_URL}/product?&keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&sizes=${sizes}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (color) {
        link = `${BACKEND_URL}/product?&keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&color=${color}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (category && brand) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&brand=${brand}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (category && stock) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${price[1]}&category=${category}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (type && category) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&type=${type}&category=${category}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (brand && stock) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${price[1]}&brand=${brand}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (type && brand) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&type=${type}&brand=${brand}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (type && stock) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${price[1]}&type=${type}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (sizes && category) {
        link = `${BACKEND_URL}/product?&keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&sizes=${sizes}&category=${category}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (sizes && brand) {
        link = `${BACKEND_URL}/product?&keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&sizes=${sizes}&brand=${brand}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (sizes && stock) {
        link = `${BACKEND_URL}/product?&keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${price[1]}&sizes=${sizes}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (sizes && type) {
        link = `${BACKEND_URL}/product?&keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&sizes=${sizes}&type=${type}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (sizes && color) {
        link = `${BACKEND_URL}/product?&keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&sizes=${sizes}&color=${color}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (type && color) {
        link = `${BACKEND_URL}/product?&keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&type=${type}&color=${color}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (brand && color) {
        link = `${BACKEND_URL}/product?&keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&brand=${brand}&color=${color}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (category && color) {
        link = `${BACKEND_URL}/product?&keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&color=${color}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (stock && color) {
        link = `${BACKEND_URL}/product?&keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${price[1]}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&color=${color}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (category && brand && stock) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${price[1]}&category=${category}&brand=${brand}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (type && stock && brand) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${price[1]}&type=${type}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&brand=${brand}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (type && category && brand) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&type=${type}&category=${category}&brand=${brand}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (type && category && stock) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${price[1]}&type=${type}&category=${category}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (sizes && category && brand) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&sizes=${sizes}&category=${category}&brand=${brand}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (sizes && category && stock) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${price[1]}&sizes=${sizes}&category=${category}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (sizes && category && type) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&sizes=${sizes}&category=${category}&type=${type}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (sizes && brand && stock) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${price[1]}&sizes=${sizes}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&brand=${brand}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (sizes && brand && type) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&sizes=${sizes}&brand=${brand}&type=${type}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (sizes && type && stock) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${price[1]}&sizes=${sizes}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&type=${type}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (color && type && stock) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${price[1]}&color=${color}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&type=${type}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (color && sizes && stock) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${price[1]}&color=${color}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&sizes=${sizes}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (color && brand && stock) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${price[1]}&color=${color}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&brand=${brand}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (color && category && stock) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${price[1]}&color=${color}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&category=${category}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (color && category && brand) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&color=${color}&brand=${brand}&category=${category}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (color && category && type) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&color=${color}&type=${type}&category=${category}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (color && brand && type) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&color=${color}&type=${type}&brand=${brand}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (color && sizes && type) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&color=${color}&type=${type}&sizes=${sizes}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (color && sizes && brand) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&color=${color}&brand=${brand}&sizes=${sizes}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (color && sizes && category) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&color=${color}&category=${category}&sizes=${sizes}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (type && category && brand && stock) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${price[1]}&category=${category}&brand=${brand}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&type=${type}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (sizes && category && brand && stock) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${price[1]}&category=${category}&brand=${brand}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&sizes=${sizes}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (sizes && type && brand && stock) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${price[1]}&type=${type}&brand=${brand}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&sizes=${sizes}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (sizes && type && category && stock) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${price[1]}&type=${type}&category=${category}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&sizes=${sizes}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (sizes && type && category && brand) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&type=${type}&category=${category}&brand=${brand}&sizes=${sizes}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (sizes && color && category && brand) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&color=${color}&category=${category}&brand=${brand}&sizes=${sizes}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (stock && color && category && brand) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${
          price[1]
        }&color=${color}&category=${category}&brand=${brand}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (type && color && category && brand) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&color=${color}&category=${category}&brand=${brand}&type=${type}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (stock && color && sizes && brand) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${
          price[1]
        }&color=${color}&sizes=${sizes}&brand=${brand}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (type && color && sizes && brand) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&color=${color}&sizes=${sizes}&brand=${brand}&type=${type}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (stock && color && type && brand) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${
          price[1]
        }&color=${color}&type=${type}&brand=${brand}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (stock && color && sizes && category) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${
          price[1]
        }&color=${color}&sizes=${sizes}&category=${category}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (type && color && sizes && category) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&color=${color}&sizes=${sizes}&category=${category}&type=${type}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (stock && color && type && category) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${
          price[1]
        }&color=${color}&type=${type}&category=${category}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (stock && color && type && sizes) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${
          price[1]
        }&color=${color}&type=${type}&sizes=${sizes}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (sizes && type && category && brand && stock) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${
          price[1]
        }&type=${type}&category=${category}&brand=${brand}&sizes=${sizes}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (sizes && color && category && brand && stock) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${
          price[1]
        }&color=${color}&category=${category}&brand=${brand}&sizes=${sizes}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (sizes && color && category && brand && type) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&color=${color}&category=${category}&brand=${brand}&sizes=${sizes}&type=${type}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (type && color && category && brand && stock) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${
          price[1]
        }&color=${color}&category=${category}&brand=${brand}&type=${type}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (type && color && sizes && brand && stock) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${
          price[1]
        }&color=${color}&sizes=${sizes}&brand=${brand}&type=${type}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (type && color && sizes && category && stock) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${
          price[1]
        }&color=${color}&sizes=${sizes}&category=${category}&type=${type}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      if (type && color && sizes && category && stock && brand) {
        link = `${BACKEND_URL}/product?keyword=${keyword}&limit=${limit}&price[gte]=${
          price[0]
        }&price[lte]=${
          price[1]
        }&color=${color}&sizes=${sizes}&category=${category}&type=${type}&quantity[${
          stock === 1 ? 'gte' : 'eq'
        }]=${stock}&brand=${brand}&totalRating[gte]=${rating}&sort=${sortBy}`;
      }

      const { data } = await axios.get(link);

      dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload:
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString(),
      });
    }
  };

// Product Details

export const productDetails = (slug) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/product/${slug}`);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

export const productRatings =
  (productId, star, comment) => async (dispatch) => {
    try {
      dispatch({ type: RATING_PRODUCT_REQUEST });

      const { data } = await axios.put(`${BACKEND_URL}/product/rating`, {
        productId,
        star,
        comment,
      });

      dispatch({ type: RATING_PRODUCT_SUCCESS, payload: data.finalProduct });
    } catch (error) {
      dispatch({
        type: RATING_PRODUCT_FAIL,
        payload:
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString(),
      });
    }
  };

export const getRandomProduct = () => async (dispatch) => {
  try {
    dispatch({ type: RANDOM_PRODUCT_REQUEST });

    const { data } = await axios.get(`${BACKEND_URL}/product/random-product`);

    dispatch({ type: RANDOM_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RANDOM_PRODUCT_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
    toast.error(error);
  }
};

export const getRelatedProducts =
  (productId, categoryId) => async (dispatch) => {
    try {
      dispatch({ type: RELATED_PRODUCT_REQUEST });

      const { data } = await axios.get(
        `${BACKEND_URL}/product/related-product/${productId}/${categoryId}`
      );

      dispatch({ type: RELATED_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: RELATED_PRODUCT_FAIL,
        payload:
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString(),
      });
      toast.error(error);
    }
  };

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
