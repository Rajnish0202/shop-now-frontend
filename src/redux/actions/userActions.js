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
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
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
      mode: 'cors',
      credentials: 'include',
      withCredentials: true,
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

// FORGOT PASSWORD

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   mode: 'cors',
    //   credentials: 'include',
    //   withCredentials: true,
    // };

    const { data } = await axios.post(
      `${BACKEND_URL}/user/forgot-password`,
      { email }
      // config
    );

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};

// RESET PASSWORD

export const resetPassword =
  (password, confirmPassword, resetToken) => async (dispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });

      // const config = {
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   // mode: 'cors',
      //   // credentials: 'include',
      //   // withCredentials: true,
      // };

      const { data } = await axios.put(
        `${BACKEND_URL}/user/reset-password/${resetToken}`,
        { password, confirmPassword }
        // config
      );

      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });
      toast.success('Password Reset Successfuly, Please Login.');
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
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

// Admin

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      withCredentials: true,
    };

    const { data } = await axios.get(`${BACKEND_URL}/user/all-users`, config);

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.getUsers });
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAIL,
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

export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      withCredentials: true,
    };

    const { data } = await axios.get(`${BACKEND_URL}/user/${id}`, config);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.getUser });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
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

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
      withCredentials: true,
    };

    const { data } = await axios.delete(`${BACKEND_URL}/user/${id}`, config);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(),
    });
  }
};
