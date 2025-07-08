import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { IoIosAddCircleOutline } from "react-icons/io";
import "../styles/buyNow.css";
import "../styles/flash.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/state";
import OrderSuccess from "./OrderSuccess";
import Navbar from "../includes/Navbar";
import Footer from "../includes/Footer";
import Spinner from "../components/Spinner";

const BuyNow = () => {
  const temp = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  const userId = user?._id;

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const cartItems = location.state?.cartItems || [];

  const isCartCheckout = cartItems.length > 0;

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const [flash, setFlash] = useState("");
  const [flashImage, setFlashImage] = useState(null);
  const [flashVisible, setFlashVisible] = useState(false);

  // Helper function to show flash messages with fade in/out transition.
  const showFlash = (message, imageUrl, duration = 1000) => {
    setFlash(message);
    setFlashImage(imageUrl);
    setTimeout(() => {
      setFlashVisible(true);
    }, 10);
    setTimeout(() => {
      setFlashVisible(false);
      setTimeout(() => {
        setFlash("");
      }, 500);
    }, duration);
  };

  useEffect(() => {
    console.log("Loading state changed:", loading);
  }, [loading]); // This will log every time `loading` changes

  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    pincode: "",
  });

  const [selectedPayment, setSelectedPayment] = useState("COD");

  const handleAddAddress = async () => {
    if (
      newAddress.name &&
      newAddress.street &&
      newAddress.city &&
      newAddress.pincode
    ) {
      try {
        const response = await fetch(`${temp}/auth/add-address`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user?._id,
            ...newAddress,
          }),
        });

        const data = await response.json();
        console.log("Address Save Response:", data);

        if (response.ok) {
          setNewAddress({ name: "", street: "", city: "", pincode: "" });
          setShowAddressModal(false);
          showFlash(
            "Address updated successfully!",
            "/images/man-pointing-smartphone-dark.png"
          );
          fetchUserData(); // Refresh user data after update
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.error("Error updating address:", error);
        showFlash(
          "Failed to update address.",
          "/images/laptop-server-error-dark.png"
        );
      }
    } else {
      showFlash(
        "Please fill all the fields.",
        "/images/undraw_add-files_d04y.svg"
      );
    }
  };

  const handleProceed = () => {
    if (selectedPayment) {
      console.log("Proceeding with:", selectedPayment);
    }

    if (!selectedPayment) {
      showFlash(
        "Please select a payment method.",
        "/images/undraw_add-files_d04y.svg"
      );
      return;
    }
  };

  const handleConfirmPayment = async () => {
    if (!selectedAddress) {
      showFlash(
        "Please select an address.",
        "/images/undraw_add-files_d04y.svg"
      );
      return;
    }

    if (!selectedPayment) {
      showFlash(
        "Please select a payment method.",
        "/images/undraw_add-files_d04y.svg"
      );
      return;
    }

    console.log("yash");

    const totalAmount =
      cartItems && cartItems.length > 0
        ? cartTotal + deliveryCharge
        : product.price + deliveryCharge;

    if (selectedPayment === "razorpay") {
      try {
        const response = await fetch(`${temp}/payment-related/create-order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: totalAmount * 100, // Razorpay expects amount in paise
            currency: "INR",
          }),
        });

        const order = await response.json();

        if (!response.ok) {
          throw new Error(order.error || "Failed to create order");
        }

        const options = {
          key: "rzp_test_SLeOOqQEvpGxpv",
          amount: order.amount,
          currency: order.currency,
          order_id: order.id,
          name: "Kashvi Sarees",
          description:
            cartItems && cartItems.length > 0
              ? "Payment for Cart Items"
              : `Payment for ${product.title}`,
          image: "/images/logo.jpg",
          handler: async function (response) {
            const verificationResponse = await fetch(
              `${temp}/payment-related/verify-payment`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              }
            );

            const verificationResult = await verificationResponse.json();

            if (verificationResponse.ok) {
              const orderResponse = await fetch(
                `${temp}/orders-related/place-order`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    userId: user._id,
                    products:
                      cartItems && cartItems.length > 0
                        ? cartItems.map((item) => ({
                            product: {
                              _id: item._id,
                              sareeId: item.sareeId,
                              title: item.name,
                              price: item.price,
                              image: item.image,
                            },
                            quantity: item.quantity,
                          }))
                        : [
                            {
                              product: {
                                _id: product._id,
                                sareeId: product.sareeId,
                                title: product.name,
                                price: product.price,
                                image: product.images[0],
                              },
                              quantity: 1,
                            },
                          ],
                    totalAmount,
                    paymentMethod: "razorpay",
                    address: selectedAddress,
                    paymentStatus: "Paid",
                  }),
                }
              );

              const orderResult = await orderResponse.json();

              if (orderResponse.ok) {
                alert("Payment Successful! Order placed.");
                setShowSuccess(true);
              } else {
                showFlash(
                  `Failed to save order: ${orderResult.error}`,
                  "/images/laptop-server-error-dark.png"
                );
                // alert("Failed to save order: " + orderResult.error);
              }
            } else {
              showFlash(
                `Payment verification failed:  + ${verificationResult.error}`,
                "/images/laptop-server-error-dark.png"
              );
              // alert("Payment verification failed: " + verificationResult.error);
            }
          },
          prefill: {
            name: user?.name || "",
            email: user?.email || "",
            contact: user?.phone || "",
          },
          theme: {
            color: "#F37254",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Payment error:", error);

        alert("Payment failed: " + error.message);
      }
    } else if (selectedPayment === "COD") {
      setLoading(true);

      try {
        const orderResponse = await fetch(
          `${temp}/orders-related/place-order`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: user._id,
              products:
                cartItems && cartItems.length > 0
                  ? cartItems.map((item) => ({
                      product: {
                        _id: item._id,
                        sareeId: item.sareeId,
                        title: item.name,
                        price: item.price,
                        image: item.image,
                      },
                      quantity: item.quantity,
                    }))
                  : [
                      {
                        product: {
                          _id: product._id,
                          sareeId: product.sareeId,
                          title: product.name,
                          price: product.price,
                          image: product.images[0],
                        },
                        quantity: 1,
                      },
                    ],
              totalAmount,
              paymentMethod: "COD",
              address: selectedAddress,
              paymentStatus: "Pending",
            }),
          }
        );

        const orderResult = await orderResponse.json();

        if (orderResponse.ok) {
          showFlash(
            "Order placed successfully!",
            "/images/undraw_order-confirmed_m9e9.svg"
          );

          if (isCartCheckout) {
            await fetch(`${temp}/cart-related/clear-cart/${user._id}`, {
              method: "DELETE",
            });
          }
          setTimeout(() => {
            navigate("/orders");
          }, 2000);
        } else {
          setLoading(false);
          showFlash(
            `Failed to place order: ${orderResult.error}`,
            "/images/laptop-server-error-dark.png"
          );

          // alert("Failed to place order: " + orderResult.error);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${temp}/auth/user/${user?._id}`);
      const updatedUser = await response.json();

      if (response.ok) {
        dispatch(setUser(updatedUser));
      } else {
        console.error("Error fetching updated user data:", updatedUser.error);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  let deliveryCharge = 89;

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartTotal >= 5000) {
    deliveryCharge = 0;
  }

  return (
    <>
      <Navbar />
      {loading ? <Spinner /> : ""}
      {/* Flash Modal */}
      {flash && (
        <div className={`flash-container ${flashVisible ? "visible" : ""}`}>
          <div className="flash-modal">
            <img
              className="flash-icon"
              src={flashImage}
              alt="Cart Illustration"
            />
            <h2 className="flash-text">{flash}</h2>
          </div>
        </div>
      )}
      <div className="container my-4">
        <div className="row g-5">
          <div className="col-md-8 px-0 ">
            <div className="checkout-card p-3">
              <h5 className="mb-3 main-text-options">
                Delivery Address{" "}
                <span className="new-address-add">
                  {" "}
                  <IoIosAddCircleOutline
                    onClick={() => setShowAddressModal(true)}
                  />{" "}
                </span>{" "}
              </h5>
              <div className="row g-3">
                {user?.addresses.map((address, i) => (
                  <div className="col-12" key={i}>
                    <div
                      className={`add-panel rounded d-flex flex-column flex-md-row align-items-md-center cursor-pointer transition-all address-box ${
                        selectedAddress?._id === address._id
                          ? "border bg-success-light"
                          : "border-none"
                      }`}
                      onClick={() => setSelectedAddress(address)} // Clicking the panel selects the radio
                      style={{
                        cursor: "pointer",
                        fontSize: "12px",
                        padding: "10px",
                      }}
                    >
                      <div className="flex-grow-1 address-name text-start">
                        <p className="mb-1 fw-semibold text-dark">
                          {user?.name}
                        </p>
                        <p className="mb-1 small">
                          {address.street}, {address.city} - {address.pincode}
                        </p>
                      </div>
                      <Form.Check
                        type="radio"
                        name="address"
                        id={`address-${address.id}`}
                        checked={selectedAddress?._id === address._id}
                        onChange={() => setSelectedAddress(address)}
                        className="ms-md-3 radio-btn"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            {/* <div className="checkout-card  p-4">
              <h5 className=" mb-3 main-text-options">
                Select a Payment Method
              </h5>

              <div className="payment-method-container">
                {[
                  // {
                  //   id: "razorpay",
                  //   label: "Razorpay",
                  // },
                  // {
                  //   id: "COD",
                  //   label: "Cash on Delivery",
                  //   // img: "/images/codImg.png",
                  // },
                ].map((method) => (
                  <label
                    // className="form-check-label"
                    htmlFor={method.id}
                    key={method.id}
                    className={`form-check payment-method-item border ${
                      selectedPayment === method.id ? "selected-payment" : ""
                    } ${method.disabled ? "disabled-payment" : ""}`} // Add disabled class
                  >
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id={method.id}
                      checked={selectedPayment === method.id}
                      onChange={() =>
                        !method.disabled && setSelectedPayment(method.id)
                      }
                      disabled={method.disabled}
                    />

                    {/* <img
                        src={method.img}
                        alt={method.label}
                        className="payment-logo"
                      />{" "} }
                    {method.label}
                    {method.disabled && (
                      <span className="ms-2 text-muted">
                        (Temporarily Unavailable)
                      </span>
                    )}
                  </label>
                ))}
              </div>

              <button
                className="btn selected-btn mt-3 w-100"
                disabled={!selectedPayment}
                onClick={handleProceed}
              >
                {selectedPayment
                  ? `PROCEEDING WITH ${selectedPayment} `
                  : "SELECT PAYMENT METHOD"}
              </button>
            </div> */}

            {/* Review Items & Delivery */}
            <div className="checkout-card">
              <h5 className="main-text-options">Review Items & Delivery</h5>

              {isCartCheckout && cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <div key={index} className="review-item">
                    {console.log(item._id)}
                    <Link to={`/product-details/${item?.productId._id}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="review-img-thumbnail"
                      />
                    </Link>

                    <div className="review-item-details text-start ms-3">
                      <p style={{ fontSize: "14px" }}>{item.name}</p>
                      {/* <p className="text-muted">₹ X,XXX</p> */}
                      <p className="text-success" style={{ fontSize: "14px" }}>
                        {item.price >= 5000
                          ? "Eligible for free delivery"
                          : "Standard Delivery: ₹89.00"}
                      </p>
                      <p className="text-muted" style={{ fontSize: "14px" }}>
                        Expected Delivery: Sunday 16 February
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="review-item">
                  <Link to={`/product-details/${product._id}`}>
                    <img
                      src={product?.images[0]}
                      alt={product?.title}
                      className="review-img-thumbnail"
                    />
                  </Link>

                  <div className="review-item-details text-start ms-3">
                    <p style={{ fontSize: "14px" }}>{product?.name}</p>
                    {/* <p className="text-muted">₹ X,XXX</p> */}
                    <p className="text-success" style={{ fontSize: "14px" }}>
                      {product?.price >= 5000
                        ? "Eligible for free delivery"
                        : "Standard Delivery: ₹89.00"}
                    </p>
                    <p className="text-muted" style={{ fontSize: "14px" }}>
                      Expected Delivery: Sunday 16 February
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-4" style={{}}>
            <div className="checkout-summary shadow-sm  shadow-sm ">
              <h5
                className="text-start mb-4"
                style={{ fontSize: "15px", fontWeight: "500" }}
              >
                Order Summary
              </h5>
              {cartItems.length > 0 ? (
                <>
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="d-flex justify-content-between mb-2"
                    >
                      <span>
                        {item.name} (x{item.quantity}):
                      </span>
                      {/* <span>₹ X,XXX</span> */}
                    </div>
                  ))}
                  <div className="d-flex justify-content-between my-2">
                    <span>Delivery:</span>
                    <span>₹{deliveryCharge}.00</span>
                  </div>
                  <hr className="my-3" />
                  <div className="d-flex justify-content-between my-2">
                    <span>Order Total</span>
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
                        className="form-control me-2"
                        placeholder="Enter your Code"
                        style={{ fontSize: "13px" }}
                      />
                      <button
                        className="btn btn-dark buynow-code-btn "
                        style={{ fontSize: "12px" }}
                      >
                        Add Code
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-start">
                    <button
                      className="btn btn-dark proceed-btn w-100 mt-3"
                      style={{ height: "50px", fontSize: "12px" }}
                      onClick={handleConfirmPayment}
                    >
                      PLACE YOUR ORDER AND PAY
                    </button>

                    <div
                      className="text-center mt-2 mb-5"
                      style={{ fontWeight: "500", fontSize: "12px" }}
                    >
                      By clicking on place order you are agreeing to Return
                      Policy.
                    </div>
                  </div>
                </>
              ) : (
                product && (
                  <div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Items:</span>
                      {/* <span>₹ X,XXX</span> */}
                    </div>
                    <div className="d-flex justify-content-between my-2">
                      <span>Delivery:</span>
                      <span>₹{deliveryCharge}.00</span>
                    </div>
                    <hr className="my-3" />
                    <div className="d-flex justify-content-between my-2">
                      <span>Order Total</span>
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
                          className="form-control me-2"
                          placeholder="Enter your Code"
                          style={{ fontSize: "13px" }}
                        />
                        <button
                          className="btn btn-dark buynow-code-btn"
                          style={{ fontSize: "12px" }}
                        >
                          Add Code
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 text-start">
                      <button
                        className="btn btn-dark proceed-btn w-100 mt-3"
                        style={{ height: "50px", fontSize: "12px" }}
                        onClick={handleConfirmPayment}
                      >
                        PLACE YOUR ORDER AND PAY
                      </button>

                      <div
                        className="text-center mt-2 mb-5"
                        style={{ fontWeight: "500", fontSize: "12px" }}
                      >
                        By clicking on place order you are agreeing to{" "}
                        <a href="">Return Policy.</a>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {showSuccess && (
            <OrderSuccess onClose={() => setShowSuccess(false)} />
          )}
        </div>
        <Modal
          show={showAddressModal}
          onHide={() => setShowAddressModal(false)}
          centered
          backdrop="static"
          size="lg"
        >
          <Modal.Header closeButton className="border-b-0 p-3 bg-white">
            <Modal.Title
              className="text-lg font-light text-gray-800"
              style={{ fontSize: "18px" }}
            >
              Add New Address
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4 bg-gray-50 max-h-[350px] overflow-y-auto">
            <Form className="space-y-4">
              <Form.Group className="mb-3">
                <Form.Label className="text-sm font-medium text-gray-600">
                  Full Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  value={newAddress.name}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, name: e.target.value })
                  }
                  required
                  className="mt-2 p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-sm font-medium text-gray-600">
                  Street Address
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter street address"
                  value={newAddress.street}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, street: e.target.value })
                  }
                  required
                  className="mt-2 p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-sm font-medium text-gray-600">
                  City
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter city"
                  value={newAddress.city}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, city: e.target.value })
                  }
                  required
                  className="mt-2 p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-sm font-medium text-gray-600">
                  State
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter state"
                  value={newAddress.state}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, state: e.target.value })
                  }
                  required
                  className="mt-2 p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-sm font-medium text-gray-600">
                  Pincode
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter 6-digit pincode"
                  value={newAddress.pincode}
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      pincode: e.target.value.replace(/\D/g, "").slice(0, 6),
                    })
                  }
                  maxLength="6"
                  required
                  className="mt-2 p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="border-t-0 p-3 bg-white">
            <Button
              variant="light"
              onClick={() => setShowAddressModal(false)}
              className="text-sm font-medium text-gray-600 hover:bg-gray-200"
            >
              Cancel
            </Button>
            <Button
              variant="dark"
              onClick={handleAddAddress}
              disabled={
                !newAddress.name ||
                !newAddress.street ||
                !newAddress.city ||
                !newAddress.state ||
                !newAddress.pincode
              }
              className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400"
            >
              Save Address
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Footer />
    </>
  );
};

export default BuyNow;
