import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import Typography from "../../components/typography/Typography";
import BackButton from "../../components/BackButton/BackButton";
import PageGap from "../../components/pageGap/PageGap";
import coinIcon from '../../icons/coin-icon.png';
import trashIcon from "../../icons/trash.svg";
import Image from '../../components/image/Image';
import styles from './Checkout.module.css';
import { API_DOMAIN } from '../../utils/Constants';
import { useAuth } from "../../contexts/AuthProvider";
import { useCart } from "../../contexts/CartProvider";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, matric } = useAuth();
  const { userCredits, cartCount, cartItems, setCredits, setCart } = useCart();

  console.log("User Credits:", userCredits);
  console.log("Cart Count:", cartCount);
  console.log("Cart Items:", cartItems);

  const initialCart = location.state?.cartItems && Object.keys(location.state.cartItems).length > 0
    ? { ...location.state.cartItems }
    : {};

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Monitor cart changes
  useEffect(() => {
    console.log("Cart Updated:", cartItems);
  }, [cartItems]);

  // Calculate total cost and remaining credits
  const totalCost = cartItems.reduce((sum, item) => {
    const quantity = item.quantity;
    return sum + item.cost * quantity;
  }, 0);

  console.log("Total Cost:", totalCost);

  const remainingCredits = userCredits - totalCost;

  const incrementQuantity = (itemName, price) => {
    if (remainingCredits - price < 0) {
      setErrorMessage("Insufficient credits to add this item.");
      return;
    }

    const updatedCart = cartItems.map(item =>
      item.itemName === itemName
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

  const updatedCount = updatedCart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  setCart(updatedCount, updatedCart);
  };

  const decrementQuantity = (itemName) => {

  if (errorMessage) {
    setErrorMessage("");
  }

  const updatedCart = cartItems.map(item =>
      item.itemName === itemName && item.quantity > 0
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

  const updatedCount = updatedCart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  setCart(updatedCount, updatedCart);
  };

  const removeItem = (itemName) => {

  if (errorMessage) {
    setErrorMessage("");
  }

    const updatedItems = cartItems.filter(item => item.itemName !== itemName);

    const updatedCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);

    setCart(updatedCount, updatedItems);
  };

  // Place order function - Updated to use a different approach
  // const handlePlaceOrder = () => {
  //   if (!cartItems || Object.keys(cartItems).length === 0) {
  //     setErrorMessage("Your cart is empty.");
  //     setTimeout(() => setErrorMessage(""), 3000);
  //     return;
  //   }

  //   if (!token) {
  //     navigate("/login", {
  //       state: { to: "/checkout", name: "Checkout" }
  //     });
  //     return;
  //   }

  //   setIsProcessing(true);
  //   setErrorMessage("");

  //   // Format cart items for the API
  //   const cartItems = {};
  //   Object.keys(cartItems).forEach(itemName => {
  //     if (cartItems[itemName] > 0) {
  //       cartItems[itemName] = cartItems[itemName];
  //     }
  //   });

  //   // Using a simple form POST approach to avoid CORS
  //   const formData = new FormData();
  //   formData.append('type', 'purchase');
  //   formData.append('token', token);
  //   formData.append('items', JSON.stringify(cartItems));

  //   // Create a temporary iframe to handle the response
  //   const iframeName = 'purchase_frame_' + Math.round(Math.random() * 100000);
  //   const iframe = document.createElement('iframe');
  //   iframe.name = iframeName;
  //   iframe.style.display = 'none';
  //   document.body.appendChild(iframe);

  //   // Create the form
  //   const form = document.createElement('form');
  //   form.method = 'POST';
  //   form.action = API_DOMAIN;
  //   form.target = iframeName;
  //   form.enctype = 'application/x-www-form-urlencoded';

  //   // Add hidden inputs
  //   const typeInput = document.createElement('input');
  //   typeInput.type = 'hidden';
  //   typeInput.name = 'type';
  //   typeInput.value = 'purchase';
  //   form.appendChild(typeInput);

  //   const tokenInput = document.createElement('input');
  //   tokenInput.type = 'hidden';
  //   tokenInput.name = 'token';
  //   tokenInput.value = token;
  //   form.appendChild(tokenInput);

  //   const itemsInput = document.createElement('input');
  //   itemsInput.type = 'hidden';
  //   itemsInput.name = 'items';
  //   itemsInput.value = JSON.stringify(cartItems);
  //   form.appendChild(itemsInput);

  //   // Add the form to the body and submit it
  //   document.body.appendChild(form);

  //   // Handle the iframe load event
  //   iframe.onload = () => {
  //     try {
  //       // Since we can't access the iframe content due to CORS, we'll simulate success
  //       // In a production environment, your API would need to redirect to a success page

  //       // Create order details
  //       const orderDetails = {
  //         orderId: `#${Math.floor(100000 + Math.random() * 900000)}`,
  //         date: new Date().toLocaleDateString("en-SG", {
  //           year: "numeric",
  //           month: "long",
  //           day: "numeric",
  //         }),
  //         totalCredits: totalCost,
  //         remainingCredits: userCredits - totalCost,
  //         items: cartItems.map((item) => ({
  //           name: item.itemName,
  //           quantity: item.quantity,
  //           image: item.image,
  //         })),
  //       };

  //       // Cleanup
  //       document.body.removeChild(form);
  //       document.body.removeChild(iframe);
  //       setIsProcessing(false);

  //       // Navigate to acknowledgement page
  //       navigate("/acknowledgement", {
  //         state: { orderDetails },
  //       });
  //     } catch (error) {
  //       console.error("Error processing purchase:", error);
  //       setErrorMessage("An error occurred during checkout. Please try again.");
  //       setIsProcessing(false);

  //       // Cleanup
  //       document.body.removeChild(form);
  //       document.body.removeChild(iframe);
  //     }
  //   };

  //   // Handle errors
  //   iframe.onerror = () => {
  //     setErrorMessage("Failed to process your order. Please try again.");
  //     setIsProcessing(false);

  //     // Cleanup
  //     document.body.removeChild(form);
  //     document.body.removeChild(iframe);
  //   };

  //   // Submit the form
  //   form.submit();
  // };

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
              {userCredits}
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

        {cartItems.length === 0 && (
          <div className={styles['empty-cart-container']}>
            <Typography variant="body" className={styles['empty-cart-message']}>
              Your cart is empty. Add some items before you check out.
            </Typography>
            <button className={styles['back-to-shop-button']} onClick={() => navigate("/shop")}>Back to Shop</button>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className={styles['checkout-items-container']}>
            {cartItems.map((item, idx) => {
              const quantity = item.quantity;
              const subtotal = item.cost * quantity;
              return (
                <div className={styles['checkout-item']} key={idx}>
                  <div className={styles['checkout-item-image']}>
                    <Image
                      src={item.image}
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
                      {item.cost} <span className={styles['hide-on-mobile']}>Credits</span>
                    </Typography>
                  </div>
                  <div className={styles['quantity-controls']}>
                    <button onClick={() => decrementQuantity(item.itemName)}>–</button>
                    <Typography variant="body" className={styles['quantity-count']}>
                      {quantity}
                    </Typography>
                    <button onClick={() => incrementQuantity(item.itemName, item.cost)}>+</button>
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
                      <img src={trashIcon} alt="Remove Icon" className={styles['trash-icon']} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className={styles['checkout-summary-container']}>
            <div className={styles['checkout-summary']}>
              <Typography variant="smallHeading" className={styles['summary-text']}>
                Total: {totalCost} Credits
              </Typography>
            </div>
            <div className={styles['checkout-place-order-container']}>
              <button
                className={styles['checkout-place-order-button']}
                // onClick={handlePlaceOrder}
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