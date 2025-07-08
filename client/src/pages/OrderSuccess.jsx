import React, { useState, useEffect } from "react";
import "../styles/Success.css";

const OrderSuccess = ({ onClose }) => {
  return (
    <div className="success-overlay">
      <div className="success-container">
        <div className="checkmark">
          <div className="checkmark-circle"></div>
          <div className="checkmark-stem"></div>
          <div className="checkmark-kick"></div>
        </div>
        <h2>Order Placed Successfully!</h2>
        <button className="success-btn" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
