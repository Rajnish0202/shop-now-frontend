import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Layout from './components/Layout';
import Home from './pages/Client/Home';
import OurStore from './pages/Client/OurStore';
import Wishlist from './pages/Client/Wishlist';
import Login from './pages/Client/Login';
import Signup from './pages/Client/Signup';
import ForgotPassword from './pages/Client/ForgotPassword';
import ResetPassword from './pages/Client/ResetPassword';
import SingleBlog from './pages/Client/SingleBlog';
import PrivacyPolicy from './pages/Client/PrivacyPolicy';
import RefundPolicy from './pages/Client/RefundPolicy';
import ShippingPolicy from './pages/Client/ShippingPolicy';
import TermsAndCondition from './pages/Client/TermsAndCondition';
import SingleProduct from './pages/Client/SingleProduct';
import Dashboard from './pages/Admin/Dashboard';
import MainLayout from './components/Admin/MainLayout';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser } from './redux/actions/userActions';
import { useEffect, useState } from 'react';
import {
  getProductCategories,
  getQuickCategories,
} from './redux/actions/productCategoryAction';
import { getBrands } from './redux/actions/brandAction';
import { getTypes } from './redux/actions/productTypeAction';
import { getSizes } from './redux/actions/sizeAction';
import { getAllColors } from './redux/actions/productColorAction';
import Profile from './pages/User/Profile';
import Orders from './pages/User/Orders';
import EditProfile from './pages/User/EditProfile';
import { userCart } from './redux/actions/cartAction';
import Shipping from './pages/Client/Shipping';
import PaymentMethod from './pages/Client/PaymentMethod';
import PlaceOrder from './pages/Client/PlaceOrder';
import OrderSuccess from './pages/Client/OrderSuccess';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { BACKEND_URL } from './utils/backendUrl';
import OrderDetails from './pages/User/OrderDetails';
import SizeCart from './pages/Client/SizeCart';
import { getAllFaqCategories } from './redux/actions/faqCategoryActions';
import Invoice from './pages/User/Invoice';
import Enquiries from './pages/Admin/Enquiries';
import BlogList from './pages/Admin/BlogList';
import BlogCategoryList from './pages/Admin/BlogCategoryList';
import CouponList from './pages/Admin/CouponList';
import ProductList from './pages/Admin/ProductList';
import BrandList from './pages/Admin/BrandList';
import ProductCategoryList from './pages/Admin/ProductCategoryList';
import TypeList from './pages/Admin/TypeList';
import SizeList from './pages/Admin/SizeList';
import ColorList from './pages/Admin/ColorList';
import OrderList from './pages/Admin/OrderList';
import Users from './pages/Admin/Users';
import AddBlog from './pages/Admin/AddBlog';
import OrderDetailsAdmin from './pages/Admin/OrderDetailsAdmin';

import UserDetails from './pages/Admin/UserDetails';
import AddBlogCategory from './pages/Admin/AddBlogCategory';
import AddColor from './pages/Admin/AddColor';
import AddSize from './pages/Admin/AddSize';
import AddType from './pages/Admin/AddType';
import AddProductCategory from './pages/Admin/AddProductCategory';
import AddBrand from './pages/Admin/AddBrand';
import AddProduct from './pages/Admin/AddProduct';
import AddCoupon from './pages/Admin/AddCoupon';
import UploadImage from './pages/Admin/UploadImage';
import UpdateProduct from './pages/Admin/UpdateProduct';
import UpdateBlog from './pages/Admin/UpdateBlog';
import UpdateOther from './pages/Admin/UpdateOther';
import UpdateColor from './pages/Admin/UpdateColor';
import UpdateCoupon from './pages/Admin/UpdateCoupon';
import PendingOrderList from './pages/Admin/PendingOrderList';
import ShippedOrderList from './pages/Admin/ShippedOrderList';
import DeliveredOrderList from './pages/Admin/DeliveredOrderList';
import OutForDeliveredList from './pages/Admin/OutForDeliveredList';
import UpdateOrderStatus from './pages/Admin/UpdateOrderStatus';
import Blogs from './pages/Client/Blogs';
import About from './pages/Client/About';
import Contact from './pages/Client/Contact';
import Cart from './pages/Client/Cart';
import Compare from './pages/Client/Compare';
import Faq from './pages/Client/Faq';
import UpdateUserRole from './pages/Admin/UpdateUserRole';

axios.defaults.withCredentials = true;

function App() {
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [brand, setBrand] = useState('');

  const { isAuthenticated, error } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(loadUser());
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    async function getStripeApiKey() {
      const { data } = await axios.get(`${BACKEND_URL}/payment/stripeApiKey`);
      setStripeApiKey(data.stripeApiKey);
    }

    getStripeApiKey();

    dispatch(getProductCategories());
    dispatch(getQuickCategories());
    dispatch(getBrands());
    dispatch(getTypes());
    dispatch(getSizes());
    dispatch(getAllColors());
    dispatch(userCart());
    dispatch(getAllFaqCategories());
  }, [dispatch, error, isAuthenticated]);

  return (
    <Router>
      <ToastContainer
        position='bottom-left'
        theme='colored'
        draggable='true'
        style={{ fontSize: '16px' }}
      />
      <Routes>
        <Route path='/' element={<Layout setCategory={setCategory} />}>
          <Route
            index
            element={
              <Home
                setCategory={setCategory}
                setType={setType}
                setBrand={setBrand}
              />
            }
          />

          <Route path='/ourstore'>
            <Route
              index
              element={
                <OurStore
                  setCategory={setCategory}
                  category={category}
                  setType={setType}
                  type={type}
                  brand={brand}
                  setBrand={setBrand}
                />
              }
            />
            <Route
              path=':keyword'
              element={
                <OurStore
                  setCategory={setCategory}
                  category={category}
                  setType={setType}
                  type={type}
                  brand={brand}
                  setBrand={setBrand}
                />
              }
            />
          </Route>

          <Route path='/product/:slug' element={<SingleProduct />} />

          <Route path='/blogs' element={<Blogs />} />
          <Route path='/blogs/:id' element={<SingleBlog />} />

          <Route path='/about-us' element={<About />} />

          <Route path='/contact' element={<Contact />} />

          <Route
            path='/cart'
            element={isAuthenticated ? <Cart /> : <Login />}
          />

          <Route
            path='/shipping'
            element={isAuthenticated ? <Shipping /> : <Login />}
          />

          <Route
            path='/payment-method'
            element={isAuthenticated ? <PaymentMethod /> : <Login />}
          />

          {stripeApiKey && (
            <Route
              path='/placeorder'
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  {isAuthenticated ? <PlaceOrder /> : <Login />}
                </Elements>
              }
            />
          )}

          <Route
            path='/order-success'
            element={isAuthenticated ? <OrderSuccess /> : <Login />}
          />

          <Route path='/compare-product' element={<Compare />} />

          <Route path='/wishlist' element={<Wishlist />} />

          <Route path='/login' element={<Login />} />

          <Route path='/register' element={<Signup />} />

          <Route path='/forgot-password' element={<ForgotPassword />} />

          <Route path='/reset-password/:token' element={<ResetPassword />} />

          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/refund-policy' element={<RefundPolicy />} />
          <Route path='/shipping-policy' element={<ShippingPolicy />} />
          <Route path='/termsandconditions' element={<TermsAndCondition />} />
          <Route path='/faq' element={<Faq />} />
          <Route path='/size-chart' element={<SizeCart />} />

          <Route
            path='/user-profile'
            element={isAuthenticated ? <Profile /> : <Login />}
          />
          <Route
            path='/user-orders'
            element={isAuthenticated ? <Orders /> : <Login />}
          />

          <Route
            path='/user-orders/:id'
            element={isAuthenticated ? <OrderDetails /> : <Login />}
          />
          <Route
            path='/invoice/:id'
            element={isAuthenticated ? <Invoice /> : <Login />}
          />

          <Route
            path='/user-profile/update'
            element={isAuthenticated ? <EditProfile /> : <Login />}
          />
        </Route>

        <Route path='/admin/dashboard' element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='enquiry' element={<Enquiries />} />
          <Route path='blog-list' element={<BlogList />} />
          <Route path='blog-category-list' element={<BlogCategoryList />} />
          <Route path='coupons-list' element={<CouponList />} />
          <Route path='product-list' element={<ProductList />} />
          <Route path='brand-list' element={<BrandList />} />
          <Route path='category-list' element={<ProductCategoryList />} />
          <Route path='type-list' element={<TypeList />} />
          <Route path='size-list' element={<SizeList />} />
          <Route path='color-list' element={<ColorList />} />
          <Route path='all_orders' element={<OrderList />} />
          <Route path='pending_orders' element={<PendingOrderList />} />
          <Route path='shipped_orders' element={<ShippedOrderList />} />
          <Route path='delivered_orders' element={<DeliveredOrderList />} />
          <Route
            path='out_for_delivery_orders'
            element={<OutForDeliveredList />}
          />
          <Route
            path='order-details/:orderId'
            element={<OrderDetailsAdmin />}
          />
          <Route path='users' element={<Users />} />
          <Route path='user-details/:userId' element={<UserDetails />} />
          <Route path='add-blog' element={<AddBlog />} />
          <Route path='all-blog-category' element={<AddBlogCategory />} />
          <Route path='add-color' element={<AddColor />} />
          <Route path='add-size' element={<AddSize />} />
          <Route path='add-type' element={<AddType />} />
          <Route path='add-category' element={<AddProductCategory />} />
          <Route path='add-brand' element={<AddBrand />} />
          <Route path='add-product' element={<AddProduct />} />
          <Route path='add-coupons' element={<AddCoupon />} />
          <Route path='upload-image/:page/:id' element={<UploadImage />} />
          <Route path='edit-product/:slug' element={<UpdateProduct />} />
          <Route path='edit-blog/:id' element={<UpdateBlog />} />
          <Route path='edit/:page/:id' element={<UpdateOther />} />
          <Route path='edit-color/:id' element={<UpdateColor />} />
          <Route path='edit-coupon/:id' element={<UpdateCoupon />} />
          <Route
            path='update-status/:page/:id'
            element={<UpdateOrderStatus />}
          />
          <Route path='update-user-role/:id' element={<UpdateUserRole />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
