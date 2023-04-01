import {
  ADD_TO_COMPARE,
  REMOVE_FROM_COMPARE,
} from '../constants/compareConstant';

export const compareReducer = (state = { compareItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_COMPARE:
      const item = action.payload;

      const isItemExit = state.compareItems.find((i) => i?._id === item?._id);

      if (isItemExit) {
        return {
          ...state,
          compareItems: state.compareItems.map((i) =>
            i._id === isItemExit._id ? item : i
          ),
        };
      } else {
        return {
          ...state,
          compareItems: [...state.compareItems, item],
        };
      }

    case REMOVE_FROM_COMPARE:
      return {
        ...state,
        compareItems: state.compareItems.filter(
          (i) => i._id !== action.payload
        ),
      };

    default:
      return state;
  }
};
