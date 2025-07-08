import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/OrderDetails.css";
import { FaFileDownload } from "react-icons/fa";
import Navbar from "../includes/Navbar";
import OrderTracking from "../components/OrderTracking";
import Footer from "../includes/Footer";
const temp = import.meta.env.VITE_BACKEND_URL;

const OrderDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("orderId");

  const user = location.state?.user;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) return;

      try {
        const response = await fetch(`${temp}/orders-related/${orderId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setOrder(data);
      } catch (err) {
        console.error("Error fetching order details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

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
              .details { margin-bottom: 20px; }
              .details p { margin: 4px 0; }
              .table-container { width: 100%; border-collapse: collapse; }
              table { width: 100%; border-collapse: collapse; margin-top: 10px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background: #f8f8f8; }
              .total-container { text-align: right; margin-top: 20px; font-weight: bold; }
              .footer { text-align: center; margin-top: 30px; font-size: 14px; color: gray; }
              .qr-container { text-align: center; margin-top: 15px; }
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
                  <p><strong>Payment Status:</strong> ${order.paymentStatus}</p>
              </div>

              <div class="details">
                  <h4>Customer Details</h4>
                  <p><strong>Name:</strong> ${user?.name || "Guest"}</p>
                  <p><strong>Email:</strong> ${
                    user?.email || "Not Available"
                  }</p>
                  <p><strong>Phone:</strong> ${
                    user?.phone || "Not Available"
                  }</p>
                  <p><strong>Delivery Address:</strong> ${
                    order.address.street
                  }, ${order.address.city}, ${order.address.state} - ${
      order.address.pincode
    }</p>
              </div>

              <div class="table-container">
                  <h4>Product Details</h4>
                  <table>
                      <tr>
                          <th>#</th>
                          <th>Product</th>
                          <th>Design Id</th>
                          
                          <th>Quantity</th>
                        
                      </tr>
                      ${order.products
                        .map(
                          (item, index) => `
                          <tr>
                              <td>${index + 1}</td>
                              <td>${item.product.title}</td>
                               <td>${item.product.sareeId}</td>
                           
                              <td>${item.quantity}</td>
                           
                          </tr>
                      `
                        )
                        .join("")}
                  </table>
              </div>

              <div class="total-container">
                  <p>Subtotal: ₹${subtotal}</p> 
                  <p><strong>Grand Total: ₹${subtotal}</strong></p>
              </div>

              <div class="footer">
                  <p>Thank you for shopping with Kashvi Sarees!</p>
              </div>
          </div>
      </body>
      </html>
      `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(invoiceContent);
    printWindow.document.close();
    printWindow.print();
  };

  if (loading) return <p>Loading...</p>;
  if (!order) return <p>Order not found.</p>;

  return (
    <>
      <Navbar />
      <div className="breadcrumb">
        <Link to="/">Home &gt; </Link>
        <Link to="/orders">My Orders &gt; </Link>
        <span className="order-id"> {orderId}</span>
      </div>

      <h3 className="product-details-heading">Products details</h3>

      <div className="container-main-details">
        <div className="order-container-details">
          <div className="order-left-details">
            {order.products.map((item) => (
              <div key={item.product._id} className="product-card-details">
                <Link to={`/product-details/${item.product._id}`}>
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="product-image-details"
                  />
                </Link>

                <div className="product-info-details">
                  <span>{item.product.title}</span>
                  <p className="price-details">Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="order-right-details">
            <div className="order-tracking-section shipping-details">
              <h4 className="shipping-title">Order Tracking</h4>
              <OrderTracking order={order} />
            </div>
            <div className="shipping-details">
              <h2 className="shipping-title">Shipping Details</h2>
              <div className="shipping-info">
                <p className="recipient-name">{order.address.name}</p>
                <p className="address-line">
                  {order.address.street}, {order.address.city}.
                </p>
                <p className="address-line">
                  {order.address.state} - {order.address.pincode}.
                </p>
              </div>

              <div className="price-details-details">
                <span className="recipient-name">Price Details</span>
                <p>{/* <span>Selling price</span> <span>₹X,XXX</span> */}</p>
              </div>
              <p className="invoice">
                <span onClick={() => handlePrintInvoice(order)}>
                  {" "}
                  Print Invoice <FaFileDownload />{" "}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderDetails;
