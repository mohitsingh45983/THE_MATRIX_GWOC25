import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/orderContAdmin.css";

const OrderDetailsAdmin = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const temp = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `${temp}/orders-related/admin/order-details/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch order");
        }
        const data = await response.json();
        setOrder(data);
        setStatus(data.status);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order:", error);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  console.log(order);

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
    
                    <div class="total-container">
                        <p>Subtotal: ₹${subtotal}</p>
                        <p><strong>Grand Total: ₹${subtotal}
                        )}</strong></p>
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

  if (loading) return <h2>Loading order details...</h2>;
  if (!order) return <h2>Order not found</h2>;

  return (
    <div className="order-details-container-admin">
      <h2>Order Details (#{order._id})</h2>

      <div className="customer-info-admin">
        <h3>Customer: {order.address.name}</h3>
        <p>
          {order.address.street}, {order.address.city}, {order.address.state} -{" "}
          {order.address.pincode}
        </p>
      </div>

      <div className="products-admin">
        <h3>Products:</h3>
        <div className="product-grid-admin">
          {order.products.map((item, index) => (
            <div key={index} className="product-card-admin">
              <Link to={`/product-details/${item.product._id}`}>
                <img src={item.product.image} alt={item.product.title} />
              </Link>
              <p>
                {item.product.title} x {item.quantity}
              </p>
              <p>
                <strong>Price:</strong> ₹X,XXX
              </p>
              <p>
                <strong>Design-Id:</strong> {item.product.sareeId}{" "}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="order-summary-admin">
        <p>
          <strong>Items:</strong> {order.products.length}
        </p>
        <p>
          <strong>Total:</strong> ₹X,XXX
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

      <button
        onClick={() => handlePrintInvoice(order)}
        className="print-invoice-btn-all-mohit"
      >
        Print Invoice
      </button>
    </div>
  );
};

export default OrderDetailsAdmin;
