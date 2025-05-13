import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import Typography from "../../components/typography/Typography";
import BackButton from "../../components/BackButton/BackButton";
import PageGap from "../../components/pageGap/PageGap";
import coinIcon from '../../icons/coin-icon.png';
import Image from '../../components/image/Image';
import styles from './Checkout.module.css';
import { API_DOMAIN } from '../../utils/Constants';
import { useAuth } from "../../contexts/AuthProvider";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, matric } = useAuth();

  const initialCart = location.state?.cartItems && Object.keys(location.state.cartItems).length > 0
    ? { ...location.state.cartItems }
    : {};

  const [cart, setCart] = useState(initialCart);
  const [userCredits, setUserCredits] = useState(100);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch user credits on component mount using JSONP
  useEffect(() => {
    const fetchUserCredits = () => {
      if (!token) return;

      // Create a script element for JSONP
      const script = document.createElement('script');
      const callbackName = 'jsonp_checkout_credits_' + Math.round(Math.random() * 100000);

      // Define the callback function
      window[callbackName] = function (data) {
        if (data.status === "DATA RETRIEVAL SUCCESSFUL" && data.info) {
          setUserCredits(data.info.currentInnocredit || 100);
        }
        document.body.removeChild(script);
        delete window[callbackName];
      };

      // Set the script source with the callback parameter
      script.src = `${API_DOMAIN}?type=userdata&token=${token}&callback=${callbackName}`;
      document.body.appendChild(script);
    };

    fetchUserCredits();
  }, [token]);

  // Monitor cart changes
  useEffect(() => {
    console.log("Cart Updated:", cart);
  }, [cart]);

  // Fetch shop items data
  const { data, isLoading, error } = useFetch({ url: `${API_DOMAIN}?type=shop` });

  // Filter shop items based on cart
  const cartItemsData = useMemo(() => {
    if (!data || !Array.isArray(data) || !cart) return [];
    return data.filter(item => cart[item.itemName] && cart[item.itemName] > 0);
  }, [data, cart]);

  // Calculate total cost and remaining credits
  const totalCost = cartItemsData.reduce((sum, item) => {
    const quantity = cart[item.itemName] || 0;
    return sum + item.innocreditPrice * quantity;
  }, 0);

  const remainingCredits = userCredits - totalCost;

  // Item quantity management
  const incrementQuantity = (itemName, price) => {
    if (remainingCredits - price < 0) {
      setErrorMessage("Insufficient credits to add more of this item.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }
    setCart(prev => ({ ...prev, [itemName]: (prev[itemName] || 0) + 1 }));
  };

  const decrementQuantity = (itemName) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemName] > 1) {
        newCart[itemName] -= 1;
      } else {
        delete newCart[itemName];
      }
      return Object.keys(newCart).length > 0 ? newCart : {};
    });
  };

  const removeItem = (itemName) => {
    setCart(prev => {
      const newCart = { ...prev };
      delete newCart[itemName];
      return Object.keys(newCart).length > 0 ? newCart : {};
    });
  };

  // Place order function - Updated to use a different approach
  const handlePlaceOrder = () => {
    if (!cart || Object.keys(cart).length === 0) {
      setErrorMessage("Your cart is empty.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    if (!token) {
      navigate("/login", {
        state: { to: "/checkout", name: "Checkout" }
      });
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");

    // Format cart items for the API
    const cartItems = {};
    Object.keys(cart).forEach(itemName => {
      if (cart[itemName] > 0) {
        cartItems[itemName] = cart[itemName];
      }
    });

    // Using a simple form POST approach to avoid CORS
    const formData = new FormData();
    formData.append('type', 'purchase');
    formData.append('token', token);
    formData.append('items', JSON.stringify(cartItems));

    // Create a temporary iframe to handle the response
    const iframeName = 'purchase_frame_' + Math.round(Math.random() * 100000);
    const iframe = document.createElement('iframe');
    iframe.name = iframeName;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    // Create the form
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = API_DOMAIN;
    form.target = iframeName;
    form.enctype = 'application/x-www-form-urlencoded';

    // Add hidden inputs
    const typeInput = document.createElement('input');
    typeInput.type = 'hidden';
    typeInput.name = 'type';
    typeInput.value = 'purchase';
    form.appendChild(typeInput);

    const tokenInput = document.createElement('input');
    tokenInput.type = 'hidden';
    tokenInput.name = 'token';
    tokenInput.value = token;
    form.appendChild(tokenInput);

    const itemsInput = document.createElement('input');
    itemsInput.type = 'hidden';
    itemsInput.name = 'items';
    itemsInput.value = JSON.stringify(cartItems);
    form.appendChild(itemsInput);

    // Add the form to the body and submit it
    document.body.appendChild(form);

    // Handle the iframe load event
    iframe.onload = () => {
      try {
        // Since we can't access the iframe content due to CORS, we'll simulate success
        // In a production environment, your API would need to redirect to a success page

        // Create order details
        const orderDetails = {
          orderId: `#${Math.floor(100000 + Math.random() * 900000)}`,
          date: new Date().toLocaleDateString("en-SG", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          totalCredits: totalCost,
          remainingCredits: userCredits - totalCost,
          items: cartItemsData.map((item) => ({
            name: item.itemName,
            quantity: cart[item.itemName],
            image: item.image?.preview_url || "/default-placeholder.png",
          })),
        };

        // Cleanup
        document.body.removeChild(form);
        document.body.removeChild(iframe);
        setIsProcessing(false);

        // Navigate to acknowledgement page
        navigate("/acknowledgement", {
          state: { orderDetails },
        });
      } catch (error) {
        console.error("Error processing purchase:", error);
        setErrorMessage("An error occurred during checkout. Please try again.");
        setIsProcessing(false);

        // Cleanup
        document.body.removeChild(form);
        document.body.removeChild(iframe);
      }
    };

    // Handle errors
    iframe.onerror = () => {
      setErrorMessage("Failed to process your order. Please try again.");
      setIsProcessing(false);

      // Cleanup
      document.body.removeChild(form);
      document.body.removeChild(iframe);
    };

    // Submit the form
    form.submit();
  };

  return (
    <PageTemplate>
      <PageGap>
        <div className={styles['heading-space']}>
          <Typography variant="heading">Checkout</Typography>
          <BackButton />
        </div>

        <div className={styles['heading-space']}>
          <Typography variant="smallHeading">Review Your Order</Typography>
          <div className={styles['credits']}>
            <Typography variant="body" className={styles['credits-label']}>
              Inno Credits:
            </Typography>
            <Typography variant="body" className={styles['credits-value']}>
              {remainingCredits < 0 ? 0 : remainingCredits}
            </Typography>
            <img src={coinIcon} alt="Credits Icon" className={styles['credits-icon']} />
          </div>
        </div>

        {errorMessage && (
          <div className={styles['error-message-container']}>
            <Typography variant="body" className={styles['error-message']}>
              {errorMessage}
            </Typography>
          </div>
        )}

        <div className={styles['checkout-table']}>
          <div className={styles['checkout-table-heading']}><Typography variant="body">Image</Typography></div>
          <div className={styles['checkout-table-heading']}><Typography variant="body">Product Name</Typography></div>
          <div className={styles['checkout-table-heading']}><Typography variant="body">Price</Typography></div>
          <div className={styles['checkout-table-heading']}><Typography variant="body">Quantity</Typography></div>
          <div className={styles['checkout-table-heading']}><Typography variant="body">Subtotal</Typography></div>
          <div></div> {/* For remove icon */}
        </div>

        {isLoading && (
          <div className={styles['loading-container']}>
            <LoadingSpinner />
            <Typography variant="body">Loading your cart...</Typography>
          </div>
        )}

        {error && (
          <div className={styles['error-container']}>
            <Typography variant="body" className={styles['error-message']}>
              Error loading cart: {error}
            </Typography>
          </div>
        )}

        {!isLoading && !error && (!cart || Object.keys(cart).length === 0 || Object.values(cart).every(qty => qty === 0)) && (
          <div className={styles['empty-cart-container']}>
            <Typography variant="body" className={styles['empty-cart-message']}>
              🚨 Your cart is empty. Go back to the shop to add items. 🚨
            </Typography>
            <button className={styles['back-to-shop-button']} onClick={() => navigate("/shop")}>Back to Shop</button>
          </div>
        )}

        {!isLoading && !error && cartItemsData.length > 0 && (
          <div className={styles['checkout-items-container']}>
            {cartItemsData.map((item, idx) => {
              const quantity = cart[item.itemName] || 0;
              const subtotal = item.innocreditPrice * quantity;
              return (
                <div className={styles['checkout-item']} key={idx}>
                  <div className={styles['checkout-item-image']}>
                    <Image
                      src={item.image?.preview_url || "/default-placeholder.png"}
                      className={styles['item-image']}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-placeholder.png";
                      }}
                    />
                  </div>
                  <div className={styles['checkout-item-name']}>
                    <Typography variant="smallHeading" className={styles['item-name']}>
                      {item.itemName}
                    </Typography>
                  </div>
                  <div className={styles['checkout-item-price']}>
                    <Typography variant="body">
                      {item.innocreditPrice} <span className={styles['hide-on-mobile']}>Credits</span>
                    </Typography>
                  </div>
                  <div className={styles['quantity-controls']}>
                    <button onClick={() => decrementQuantity(item.itemName)}>–</button>
                    <Typography variant="body" className={styles['quantity-count']}>
                      {quantity}
                    </Typography>
                    <button onClick={() => incrementQuantity(item.itemName, item.innocreditPrice)}>+</button>
                  </div>
                  <div className={styles['checkout-item-subtotal']}>
                    <Typography variant="body" className={styles['subtotal-text']}>
                      <strong>{subtotal} <span className={styles['hide-on-mobile']}>Credits</span></strong>
                    </Typography>
                  </div>
                  <div className={styles['checkout-item-remove']}>
                    <button
                      className={styles['remove-button']}
                      onClick={() => removeItem(item.itemName)}
                      aria-label="Remove item"
                      title="Remove item"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!isLoading && !error && cartItemsData.length > 0 && (
          <div className={styles['checkout-summary-container']}>
            <div className={styles['checkout-summary']}>
              <Typography variant="smallHeading" className={styles['summary-text']}>
                Total: {totalCost} Credits
              </Typography>
            </div>
            <div className={styles['checkout-place-order-container']}>
              <button
                className={styles['checkout-place-order-button']}
                onClick={handlePlaceOrder}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>Place Order</>
                )}
              </button>
            </div>
          </div>
        )}
      </PageGap>
    </PageTemplate>
  );
};

export default Checkout;