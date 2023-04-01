// ADD TO COMPARE

import axios from 'axios';
import { BACKEND_URL } from '../../utils/backendUrl';
import {
  ADD_TO_COMPARE,
  REMOVE_FROM_COMPARE,
} from '../constants/compareConstant';

export const addItemsToCompare = (slug) => async (dispatch, getState) => {
  const { data } = await axios.get(`${BACKEND_URL}/product/${slug}`);

  dispatch({ type: ADD_TO_COMPARE, payload: data?.product });

  localStorage.setItem(
    'compareItems',
    JSON.stringify(getState().compareProducts.compareItems)
  );
};

// REMOVE ITEMS FROM COMPARE

export const removeItemsFromCompare = (id) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_FROM_COMPARE, payload: id });
  localStorage.setItem(
    'compareItems',
    JSON.stringify(getState().compareProducts.compareItems)
  );
};
