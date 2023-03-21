import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import OurStore from './pages/OurStore';
import Blogs from './pages/Blogs';
import Compare from './pages/Compare';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import SingleBlog from './pages/SingleBlog';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import TermsAndCondition from './pages/TermsAndCondition';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Admin/Dashboard';
import MainLayout from './components/Admin/MainLayout';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser } from './redux/actions/userActions';
import { useEffect } from 'react';
import { getProductCategories } from './redux/actions/productCategoryAction';
import { getBrands } from './redux/actions/brandAction';
import { getTypes } from './redux/actions/productTypeAction';
import { getSizes } from './redux/actions/sizeAction';
import { getAllColors } from './redux/actions/productColorAction';

axios.defaults.withCredentials = true;

function App() {
  const { isAuthenticated, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(loadUser());
    } else {
      toast.info('You are not authorized,please login.');
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProductCategories());
    dispatch(getBrands());
    dispatch(getTypes());
    dispatch(getSizes());
    dispatch(getAllColors());
  }, [dispatch, error]);

  return (
    <Router>
      <ToastContainer
        position='bottom-left'
        theme='colored'
        draggable='true'
        style={{ fontSize: '16px' }}
      />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />

          <Route path='/ourstore' element={<OurStore />} />
          <Route path='/ourstore/:keyword' element={<OurStore />} />

          <Route path='/product/:slug' element={<SingleProduct />} />

          <Route path='/blogs' element={<Blogs />} />
          <Route path='/blogs/:id' element={<SingleBlog />} />

          <Route path='/about' element={<About />} />

          <Route path='/contact' element={<Contact />} />

          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />

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
        </Route>

        <Route path='/admin' element={<MainLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
