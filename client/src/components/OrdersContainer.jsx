import { useEffect, useState } from "react";
import "../styles/orderContainer.css";
import { Link, useNavigate } from "react-router-dom";

const OrderContainer = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const limit = 15;
  const temp = import.meta.env.VITE_BACKEND_URL;

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `${temp}/orders-related/admin/orders?limit=${limit}&page=${page}`
      );
      const data = await response.json();

      if (page === 1) {
        setOrders(data.orders);
      } else {
        setOrders((prevOrders) => [...prevOrders, ...data.orders]);
      }
      setTotalOrders(data.totalOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `${temp}/orders-related/admin/orders/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, orderStatus: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const navigateToProductDetails = (orderId) => {
    navigate(`/order/order-details/admin/${orderId}`);
  };

  const handlePrintInvoice = (order) => {
    const subtotal = "X,XXX";

    const invoiceContent = `
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    .invoice-container { width: 80%; margin: auto; border: 1px solid #ccc; padding: 20px; border-radius: 8px; }
                    .header { text-align: center; margin-bottom: 20px; }
                    .header h2 { margin-bottom: 5px; }
                    .header p { margin: 0; font-size: 14px; color: gray; }
                    .details, .product-details { margin-bottom: 20px; }
                    .details p, .product-details p { margin: 4px 0; }
                    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background: #f8f8f8; }
                    .total-container { text-align: right; margin-top: 20px; font-weight: bold; }
                    .footer { text-align: center; margin-top: 30px; font-size: 14px; color: gray; }
                </style>
            </head>
            <body>
                <div class="invoice-container">
                    <div class="header">
                        <h2>Kashvi Sarees</h2>
                        <p>123, Fashion Street, Surat, Gujarat, India</p>
                        <p>GST No: 24AAJCS3178L1Z2 | Contact: +91 98765 43210</p>
                    </div>
    
                    <hr/>
    
                    <div class="details">
                        <h4>Invoice Details</h4>
                        <p><strong>Order ID:</strong> ${order._id}</p>
                        <p><strong>Date:</strong> ${new Date(
                          order.createdAt
                        ).toDateString()}</p>
                        <p><strong>Payment Status:</strong> ${
                          order.paymentStatus
                        }</p>
                    </div>
    
                    <div class="details">
                        <h4>Customer Details</h4>
                        <p><strong>Name:</strong> ${order.address.name}</p>
                        <p><strong>Email:</strong> ${
                          order.address.email || "Not Available"
                        }</p>
                        <p><strong>Phone:</strong> ${
                          order.address.phone || "Not Available"
                        }</p>
                        <p><strong>Delivery Address:</strong> ${
                          order.address.street
                        }, ${order.address.city}, ${order.address.state} - ${
      order.address.pincode
    }</p>
                    </div>
    
                    <div class="product-details">
                        <h4>Product Details</h4>
                        <table>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                             
                                <th>Qty</th>
                            
                            </tr>
                            ${order.products
                              .map(
                                (item, index) => `
                                    <tr>
                                        <td>${index + 1}</td>
                                        <td>${item.product.title} (Design ID: ${
                                  item.product.sareeId
                                })</td>
                                       
                                        <td>${item.quantity}</td>
                                     
                                    </tr>
                                `
                              )
                              .join("")}
                        </table>
                    </div>
    
                    
    
                    <div class="footer">
                        <p>Thank you for shopping with Kashvi Sarees!</p>
                    </div>
                </div>
            </body>
            </html>
        `;
    const printWindow = window.open();
    printWindow.document.write(invoiceContent);
    printWindow.document.close();
    printWindow.print();
  };

  console.log(orders);

  return (
    <div className="orders-container-yash">
      {orders.map((order) => (
        <div className="order-card-yash" key={order._id}>
          {/* Order Image Section */}
          <div className="order-image">
            {order.products.slice(0, 1).map((item, index) => (
              <div className="saree-id-img" key={index}>
                <span className="saree-id-admin bold">
                  Design-Id: {item.product.sareeId}
                </span>
                <Link to={`/product-details/${item.product._id}`}>
                  <img
                    src={item.product.image || "fallback-image-url"}
                    alt={item.product.title}
                    className="order-product-image"
                  />
                </Link>
              </div>
            ))}
            {order.products.length >= 2 && (
              <div
                className="additional-products"
                onClick={() => navigateToProductDetails(order._id)}
              >
                +{order.products.length - 1} more
              </div>
            )}
          </div>

          <div className="order-details">
            <p className="order-items">
              {order.products.slice(0, 2).map((item, index) => (
                <span key={index}>
                  {item.product.title} x {item.quantity}
                  {index !== order.products.length - 1 ? ", " : ""}
                </span>
              ))}
              {order.products.length > 2 && (
                <span className="additional-items">
                  , +{order.products.length - 2} more
                </span>
              )}
            </p>
            <p className="order-address">
              <strong>{order.address.name || "Unnamed User"}</strong>
            </p>
            <p className="order-address">
              {order.address.street}, {order.address.city},{" "}
              {order.address.state} - {order.address.pincode}
            </p>
          </div>

          {/* Order Summary */}
          <div className="order-summary admin-summary">
            <p>
              <strong>Items:</strong> {order.products.length}
            </p>
            <p>
              <strong>Total:</strong> ${order.totalAmount}
            </p>
            <p>
              <strong>Method:</strong> {order.paymentMethod.toUpperCase()}
            </p>
            <p>
              <strong>Payment:</strong> {order.paymentStatus}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Order Status Dropdown */}
          <div className="order-status">
            <select
              className="order-status-dropdown"
              value={order.orderStatus || "Pending"}
              onChange={(e) => updateOrderStatus(order._id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Packed">Packed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>

            {/* Status Action Buttons */}
            {order.orderStatus === "Pending" && (
              <button
                className="status-btn confirm"
                onClick={() => updateOrderStatus(order._id, "Confirmed")}
              >
                Confirm Order
              </button>
            )}

            {order.orderStatus === "Confirmed" && (
              <button
                className="status-btn pack"
                onClick={() => updateOrderStatus(order._id, "Packed")}
              >
                Pack Order
              </button>
            )}

            {order.orderStatus === "Packed" && (
              <button
                className="status-btn ship"
                onClick={() => updateOrderStatus(order._id, "Shipped")}
              >
                Ship Order
              </button>
            )}

            {order.orderStatus === "Shipped" && (
              <button
                className="status-btn deliver"
                onClick={() => updateOrderStatus(order._id, "Delivered")}
              >
                Deliver Order
              </button>
            )}

            {order.orderStatus === "Delivered" && (
              <span className="delivered-status">✅ Order Delivered</span>
            )}

            <button
              onClick={() => handlePrintInvoice(order)}
              className="print-invoice-btn-all"
            >
              Print Invoice
            </button>
          </div>
        </div>
      ))}
      {orders.length < totalOrders && (
        <button onClick={() => setPage(page + 1)}>Show More</button>
      )}
      {orders.length === totalOrders && (
        <a href="#" style={{ fontSize: "14px" }}>
          {" "}
          END OF PRODUCT
        </a>
      )}
    </div>
  );
};

export default OrderContainer;
