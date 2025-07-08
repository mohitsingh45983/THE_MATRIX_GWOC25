import { FaCheckCircle } from "react-icons/fa";

const statusSteps = [
  { status: "Pending", label: "Order Pending" },
  { status: "Confirmed", label: "Order Confirmed" },
  { status: "Packed", label: "Packed" },
  { status: "Shipped", label: "Shipped" },
  { status: "Delivered", label: "Delivered" },
];

const OrderTracking = ({ order }) => {
  const currentStep = statusSteps.findIndex(
    (step) => step.status === order.orderStatus
  );

  return (
    <div className="order-tracking-container">
      {statusSteps.map((step, index) => (
        <div key={index} className="tracking-step">
          <div
            className={`icon-wrapper ${index <= currentStep ? "active" : ""}`}
          >
            <FaCheckCircle className="check-icon" />
          </div>
          {index !== statusSteps.length - 1 && (
            <div
              className={`tracking-line ${index < currentStep ? "active" : ""}`}
            ></div>
          )}
          <p className="tracking-label">
            {step.label}
            {index <= currentStep && order.updatedAt
              ? `, ${new Date(order.updatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                })}`
              : ""}
          </p>
        </div>
      ))}
    </div>
  );
};

export default OrderTracking;
