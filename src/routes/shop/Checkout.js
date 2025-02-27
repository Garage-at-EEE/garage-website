import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import Typography from "../../components/typography/Typography";
import BackButton from "../../components/BackButton/BackButton";
import PageGap from "../../components/pageGap/PageGap";
import "./Checkout.css";
import { useMemo } from "react";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Set initial cart state based on what was passed from Shop
  const initialCart = location.state?.cartItems && Object.keys(location.state.cartItems).length > 0 
    ? { ...location.state.cartItems } 
    : {};

  const [cart, setCart] = useState(initialCart);
  const [baseCredits] = useState(100); // Starting Inno Credits
  

  // 🛠️ Debugging - Log cart updates
  useEffect(() => {
    console.log("Cart Updated:", cart);
    if (!cart || Object.keys(cart).length === 0 || Object.values(cart).every(qty => qty === 0)) {
      console.log("Cart is empty! Should show empty cart message.");
    }
  }, [cart]);
 
  // Fetch shop data for up-to-date prices and images
  const { data, isLoading, error } = useFetch({
    url: `https://script.google.com/macros/s/AKfycbyZVob9L1HLQh4PO5zbAwL9182lMBnMCF31wgnkUuq3BqMj_es-gnVsOfu601NhRIOq/exec`
  });

  const cartItemsData = useMemo(() => {
    if (!data || !Array.isArray(data) || !cart) return [];
    return data.filter(item => cart[item.itemName] && cart[item.itemName] > 0);
  }, [data, cart]);
  // Calculate total cost
  const totalCost = cartItemsData.reduce((sum, item) => {
    const quantity = cart[item.itemName] || 0;
    return sum + item.innocreditPrice * quantity;
  }, 0);

  // Remaining credits after purchase
  const remainingCredits = baseCredits - totalCost;

  // Increment item quantity
  const incrementQuantity = (itemName, price) => {
    if (remainingCredits - price < 0) {
      alert("Insufficient credits to add more of this item.");
      return;
    }
    setCart(prev => ({ ...prev, [itemName]: (prev[itemName] || 0) + 1 }));
  };

  // Decrement item quantity (remove if 0)
  const decrementQuantity = (itemName) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemName] > 1) {
        newCart[itemName] -= 1;
      } else {
        delete newCart[itemName]; // Fully remove item if quantity reaches 0
      }
      return Object.keys(newCart).length > 0 ? newCart : {}; // Ensure empty cart updates UI
    });
  };

  // Remove item entirely
  const removeItem = (itemName) => {
    setCart(prev => {
      const newCart = { ...prev };
      delete newCart[itemName];
      console.log("Updated Cart After Removal:", newCart);
      return Object.keys(newCart).length > 0 ? newCart : {}; // Force React to detect state change
    });
  };

  // Handle checkout process
  const handlePlaceOrder = () => {
    if (!cart || Object.keys(cart).length === 0) {
      alert("Your cart is empty.");
      return;
    }
    alert("Order placed successfully!");
    navigate("/"); // Redirect after checkout
  };

  return (
    <PageTemplate>
      <PageGap>
        {/* Main heading + Back button */}
        <div className="heading-space">
          <Typography variant="heading">Checkout</Typography>
          <BackButton />
        </div>

        {/* Subheading + Dynamic Inno Credits display */}
        <div className="heading-space">
          <Typography variant="smallHeading">Review Your Order</Typography>
          <div className="credits">
            <Typography variant="body" className="credits-label">
              Inno Credits:
            </Typography>
            <Typography variant="body" className="credits-value">
              {remainingCredits < 0 ? 0 : remainingCredits}
            </Typography>
            <img src="/coin-icon.png" alt="Credits Icon" className="credits-icon" />
          </div>
        </div>

        {/* 🛠️ Empty Cart Message */}
        {!isLoading && !error && (!cart || Object.keys(cart).length === 0 || Object.values(cart).every(qty => qty === 0)) && (
          <div className="empty-cart-container">
            <Typography variant="body" className="empty-cart-message">
              🚨 Your cart is empty. Go back to the shop to add items. 🚨
            </Typography>
            <button className="back-to-shop-button" onClick={() => navigate("/shop")}>
              Back to Shop
            </button>
          </div>
        )}

        {/* 🛍️ Display Cart Items */}
        {!isLoading && !error && cartItemsData.length > 0 && (
          <div className="checkout-items-container">
            {cartItemsData.map((item, idx) => {
              const quantity = cart[item.itemName] || 0;
              const subtotal = item.innocreditPrice * quantity;
              return (
                <div className="checkout-item" key={idx}>
                  <img
                    src={item.image?.preview_url || "/default-placeholder.png"}
                    alt={item.itemName || "Item"}
                    className="item-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/default-placeholder.png";
                    }}
                  />
                  <div className="checkout-item-details">
                    <Typography variant="body" className="item-name">
                      {item.itemName}
                    </Typography>
                    <Typography variant="body">
                      Price: <strong>{item.innocreditPrice} Credits</strong>
                    </Typography>

                    <div className="quantity-controls">
                      <button onClick={() => decrementQuantity(item.itemName)}>–</button>
                      <Typography variant="body" className="quantity-count">
                        {quantity}
                      </Typography>
                      <button onClick={() => incrementQuantity(item.itemName, item.innocreditPrice)}>+</button>
                      <button className="remove-button" onClick={() => removeItem(item.itemName)}>
                        Remove
                      </button>
                    </div>

                    <Typography variant="body">
                      Subtotal: <strong>{subtotal} Credits</strong>
                    </Typography>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 🛒 Checkout Summary & Place Order */}
        {!isLoading && !error && cartItemsData.length > 0 && (
          <>
            <div className="checkout-summary">
              <Typography variant="body" className="summary-text">
                Total: {totalCost} Credits
              </Typography>
              <Typography variant="body" className="summary-text">
                Remaining Balance: {remainingCredits < 0 ? 0 : remainingCredits} Credits
              </Typography>
            </div>

            <div className="checkout-place-order-container">
              <button className="checkout-place-order-button" onClick={handlePlaceOrder}>
                Place Order
              </button>
            </div>
          </>
        )}
      </PageGap>
    </PageTemplate>
  );
};

export default Checkout;
