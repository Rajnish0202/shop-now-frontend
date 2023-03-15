import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productDetailsReducer,
  productReducer,
  relatedProductReducer,
} from './reducers/productReducers';
import { userReducer } from './reducers/userReducer';
import { productCategoryReducer } from './reducers/productCategoryReducer';

const reducer = combineReducers({
  user: userReducer,
  products: productReducer,
  productCategories: productCategoryReducer,
  productDetails: productDetailsReducer,
  relatedProducts: relatedProductReducer,
});

let initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
