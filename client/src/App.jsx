import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProductListing from "./pages/ProductListing";
import ContactModal from "./components/ContactModal.jsx";
import "./App.css";
import ProductDetails from "./pages/ProductDetails";
import Dashboard from "./pages/Dashboard";
import CartPage from "./pages/CartPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logout, setUser } from "./redux/state";
import AboutUs from "./pages/AboutUs";
// import ContactFormModal from "./components/contactForm";
import Wishlist from "./pages/Wishlist";
import BuyNow from "./pages/BuyNow";
import OrdersPage from "./components/OrdersPage";
import BlogPage from "./pages/BlogPage";
import BlogPostDetail from "./components/BlogPostDetail";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ForgotPassword from "./pages/ForgetPassword.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import OrderDetailsAdmin from "./pages/OrderDetailsAdmin.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import ReturnPolicy from "./pages/ReturnPolicy.jsx";
import PaymentPolicy from "./pages/PaymentPolicy.jsx";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";
import ResetPassword from "./pages/ResetPass.jsx";

function App() {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      if (token && !user) {
        try {
          const response = await fetch(`${URL}/auth/user`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          if (response.ok) {
            dispatch(setUser(data.user));
          } else {
            dispatch(logout());
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          dispatch(logout());
        }
      }
    };
    fetchUser();
  }, [token, dispatch]);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product-listing" element={<ProductListing />} />
          <Route
            path="/product-listing/:sareeCategory"
            element={<ProductListing />}
          />
          <Route
            path="/product-details/:productId"
            element={<ProductDetails />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/buy-now" element={<BuyNow />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/order/order-details/" element={<OrderDetails />} />
          <Route
            path="/order/order-details/admin/:id"
            element={<OrderDetailsAdmin />}
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactModal />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blogdetails" element={<BlogPostDetail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/payment-policy" element={<PaymentPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />

          {/* <Route path="/reset" element={<ResetPassword />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
