import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productDetailsReducer,
  productReducer,
  randomProductReducer,
  relatedProductReducer,
} from './reducers/productReducers';
import { userReducer } from './reducers/userReducer';
import { productCategoryReducer } from './reducers/productCategoryReducer';
import { productBrandReducer } from './reducers/productBrandReducer';
import { productTypeReducer } from './reducers/productTypeReducer';
import { productSizeReducer } from './reducers/productSizesRducer';
import { productColorReducer } from './reducers/productColorReducer';

const reducer = combineReducers({
  user: userReducer,
  products: productReducer,
  productCategories: productCategoryReducer,
  productDetails: productDetailsReducer,
  randomProducts: randomProductReducer,
  relatedProducts: relatedProductReducer,
  productBrand: productBrandReducer,
  productType: productTypeReducer,
  productSizes: productSizeReducer,
  productColors: productColorReducer,
});

let initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
