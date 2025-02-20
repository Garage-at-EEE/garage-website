import React, { useState } from "react";
//import "./Checkout.css"; // Importing CSS for styling

const Checkout = () => {
  const [credits, setCredits] = useState(66);
  const [cart, setCart] = useState([
    { id: 1, name: "Garage Handheld Fan", price: 2, quantity: 2 },
    { id: 2, name: "Garage Waterbottle", price: 3, quantity: 2 },
    { id: 3, name: "ENITIO Cup Sleeve", price: 4, quantity: 1 },
  ]);

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const totalCost = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const remainingBalance = credits - totalCost;

  return (
    <div className="cart-container">
      <h1>CART</h1>
      <div className="progress">
        <span className="active">1. Shopping cart</span>
        <span>2. Order complete</span>
      </div>
      <div className="cart-header">
        <span>Product</span>
        <span>Quantity</span>
        <span>Price</span>
        <span>Subtotal</span>
      </div>
      {cart.map((item) => (
        <div className="cart-item" key={item.id}>
          <span className="product-name">{item.name}</span>
          <div className="quantity">
            <button onClick={() => updateQuantity(item.id, -1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, 1)}>+</button>
          </div>
          <span>{item.price} Credits</span>
          <span>{item.price * item.quantity} Credits</span>
          <button className="remove" onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <div className="balance">
        <span>Inno Credits: {credits}</span>
        <span>Your Remaining Balance: {remainingBalance} Credits</span>
      </div>
      <button className="checkout" disabled={remainingBalance < 0}>
        Checkout
      </button>
    </div>
  );
};

export default Checkout;