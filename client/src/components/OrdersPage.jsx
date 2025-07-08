import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/OrdersPage.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../includes/Footer";
import Navbar from "../includes/Navbar";
import Spinner from "./Spinner";
const temp = import.meta.env.VITE_BACKEND_URL;

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const invoiceRef = useRef();

  const user = useSelector((state) => state.user?.user);
  const userId = user?._id;

  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    status: [],
    time: [],
  });

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      const updatedFilters = prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value];
      return { ...prev, [type]: updatedFilters };
    });
  };

  const filteredOrders = orders
    .filter((order) =>
      filters.status.length > 0
        ? filters.status.includes(order.orderStatus)
        : true
    )
    .filter((order) => {
      if (filters.time.length === 0) return true;

      const orderDate = new Date(order.createdAt);
      const currentYear = new Date().getFullYear();
      const selectedFilters = filters.time;

      if (selectedFilters.includes("Last 30 days")) {
        const last30Days = new Date();
        last30Days.setDate(last30Days.getDate() - 30);
        if (orderDate >= last30Days) return true;
      }
      if (selectedFilters.includes(String(orderDate.getFullYear()))) {
        return true;
      }
      if (
        selectedFilters.includes("Older") &&
        orderDate.getFullYear() < currentYear - 4
      ) {
        return true;
      }
      return false;
    });

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${temp}/orders-related/user/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching user orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Navbar />
      <div className="py-4 yash-orders-container">
        <h3 className="mb-3 pb-2 yash-orders-title">MY ORDERS</h3>

        <div className="order-fil-container">
          <div
            className={`order-fil-sidebar${
              showMobileFilters ? "mobile-active" : ""
            }`}
          >
            <h3 className="filter-title-fil">Filters</h3>

            <div className="order-fil-section">
              <h3 className="filter-title-fil">Order Status</h3>
              {["Pending", "Confirmed", "Packed", "Shipped", "Delivered"].map(
                (status) => (
                  <label key={status} className="order-fil-checkbox">
                    <input
                      type="checkbox"
                      checked={filters.status.includes(status)}
                      onChange={() => handleFilterChange("status", status)}
                    />
                    {status}
                  </label>
                )
              )}
            </div>

            {/* Order Time Filter */}
            <div className="order-fil-section">
              <h3 className="filter-title-fil">Order Time</h3>
              {["Last 30 days", "2024", "2023", "2022", "2021", "Older"].map(
                (time) => (
                  <label key={time} className="order-fil-checkbox">
                    <input
                      type="checkbox"
                      checked={filters.time.includes(time)}
                      onChange={() => handleFilterChange("time", time)}
                    />
                    {time}
                  </label>
                )
              )}
            </div>

            {/* Close Button for Mobile */}
            <button
              className="order-fil-close-btn"
              onClick={() => setShowMobileFilters(false)}
            >
              Close Filters
            </button>
          </div>

          {/* Order List */}
          <div className="order-fil-list">
            {filteredOrders.length === 0 ? (
              <p className="text-center text-muted">No orders found.</p>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order._id}
                  className="order-card p-3 yash-order-card order-main-div"
                  onClick={() =>
                    navigate(`/order/order-details/?orderId=${order._id}`, {
                      state: { user },
                    })
                  }
                >
                  {/* Product List */}
                  <div className="order-main-div">
                    <div className="img-more-fixing">
                      {order.products.length > 0 && (
                        <div
                          key={order.products[0]._id}
                          className="img-div-title mt-3"
                        >
                          <div>
                            <img
                              src={order.products[0].product.image}
                              alt="Product"
                              className="img-fluid yash-order-image"
                            />
                          </div>
                          <div>
                            <h5 className="yash-order-name">
                              {order.products[0].product.title}
                            </h5>
                            <p className="text-muted mb-1 yash-order-details">
                              Quantity: {order.products[0].quantity}
                            </p>
                          </div>
                        </div>
                      )}
                      {order.products.length > 1 && (
                        <span className="text-muted mt-2">
                          +{order.products.length - 1} more
                        </span>
                      )}
                    </div>

                    <span
                      className={`fw-bold yash-order-status ${
                        order.orderStatus === "Pending"
                          ? "text-warning"
                          : "text-success"
                      }`}
                    >
                      <span
                        className={`status-indicator me-2 yash-status-indicator ${
                          order.orderStatus === "Pending"
                            ? "bg-warning"
                            : "bg-success"
                        }`}
                      ></span>
                      {order.orderStatus}
                    </span>

                    <div className="col-md-6">
                      <p className="text-secondary small yash-order-delivery">
                        <strong>Delivery Details:</strong>
                        <br />
                        <span className="add-text-add">
                          {order.address.street}, {order.address.city},{" "}
                          {order.address.state} - {order.address.pincode}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="yash-order-id">
                    <span>Order ID: {order._id}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Mobile Filter Button */}
        <button
          className="order-fil-mobile-btn"
          onClick={() => setShowMobileFilters(true)}
        >
          Open Filters
        </button>
      </div>
      <Footer />
    </>
  );
};

export default OrdersPage;
