import axios from 'axios';
import {
  CLEAR_ERRORS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  USER_ADDRESS_FAIL,
  USER_ADDRESS_REQUEST,
  USER_ADDRESS_SUCCESS,
} from '../constants/userConstants';

import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../utils/backendUrl';

// Register User

export const registerUser = (formData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${BACKEND_URL}/user/register`,
      formData,
      config
    );

    dispatch({ type: REGISTER_SUCCESS, payload: data.user });
    toast.success('User Registered Successfully.');
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

// Login User

export const loginUser = (formData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // mode: 'cors',
      // credentials: 'include',
      // withCredentials: true,
    };

    const { data } = await axios.post(
      `${BACKEND_URL}/user/login`,
      formData,
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data });

    toast.success('User Logged In Successfully.');
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

// Login User

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      withCredentials: true,
    };

    const { data } = await axios.get(`${BACKEND_URL}/user/loaduser`, config);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
    toast.info(error);
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      withCredentials: true,
    };

    await axios.get(`${BACKEND_URL}/user/logout`, config);

    dispatch({ type: LOGOUT_SUCCESS });
    toast.success('User Logged Out Successfully.');
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
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

// User Profile

export const profileUpdate = (formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

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
      `${BACKEND_URL}/user/edit-user`,
      formData,
      config
    );

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
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

export const passwordUpdate = (formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

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
      `${BACKEND_URL}/user/password`,
      formData,
      config
    );

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data });
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
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

export const saveAddress = (formData) => async (dispatch) => {
  try {
    dispatch({ type: USER_ADDRESS_REQUEST });

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
      `${BACKEND_URL}/user/address`,
      formData,
      config
    );

    dispatch({ type: USER_ADDRESS_SUCCESS, payload: data.address });
    localStorage.setItem('address', JSON.stringify(data.address.address));
    toast.success('Address Saved Successfully.');
  } catch (error) {
    dispatch({
      type: USER_ADDRESS_FAIL,
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

// export const deleteUser = () => async (dispatch) => {
//   try {
//     dispatch({ type: USER_ADDRESS_REQUEST });

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
//       `${BACKEND_URL}/user/address`,
//       formData,
//       config
//     );

//     dispatch({ type: USER_ADDRESS_SUCCESS, payload: data.address });
//     localStorage.setItem('address', JSON.stringify(data.address.address));
//     toast.success('Address Saved Successfully.');
//   } catch (error) {
//     dispatch({
//       type: USER_ADDRESS_FAIL,
//       payload:
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString(),
//     });
//     toast.error(error);
//   }
// };

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
