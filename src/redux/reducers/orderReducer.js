import { CLEAR_ERRORS } from '../constants/couponConstant';
import {
  ALL_ORDERS_ADMIN_FAIL,
  ALL_ORDERS_ADMIN_REQUEST,
  ALL_ORDERS_ADMIN_SUCCESS,
  ALL_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_RESET,
  CREATE_ORDER_SUCCESS,
  DELIVERED_ORDERS_FAIL,
  DELIVERED_ORDERS_REQUEST,
  DELIVERED_ORDERS_SUCCESS,
  GET_MONTLY_ORDER_INCOME_FAIL,
  GET_MONTLY_ORDER_INCOME_REQUEST,
  GET_MONTLY_ORDER_INCOME_SUCCESS,
  ORDER_DETAILS_ADMIN_FAIL,
  ORDER_DETAILS_ADMIN_REQUEST,
  ORDER_DETAILS_ADMIN_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  OUT_FOR_DELIVERY_FAIL,
  OUT_FOR_DELIVERY_REQUEST,
  OUT_FOR_DELIVERY_SUCCESS,
  PENDING_ORDERS_FAIL,
  PENDING_ORDERS_REQUEST,
  PENDING_ORDERS_SUCCESS,
  SHIPPED_ORDERS_FAIL,
  SHIPPED_ORDERS_REQUEST,
  SHIPPED_ORDERS_SUCCESS,
  UPDATE_ORDER_STATUS_FAIL,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_RESET,
  UPDATE_ORDER_STATUS_SUCCESS,
  GET_YEARLY_ORDER_REQUEST,
  GET_YEARLY_ORDER_SUCCESS,
  GET_YEARLY_ORDER_FAIL,
} from '../constants/orderConstants';

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        orderPlaced: true,
        order: action.payload,
      };

    case CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CREATE_ORDER_RESET:
      return {
        ...state,
        orderPlaced: false,
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

export const allOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDERS_REQUEST:
      return {
        loading: true,
        orders: [],
      };

    case ALL_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };

    case ALL_ORDERS_FAIL:
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

export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };

    case ORDER_DETAILS_FAIL:
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

// Admin

export const allAdminOrdersReducer = (state = { adminOrders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDERS_ADMIN_REQUEST:
    case PENDING_ORDERS_REQUEST:
    case SHIPPED_ORDERS_REQUEST:
    case DELIVERED_ORDERS_REQUEST:
    case OUT_FOR_DELIVERY_REQUEST:
      return {
        loading: true,
        adminOrders: [],
      };

    case ALL_ORDERS_ADMIN_SUCCESS:
    case PENDING_ORDERS_SUCCESS:
    case SHIPPED_ORDERS_SUCCESS:
    case DELIVERED_ORDERS_SUCCESS:
    case OUT_FOR_DELIVERY_SUCCESS:
      return {
        loading: false,
        adminOrders: action.payload,
      };

    case ALL_ORDERS_ADMIN_FAIL:
    case PENDING_ORDERS_FAIL:
    case SHIPPED_ORDERS_FAIL:
    case DELIVERED_ORDERS_FAIL:
    case OUT_FOR_DELIVERY_FAIL:
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

export const orderDetailsAdminReducer = (
  state = { adminOrder: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_ADMIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_DETAILS_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        adminOrder: action.payload,
      };

    case ORDER_DETAILS_ADMIN_FAIL:
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

export const updateStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_ORDER_STATUS_SUCCESS:
      return {
        loading: false,
        statusUpdated: action.payload.success,
      };

    case UPDATE_ORDER_STATUS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case UPDATE_ORDER_STATUS_RESET:
      return {
        ...state,
        statusUpdated: false,
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

export const getMonthlyOrdersIncomeReducer = (
  state = { monthlyIncome: [] },
  action
) => {
  switch (action.type) {
    case GET_MONTLY_ORDER_INCOME_REQUEST:
      return {
        loading: true,
        monthlyIncome: [],
      };

    case GET_MONTLY_ORDER_INCOME_SUCCESS:
      return {
        loading: false,
        monthlyIncome: action.payload,
      };

    case GET_MONTLY_ORDER_INCOME_FAIL:
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

export const getYearlyOrdersIncomeReducer = (
  state = { yearlyIncome: {} },
  action
) => {
  switch (action.type) {
    case GET_YEARLY_ORDER_REQUEST:
      return {
        loading: true,
        yearlyIncome: {},
      };

    case GET_YEARLY_ORDER_SUCCESS:
      return {
        loading: false,
        yearlyIncome: action.payload,
      };

    case GET_YEARLY_ORDER_FAIL:
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
