import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/cartpage.css";
import Navbar from "../includes/Navbar";
import Footer from "../includes/Footer";

import CartProduct from "../components/CartProduct";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user);
  const userId = user?._id;

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetch(`${URL}/cart-related/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setCart(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching cart:", error);
          setLoading(false);
        });
    }
  }, [userId]);

  const handleCheckout = () => {
    if (cart?.items.length > 0) {
      navigate("/buy-now", { state: { cartItems: cart.items } });
    }
  };

  const handleRemoveFromCart = (productId) => {
    console.log(productId);

    setCart((prevCart) => {
      if (!prevCart || !prevCart.items) {
        console.warn("Cart state is undefined or empty:", prevCart);
        return prevCart;
      }

      const precartItems = prevCart.items;

      precartItems.map((items) => {
        console.log(items.productId);
        console.log(items.productId._id);
      });

      const updatedItems = prevCart.items.filter(
        (item) => item.productId._id.toString() !== productId.toString()
      );

      return {
        ...prevCart,
        items: [...updatedItems],
      };
    });
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setCart((prevCart) => {
      if (!prevCart || !prevCart.items) return prevCart;

      const updatedItems = prevCart.items.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      );

      return { ...prevCart, items: updatedItems };
    });
  };

  console.log(cart);

  const subtotal =
    cart?.items.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
  return (
    <>
      <Navbar />
      <div
        className="cart-container"
        style={{ padding: "5px", margin: "0 10px" }}
      >
        <div className="row cart-row mb-5 mt-4">
          {/* Left Section – Cart Products */}
          <div className="col-md-8">
            {loading ? (
              <p>Loading cart...</p>
            ) : cart?.items.length > 0 ? (
              cart.items.map((item, index) => (
                <>
                  {" "}
                  <CartProduct
                    key={index}
                    product={item}
                    onRemove={handleRemoveFromCart}
                    onQuantityChange={handleQuantityChange}
                    userId={userId}
                  />
                </>
              ))
            ) : (
              <div className="mt-5 mb-5 empty-cart-div">
                <img
                  className="mb-5"
                  src="/images/undraw_empty-cart_574u.svg"
                  alt="Cart Illustration"
                  style={{ width: "230px", height: "230px" }}
                />
                <p>Your cart is empty! Start shopping now.</p>
              </div>
            )}
          </div>

          {cart?.items.length > 0 ? (
            <>
              <div className="col-md-4 summary-col">
                <div className="cart-summary shadow-sm">
                  <h5
                    className="text-start mb-4"
                    style={{ fontSize: "15px", fontWeight: "500" }}
                  >
                    Order Summary
                  </h5>
                  <div className="d-flex justify-content-between">
                    <span>Subtotal</span>
                    {/* <span>₹ X,XXX</span> */}
                  </div>
                  <hr className="my-3" />
                  <div className="d-flex justify-content-between my-2">
                    <span>Promo Code?</span>
                    <a
                      href="#"
                      className="text-dark"
                      style={{ fontSize: "14px", fontWeight: "500" }}
                    >
                      Apply Coupon
                    </a>
                  </div>
                  <hr className="my-3" />
                  <div className="d-flex justify-content-between my-2">
                    <span>Total Price</span>
                    {/* <a
                  href="#"
                  className="text-dark"
                  style={{
                    fontSize: "15px",
                    fontWeight: "500",
                    textDecoration: "none",
                  }}
                >
                  ₹ X,XXX
                </a> */}
                  </div>
                  <hr className="my-3" />
                  <div className="text-start">
                    <label
                      className="mb-3"
                      style={{ fontSize: "15px", fontWeight: "400" }}
                    >
                      Apply Gift Card Code
                    </label>
                    <div className="d-flex flex-column flex-md-row">
                      <input
                        type="text"
                        className="form-control code-form-control me-2"
                        placeholder="Enter your Code"
                        style={{ fontSize: "13px" }}
                      />
                      <button
                        className="btn btn-dark code-btn"
                        style={{ fontSize: "12px" }}
                      >
                        Add Code
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 text-start">
                    <label style={{ fontSize: "15px", fontWeight: "400" }}>
                      CHECK STATUS
                    </label>
                    <hr className="my-3" />

                    <button
                      className="btn btn-dark proceed-btn w-100 mt-3"
                      style={{ height: "50px", fontSize: "12px" }}
                      onClick={handleCheckout}
                    >
                      PROCEED TO CHECKOUT
                    </button>

                    <div
                      className="text-center mt-2 mb-5"
                      style={{ fontWeight: "500", fontSize: "12px" }}
                    >
                      By clicking on checkout you are agreeing to{" "}
                      <a href="">Return Policy.</a>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
