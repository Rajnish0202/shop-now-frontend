import axios from 'axios';
import { BACKEND_URL } from '../../utils/backendUrl';
import {
  CLEAR_ERRORS,
  UPDATE_FAIL,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
} from '../constants/updateConstants';

export const updateAction = (id, formData, page) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_REQUEST });

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      withCredentials: true,
    };

    const { data } = await axios.put(
      `${BACKEND_URL}/${page}/${id}`,
      formData,
      config
    );

    dispatch({ type: UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

// export const updateBrand = (id, formData) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_REQUEST });

//     const config = {
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       mode: 'cors',
//       credentials: 'include',
//       withCredentials: true,
//     };

//     const { data } = await axios.put(
//       `${BACKEND_URL}/brand/${id}`,
//       formData,
//       config
//     );

//     dispatch({ type: UPDATE_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_FAIL,
//       payload:
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString(),
//     });
//   }
// };

// export const updateProductCategory = (id, formData) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_REQUEST });

//     const config = {
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       mode: 'cors',
//       credentials: 'include',
//       withCredentials: true,
//     };

//     const { data } = await axios.put(
//       `${BACKEND_URL}/product-category/${id}`,
//       formData,
//       config
//     );

//     dispatch({ type: UPDATE_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_FAIL,
//       payload:
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString(),
//     });
//   }
// };

// export const updateProductType = (id, formData) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_REQUEST });

//     const config = {
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       mode: 'cors',
//       credentials: 'include',
//       withCredentials: true,
//     };

//     const { data } = await axios.put(
//       `${BACKEND_URL}/product-type/${id}`,
//       formData,
//       config
//     );

//     dispatch({ type: UPDATE_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_FAIL,
//       payload:
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString(),
//     });
//   }
// };

// export const updateProductSize = (id, formData) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_REQUEST });

//     const config = {
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       mode: 'cors',
//       credentials: 'include',
//       withCredentials: true,
//     };

//     const { data } = await axios.put(
//       `${BACKEND_URL}/product-size/${id}`,
//       formData,
//       config
//     );

//     dispatch({ type: UPDATE_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_FAIL,
//       payload:
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString(),
//     });
//   }
// };

// Clearing Errors

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
