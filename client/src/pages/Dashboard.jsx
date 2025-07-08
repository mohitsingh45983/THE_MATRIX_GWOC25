import { useState, useEffect } from "react";
import "../styles/dashboard.css";
import OrderContainer from "../components/OrdersContainer";
import InventoryProducts from "../components/InventoryProducts";
import NewProductAdd from "../components/NewProductAdd";
import { logout } from "../redux/state";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user?.user);

  const userRole = user?.role;

  const [countdown, setCountdown] = useState(5);
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "list-products-yash"
  );

  useEffect(() => {
    if (userRole !== "admin") {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        navigate("/");
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [userRole, navigate]);

  if (userRole !== "admin") {
    return (
      <div className="non-admin-message">
        <h3>You are not an admin. You can continue shopping.</h3>
        <small>Redirecting in {countdown} seconds...</small>
      </div>
    );
  }

  // Update localStorage whenever activeTab changes
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <div className="admin-container-yash">
        <aside className="sidebar-admin-yash">
          <Link to="/">
            <h5
              style={{
                marginRight: "20px",
                fontFamily: "Bodoni Moda, serif",
                fontSize: "26px",
              }}
            >
              KASHVI
            </h5>
          </Link>

          <ul>
            <li
              className={activeTab === "add-product-yash" ? "active-yash" : ""}
              onClick={() => setActiveTab("add-product-yash")}
            >
              Add Product
            </li>
            <li
              className={
                activeTab === "list-products-yash" ? "active-yash" : ""
              }
              onClick={() => setActiveTab("list-products-yash")}
            >
              Listed Products
            </li>
            <li
              className={activeTab === "orders-yash" ? "active-yash" : ""}
              onClick={() => setActiveTab("orders-yash")}
            >
              Orders
            </li>
          </ul>
        </aside>

        <div className="admin-content">
          <div className="admin-header">
            <h4>
              {activeTab === "add-product-yash"
                ? "Add New Product"
                : activeTab === "list-products-yash"
                ? "All Products List"
                : "Order Management"}
            </h4>
          </div>

          {activeTab === "add-product-yash" && <NewProductAdd />}
          {activeTab === "list-products-yash" && <InventoryProducts />}
          {activeTab === "orders-yash" && <OrderContainer />}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
