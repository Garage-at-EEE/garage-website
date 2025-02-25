import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import Typography from "../../components/typography/Typography";
import BackButton from "../../components/BackButton/BackButton";
import PageGap from "../../components/pageGap/PageGap";
import "./Shan-TestingCheckout.css";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Cart passed from Shop page: { itemName: quantity }
  const initialCart = location.state?.cartItems || {};
  const [cart, setCart] = useState(initialCart);

  // Suppose the user starts with 100 Inno Credits
  const [baseCredits] = useState(100);

  // Fetch shop data for up-to-date prices, images, etc.
  const { data, isLoading, error } = useFetch({
    url: `https://script.google.com/macros/s/AKfycbyZVob9L1HLQh4PO5zbAwL9182lMBnMCF31wgnkUuq3BqMj_es-gnVsOfu601NhRIOq/exec?timestamp=${new Date().getTime()}`
  });

  // Filter only items that appear in the cart with quantity > 0
  const cartItemsData = data && Array.isArray(data)
    ? data.filter(item => cart[item.itemName] > 0)
    : [];

  // Calculate total cost
  const totalCost = cartItemsData.reduce((sum, item) => {
    const quantity = cart[item.itemName] || 0;
    return sum + item.innocreditPrice * quantity;
  }, 0);

  // Dynamic credits after deductions
  const remainingCredits = baseCredits - totalCost;

  // Increment quantity if user has enough credits
  const incrementQuantity = (itemName, price) => {
    if (remainingCredits - price < 0) {
      alert("Insufficient credits to add more of this item.");
      return;
    }
    setCart(prev => ({ ...prev, [itemName]: prev[itemName] + 1 }));
  };

  // Decrement quantity (remove if it goes below 1)
  const decrementQuantity = (itemName) => {
    if (cart[itemName] > 1) {
      setCart(prev => ({ ...prev, [itemName]: prev[itemName] - 1 }));
    } else {
      removeItem(itemName);
    }
  };

  // Remove item entirely
  const removeItem = (itemName) => {
    const newCart = { ...cart };
    delete newCart[itemName];
    setCart(newCart);
  };

  // Place order (demo only)
  const handlePlaceOrder = () => {
    if (Object.keys(cart).length === 0) {
      alert("Your cart is empty.");
      return;
    }
    alert("Order placed successfully!");
    navigate("/"); // or navigate("/some-other-page")
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
            <img
              src="/coin-icon.png"
              alt="Credits Icon"
              className="credits-icon"
            />
          </div>
        </div>

        {/* Loading / Error / Empty Cart States */}
        {isLoading && (
          <Typography variant="body">Loading checkout items...</Typography>
        )}
        {error && (
          <Typography variant="body" className="error-message">
            Failed to load data. Error: {error}
          </Typography>
        )}
        {!isLoading && !error && Object.keys(cart).length === 0 && (
          <Typography variant="body">Your cart is empty.</Typography>
        )}

        {/* List of cart items */}
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
                      <button onClick={() => decrementQuantity(item.itemName)}>
                        –
                      </button>
                      <Typography variant="body" className="quantity-count">
                        {quantity}
                      </Typography>
                      <button
                        onClick={() =>
                          incrementQuantity(item.itemName, item.innocreditPrice)
                        }
                      >
                        +
                      </button>
                      <button
                        className="remove-button"
                        onClick={() => removeItem(item.itemName)}
                      >
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

        {/* Totals and Place Order */}
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
              <button
                className="checkout-place-order-button"
                onClick={handlePlaceOrder}
              >
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
