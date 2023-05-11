import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import {
  createProductReducer,
  featuredProductReducer,
  popularProductReducer,
  productActionsReducer,
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
  allUsersReducer,
  userDetailsReducer,
  adminActionReducer,
} from './reducers/userReducer';
import {
  productCategoryActionsReducer,
  productCategoryReducer,
  productCountCategoryReducer,
  quickCategoryReducer,
  createProductCategoryReducer,
} from './reducers/productCategoryReducer';
import {
  brandActionsReducer,
  productBrandReducer,
  createBrandReducer,
} from './reducers/productBrandReducer';
import {
  createTypeReducer,
  productTypeActionsReducer,
  productTypeCountReducer,
  productTypeReducer,
} from './reducers/productTypeReducer';
import {
  createSizeReducer,
  productSizeActionsReducer,
  productSizeReducer,
} from './reducers/productSizesRducer';
import {
  createColorReducer,
  productColorReducer,
} from './reducers/productColorReducer';
import {
  addCartReducer,
  cartReducer,
  updateCartReducer,
} from './reducers/cartReducer';
import {
  allCouponReducer,
  couponActionsReducer,
  couponDetailsReducer,
  couponReducer,
  createCouponReducer,
} from './reducers/couponReducer';
import {
  allAdminOrdersReducer,
  allOrdersReducer,
  newOrderReducer,
  orderDetailsAdminReducer,
  orderDetailsReducer,
} from './reducers/orderReducer';
import {
  allWishlistReducer,
  wishlistActionReducer,
} from './reducers/wishlistReducer';
import { compareReducer } from './reducers/compareReducer';
import {
  allBlogReducer,
  blogActionsReducer,
  createBlogReducer,
  dislikeBlogReducer,
  likeBlogReducer,
  singleBlogReducer,
} from './reducers/blogReducer';
import {
  allBlogCategoryReducer,
  blogCategoryActionsReducer,
  createBlogCategoryReducer,
} from './reducers/blogCategoryReducer';
import { allFaqReducer } from './reducers/faqReducer';
import { allFaqCategoryReducer } from './reducers/faqCategoryReducer';
import { productColorActionsReducer } from './reducers/productColorReducer';

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
  adminOrders: allAdminOrdersReducer,
  adminOrderDetails: orderDetailsAdminReducer,
  adminUsers: allUsersReducer,
  adminUserDetails: userDetailsReducer,
  adminActions: adminActionReducer,
  productActions: productActionsReducer,
  brandActions: brandActionsReducer,
  productCategoryAction: productCategoryActionsReducer,
  typeActions: productTypeActionsReducer,
  colorActions: productColorActionsReducer,
  sizeActions: productSizeActionsReducer,
  blogActions: blogActionsReducer,
  blogCategoryActions: blogCategoryActionsReducer,
  couponActions: couponActionsReducer,
  newBlog: createBlogReducer,
  newBlogCategory: createBlogCategoryReducer,
  newColor: createColorReducer,
  newSize: createSizeReducer,
  newType: createTypeReducer,
  newProductCategory: createProductCategoryReducer,
  newBrand: createBrandReducer,
  newCoupon: createCouponReducer,
  newProduct: createProductReducer,
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
