import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import {
  featuredProductReducer,
  popularProductReducer,
  productDetailsReducer,
  productRatingsReducer,
  productReducer,
  randomProductReducer,
  relatedProductReducer,
  specialProductReducer,
} from './reducers/productReducers';
import {
  userAddressReducer,
  userProfileReducer,
  userReducer,
  forgotPasswordReducer,
} from './reducers/userReducer';
import {
  productCategoryReducer,
  productCountCategoryReducer,
  quickCategoryReducer,
} from './reducers/productCategoryReducer';
import { productBrandReducer } from './reducers/productBrandReducer';
import {
  productTypeCountReducer,
  productTypeReducer,
} from './reducers/productTypeReducer';
import { productSizeReducer } from './reducers/productSizesRducer';
import { productColorReducer } from './reducers/productColorReducer';
import {
  addCartReducer,
  cartReducer,
  updateCartReducer,
} from './reducers/cartReducer';
import {
  allCouponReducer,
  couponDetailsReducer,
  couponReducer,
} from './reducers/couponReducer';
import {
  allOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
} from './reducers/orderReducer';
import {
  allWishlistReducer,
  wishlistActionReducer,
} from './reducers/wishlistReducer';
import { compareReducer } from './reducers/compareReducer';
import {
  allBlogReducer,
  dislikeBlogReducer,
  likeBlogReducer,
  singleBlogReducer,
} from './reducers/blogReducer';
import { allBlogCategoryReducer } from './reducers/blogCategoryReducer';
import { allFaqReducer } from './reducers/faqReducer';
import { allFaqCategoryReducer } from './reducers/faqCategoryReducer';

const reducer = combineReducers({
  user: userReducer,
  userAction: userProfileReducer,
  userAddress: userAddressReducer,
  forgotPassword: forgotPasswordReducer,
  products: productReducer,
  productCategories: productCategoryReducer,
  quickCategories: quickCategoryReducer,
  productCountCategories: productCountCategoryReducer,
  productDetails: productDetailsReducer,
  randomProducts: randomProductReducer,
  relatedProducts: relatedProductReducer,
  popularProducts: popularProductReducer,
  featuredProducts: featuredProductReducer,
  specialProducts: specialProductReducer,
  productBrand: productBrandReducer,
  productType: productTypeReducer,
  productTypeCount: productTypeCountReducer,
  productSizes: productSizeReducer,
  productColors: productColorReducer,
  ratings: productRatingsReducer,
  addCart: addCartReducer,
  cart: cartReducer,
  updateCart: updateCartReducer,
  allCoupon: allCouponReducer,
  singleCoupon: couponDetailsReducer,
  couponApplied: couponReducer,
  newOrder: newOrderReducer,
  allOrders: allOrdersReducer,
  orderDetails: orderDetailsReducer,
  wishlistAction: wishlistActionReducer,
  getAllWishlist: allWishlistReducer,
  compareProducts: compareReducer,
  allBlogs: allBlogReducer,
  singleBlog: singleBlogReducer,
  blogCategory: allBlogCategoryReducer,
  likeBlog: likeBlogReducer,
  dislikeBlog: dislikeBlogReducer,
  faqs: allFaqReducer,
  faqCategories: allFaqCategoryReducer,
});

let initialState = {
  compareProducts: {
    compareItems: localStorage.getItem('compareItems')
      ? JSON.parse(localStorage.getItem('compareItems'))
      : [],
  },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
