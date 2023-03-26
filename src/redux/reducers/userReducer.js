import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  CLEAR_ERRORS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PASSWORD_REQUEST,
  DELETE_USER_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PASSWORD_SUCCESS,
  DELETE_USER_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_FAIL,
  DELETE_USER_FAIL,
  UPDATE_PASSWORD_RESET,
  UPDATE_PROFILE_RESET,
  DELETE_USER_RESET,
  USER_ADDRESS_REQUEST,
  USER_ADDRESS_SUCCESS,
  USER_ADDRESS_FAIL,
} from '../constants/userConstants';

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };

    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };

    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        error: action.payload,
        user: null,
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

export const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload.success,
        message: action.payload.message,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };

    case UPDATE_PROFILE_FAIL:
    case UPDATE_PASSWORD_FAIL:
    case DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_PROFILE_RESET:
    case UPDATE_PASSWORD_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_USER_RESET:
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

export const userAddressReducer = (state = { address: {} }, action) => {
  switch (action.type) {
    case USER_ADDRESS_REQUEST:
      return {
        loading: true,
        address: {},
      };

    case USER_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        address: action.payload,
      };

    case USER_ADDRESS_FAIL:
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
