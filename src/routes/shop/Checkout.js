import React from "react";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const cartItems = location.state?.cartItems || {};

  return (
    <div>
      <h1>Checkout Page</h1>
      <h2>Items in Cart:</h2>
      <ul>
        {Object.entries(cartItems).map(([itemName, quantity]) => (
          <li key={itemName}>{itemName}: {quantity}</li>
        ))}
      </ul>
    </div>
  );
};

export default Checkout;
