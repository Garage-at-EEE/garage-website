import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import Typography from "../../components/typography/Typography";
import BackButton from "../../components/BackButton/BackButton";
import PageGap from "../../components/pageGap/PageGap";
import "./Shop.css";
import { useNavigate } from "react-router-dom";


const Shop = () => {
  const { data, isLoading, error } = useFetch({
    url: `https://script.google.com/macros/s/AKfycbyZVob9L1HLQh4PO5zbAwL9182lMBnMCF31wgnkUuq3BqMj_es-gnVsOfu601NhRIOq/exec?timestamp=${new Date().getTime()}`

  });
const navigate = useNavigate(); // ✅ Define navigate before using it
  // State to track quantities of each item
  const [quantities, setQuantities] = useState({});
  const [cartCount, setCartCount] = useState(0); // 🔹 NEW: Track total items in cart

  // Initialize quantities
  useEffect(() => {
    if (data && Array.isArray(data)) {
      const initialQuantities = {};
      data.forEach((item) => {
        initialQuantities[item.itemName] = 0;
      });
      setQuantities(initialQuantities);
    }
  }, [data]);

  console.log("Fetched Shop Data:", data);

  if (error) {
    return (
      <PageTemplate>
        <Typography variant="largeHeading">Garage Shop</Typography>
        <Typography variant="body" className="error-message">
          Failed to load shop items. Please try again later. Error: {error}
        </Typography>
      </PageTemplate>
    );
  }

  if (!data) {
    console.error("Shop data is null or undefined.");
    return (
      <PageTemplate>
        <Typography variant="largeHeading">Garage Shop</Typography>
        <Typography variant="body" className="error-message">
          No data available at the moment. Please try again later.
        </Typography>
      </PageTemplate>
    );
  }

  if (isLoading) {
    return (
      <PageTemplate>
        <Typography variant="largeHeading">Garage Shop</Typography>
        <Typography variant="body">Loading shop items...</Typography>
      </PageTemplate>
    );
  }

  const incrementQuantity = (itemName) => {
    setQuantities((prev) => {
      const newQuantities = { ...prev, [itemName]: prev[itemName] + 1 };
      updateCartCount(newQuantities);
      return newQuantities;
    });
  };
  

  const decrementQuantity = (itemName) => {
    setQuantities((prev) => {
      const newQuantities = { ...prev, [itemName]: prev[itemName] > 0 ? prev[itemName] - 1 : 0 };
      updateCartCount(newQuantities);
      return newQuantities;
    });
  };
  
   // 🔹 Function to update cart count based on item quantities
  const updateCartCount = (newQuantities) => {
    const totalItems = Object.values(newQuantities).reduce((sum, qty) => sum + qty, 0);
    setCartCount(totalItems);
  };

  // 🔹 Handle checkout button click
  const handleCheckout = () => {
    navigate("/checkout", { state: { cartItems: quantities } }); // Pass cart data to checkout page
  };


  const items = data.filter(
    (entry) => entry.itemName && entry.innocreditPrice !== undefined
  );

  console.log("Rendered Items:", items);

  return (
    <PageTemplate>
      <PageGap>
        <div className="heading-space">
          <Typography variant="heading">Garage Shop</Typography>
          <BackButton />
        </div>

        <div className="heading-space">
          <Typography variant="smallHeading">
            Welcome to Garage Shop
          </Typography>
          <div className="credits">
            <Typography variant="body" className="credits-label">
              Inno Credits:
            </Typography>
            <Typography variant="body" className="credits-value">100</Typography>
            <img
              src="/coin-icon.png"
              alt="Credits Icon"
              className="credits-icon"
            />
          </div>
        </div>

        <div className="shop-items-container">
          {items.map((item, index) => (

            <div className="shop-item" key={index}>
             <img
  src={item.image?.preview_url ? item.image.preview_url : "/default-placeholder.png"}
  alt={item.itemName ? item.itemName : "Unnamed Item"}
  className="item-image"
  onError={(e) => {
    e.target.onerror = null; // Prevent infinite looping if default image also fails
    e.target.src = "/default-placeholder.png";
  }}
/>

  
              <Typography variant="subtitle" className="item-description">
                {item.description || "No description available."}
              </Typography>

              <Typography variant="body" className="item-name">
                {item.itemName || "No Name"}
              </Typography>

              <div className="item-price">
                <Typography variant="body">
                  {item.innocreditPrice || 0} Credits
                </Typography>
                <img
                  src="/coin-icon.png"
                  alt="Credits Icon"
                  className="credits-icon"
                />
              </div>

              <div className="item-stock-quantity">
                <Typography variant="body" className="item-stock">
                  {item.inventory ? `Stock: ${item.inventory}` : "Out of Stock"}
                </Typography>
                <div className="quantity-controls">
                  <button
                    onClick={() => decrementQuantity(item.itemName)}
                    disabled={quantities[item.itemName] === 0}
                  >
                    -
                  </button>
                  <Typography variant="body" className="quantity-count">
                    {quantities[item.itemName]}
                  </Typography>
                  <button
                    onClick={() => incrementQuantity(item.itemName)}
                    disabled={
                      item.inventory &&
                      quantities[item.itemName] >= item.inventory
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="checkout">
          <button className="checkout-button"onClick={handleCheckout}>
            <img
              src="/shopping-cart.png"
              alt="Cart Icon"
              className="cart-icon"
            />
             <span className="cart-count">{cartCount}</span> {/* Badge for Cart Count */}
            Check Out
          </button>
        </div>
      </PageGap>
    </PageTemplate>
  );
};

export default Shop;
