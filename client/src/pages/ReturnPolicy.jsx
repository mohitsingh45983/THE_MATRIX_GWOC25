import Footer from "../includes/Footer";
import Navbar from "../includes/Navbar";
import "../styles/ReturnPolicy.css";

const ReturnPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="return-policy-container">
        <h1 className="return-policy-title">Returns</h1>

        <section className="return-policy-section">
          <h2>Return Eligibility</h2>
          <ul className="return-policy-list">
            <li>
              <strong>Return Period:</strong> You can return items within 5 days
              of delivery.
            </li>
            <li>
              <strong>Non-Returnable Items:</strong> Accessories, bags, blouses,
              footwear, sarees with stitched blouses, pre-stitched sarees,
              unstitched sarees with fall & pico, as well as customized and
              personalized products.
            </li>
            <li>
              <strong>Specific Return Terms:</strong> Refer to the product page
              for specific return terms for other items.
            </li>
            <li>
              <strong>Product Condition:</strong> Products must be in original
              condition and include all labels & tags intact.
            </li>
            <li>
              <strong>Non-Refundable Charges:</strong> Petticoat, fall & pico,
              and pre-draping charges are non-refundable.
            </li>
            <li>
              <strong>Approval:</strong> All returns are subject to approval.
            </li>
          </ul>
        </section>

        <section className="return-policy-section">
          <h2>How to Return a Product</h2>
          <ul className="return-policy-list">
            <li>
              <strong>Return Process:</strong> Go to the order page and follow
              the return process.
            </li>
            <li>
              <strong>Online Request:</strong> You can put in the return request
              online without needing to call or email.
            </li>
          </ul>
        </section>

        <section className="return-policy-section">
          <h2>Shipping and Return Charges</h2>
          <p>
            <strong>India:</strong> Shipping and returns are free within India.
          </p>
        </section>

        <section className="return-policy-section">
          <h2>Refund Process</h2>
          <ul className="return-policy-list">
            <li>
              <strong>Return Request:</strong> Once you raise the return
              request, we will arrange pickup for the product.
            </li>
            <li>
              <strong>Quality Check:</strong> The pickup agent will conduct a
              quality check of the product.
            </li>
            <li>
              <strong>Refund Initiation:</strong> Upon successful pickup, we
              will initiate your refund.
            </li>
            <li>
              <strong>Refund Timeline:</strong> You will receive your refund
              within 7 to 10 days.
            </li>
          </ul>
        </section>

        <section className="return-policy-section">
          <h2>Return & Cancellation</h2>
          <ul className="return-policy-list">
            <li>
              <strong>Returns:</strong> You can place return requests within 5
              days of delivery.
            </li>
            <li>
              <strong>Cancellations:</strong> Order cancellations are accepted
              within 24 hours of placing the order.
            </li>
          </ul>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ReturnPolicy;
