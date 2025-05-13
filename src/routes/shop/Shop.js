import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import Transition from "../../components/transition/Transition";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import Typography from "../../components/typography/Typography";
import BackButton from "../../components/BackButton/BackButton";
import PageGap from "../../components/pageGap/PageGap";
import Image from '../../components/image/Image';
import coinIcon from '../../icons/coin-icon.png';
import cartIcon from '../../icons/shopping-cart.png';
import styles from './Shop.module.css';
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { API_DOMAIN } from '../../utils/Constants';
import { useAuth } from "../../contexts/AuthProvider";

const Shop = () => {
  const { token } = useAuth(); // Get authentication token
  const navigate = useNavigate();

  // Fetch shop items from API
  const { data, isLoading, error } = useFetch({
    url: `${API_DOMAIN}?type=shop`,
  });

  const [quantities, setQuantities] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [userCredits, setUserCredits] = useState(100); // Default to 100
  const [isLoadingCredits, setIsLoadingCredits] = useState(false);

  // Fetch user credits on component mount using JSONP
  useEffect(() => {
    const fetchUserCredits = () => {
      if (!token) return;

      setIsLoadingCredits(true);

      // Create a script element for JSONP
      const script = document.createElement('script');
      const callbackName = 'jsonp_credits_' + Math.round(Math.random() * 100000);

      // Define the callback function
      window[callbackName] = function (data) {
        if (data.status === "DATA RETRIEVAL SUCCESSFUL" && data.info) {
          setUserCredits(data.info.currentInnocredit || 100);
        }
        document.body.removeChild(script);
        delete window[callbackName];
        setIsLoadingCredits(false);
      };

      // Set the script source with the callback parameter
      script.src = `${API_DOMAIN}?type=userdata&token=${token}&callback=${callbackName}`;
      document.body.appendChild(script);
    };

    fetchUserCredits();
  }, [token]);

  // Filter valid items from the data
  const items = useMemo(() => {
    if (!data || !Array.isArray(data)) {
      return [];
    }
    return data.filter(entry => entry.itemName && entry.innocreditPrice !== undefined);
  }, [data]);

  // Initialize quantities when data loads
  useEffect(() => {
    if (data && Array.isArray(data)) {
      const initialQuantities = {};
      data.forEach(item => {
        initialQuantities[item.itemName] = 0;
      });
      setQuantities(initialQuantities);
    }
  }, [data]);

  // Item quantity management functions
  const incrementQuantity = (itemName) => {
    // Check if user has enough credits
    const itemPrice = items.find(item => item.itemName === itemName)?.innocreditPrice || 0;
    const currentTotal = Object.entries(quantities).reduce((sum, [name, qty]) => {
      const item = items.find(i => i.itemName === name);
      return sum + (item?.innocreditPrice || 0) * qty;
    }, 0);

    if (userCredits - currentTotal - itemPrice < 0) {
      alert("Insufficient credits to add more of this item.");
      return;
    }

    setQuantities((prev) => {
      const newQuantities = { ...prev, [itemName]: (prev[itemName] || 0) + 1 };
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

  const updateCartCount = (newQuantities) => {
    const totalItems = Object.values(newQuantities).reduce((sum, qty) => sum + qty, 0);
    setCartCount(totalItems);
  };

  const handleCheckout = () => {
    if (cartCount === 0) {
      alert("Your cart is empty! Please add items before checking out.");
      return;
    }

    // Redirect to login if not authenticated
    if (!token) {
      navigate("/login", {
        state: { to: "/checkout", name: "Checkout" }
      });
      return;
    }

    navigate("/checkout", { state: { cartItems: { ...quantities } } });
  };

  // Loading state
  if (isLoading) {
    return (
      <Transition isLoading={isLoading}>
        <PageTemplate>
          <Typography variant="largeHeading">Garage Shop</Typography>
          <Typography variant="body">🔄 Loading shop items...</Typography>
        </PageTemplate>
      </Transition>
    );
  }

  // Error state
  if (error) {
    return (
      <PageTemplate>
        <Typography variant="largeHeading">Garage Shop</Typography>
        <Typography variant="body" className={styles['error-message']}>
          Failed to load shop items. Please try again later. Error: {error}
        </Typography>
      </PageTemplate>
    );
  }

  // Main render
  return (
    <PageTemplate>
      <PageGap>
        <div className={styles['heading-space']}>
          <Typography variant="heading">Garage Shop</Typography>
          <BackButton />
        </div>

        <div className={styles['heading-info-space']}>
          <Typography variant="smallHeading">
            Welcome to Garage Shop
          </Typography>
          <div className={styles['credits']}>
            <Typography variant="body" className={styles['credits-label']}>
              Inno Credits:
            </Typography>
            <Typography variant="body" className={styles['credits-value']}>
              {isLoadingCredits ? "..." : userCredits}
            </Typography>
            <img
              src={coinIcon}
              alt="Credits Icon"
              className={styles['credits-icon']}
            />
          </div>
        </div>

        <div className={styles['shop-items-container']}>
          {items.map((item, index) => (
            <div className={styles['shop-item']} key={index}>
              <Image
                src={item.image?.preview_url ? item.image.preview_url : "/default-placeholder.png"}
                alt={item.itemName ? item.itemName : "Unnamed Item"}
                className={styles['item-image']}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default-placeholder.png";
                }}
              />

              <Typography variant="subtitle" className={styles['item-description']}>
                {item.description || "No description available."}
              </Typography>

              <Typography variant="body" className={styles['item-name']}>
                {item.itemName || "No Name"}
              </Typography>

              <div className={styles['item-price']}>
                <Typography variant="body">
                  {item.innocreditPrice || 0} Credits
                </Typography>
                <img
                  src={coinIcon}
                  alt="Credits Icon"
                  className={styles['credits-icon']}
                />
              </div>

              <div className={styles['item-stock-quantity']}>
                <Typography variant="body" className={styles['item-stock']}>
                  {item.inventory ? `Stock: ${item.inventory}` : "Out of Stock"}
                </Typography>
                <div className={styles['quantity-controls']}>
                  <button
                    onClick={() => decrementQuantity(item.itemName)}
                    disabled={quantities[item.itemName] === 0}
                  >
                    -
                  </button>
                  <Typography variant="body" className={styles['quantity-count']}>
                    {quantities[item.itemName] || 0}
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

        <div className={styles['checkout']}>
          <button className={styles['checkout-button']} onClick={handleCheckout}>
            <div className={styles['cart-icon-wrapper']}>
              <img
                src={cartIcon}
                alt="Cart Icon"
                className={styles['cart-icon']}
              />
              {cartCount > 0 && (
                <span className={styles['cart-count']}>{cartCount}</span>
              )}
            </div>
            Check Out
          </button>
        </div>
      </PageGap>
    </PageTemplate>
  );
};

export default Shop;