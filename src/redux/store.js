import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productDetailsReducer,
  productReducer,
  randomProductReducer,
  relatedProductReducer,
} from './reducers/productReducers';
import {
  userAddressReducer,
  userProfileReducer,
  userReducer,
} from './reducers/userReducer';
import { productCategoryReducer } from './reducers/productCategoryReducer';
import { productBrandReducer } from './reducers/productBrandReducer';
import { productTypeReducer } from './reducers/productTypeReducer';
import { productSizeReducer } from './reducers/productSizesRducer';
import { productColorReducer } from './reducers/productColorReducer';
import { addCartReducer, cartReducer } from './reducers/cartReducer';
import {
  allCouponReducer,
  couponDetailsReducer,
  couponReducer,
} from './reducers/couponReducer';
import { newOrderReducer } from './reducers/orderReducer';

const reducer = combineReducers({
  user: userReducer,
  userAction: userProfileReducer,
  userAddress: userAddressReducer,
  products: productReducer,
  productCategories: productCategoryReducer,
  productDetails: productDetailsReducer,
  randomProducts: randomProductReducer,
  relatedProducts: relatedProductReducer,
  productBrand: productBrandReducer,
  productType: productTypeReducer,
  productSizes: productSizeReducer,
  productColors: productColorReducer,
  addCart: addCartReducer,
  cart: cartReducer,
  allCoupon: allCouponReducer,
  singleCoupon: couponDetailsReducer,
  couponApplied: couponReducer,
  newOrder: newOrderReducer,
});

let initialState = {
  cart: {
    cartItems: [],
  },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
