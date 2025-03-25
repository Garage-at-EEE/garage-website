import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import Typography from "../../components/typography/Typography";
import BackButton from "../../components/BackButton/BackButton";
import PageGap from "../../components/pageGap/PageGap";
import coinIcon from '../../icons/coin-icon.png';
import styles from './Checkout.module.css';
import { SHOP_API } from '../../utils/Constants';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialCart = location.state?.cartItems && Object.keys(location.state.cartItems).length > 0
    ? { ...location.state.cartItems }
    : {};

  const [cart, setCart] = useState(initialCart);
  const [baseCredits] = useState(100);

  useEffect(() => {
    console.log("Cart Updated:", cart);
  }, [cart]);

  const { data, isLoading, error } = useFetch({ url: SHOP_API });

  const cartItemsData = useMemo(() => {
    if (!data || !Array.isArray(data) || !cart) return [];
    return data.filter(item => cart[item.itemName] && cart[item.itemName] > 0);
  }, [data, cart]);

  const totalCost = cartItemsData.reduce((sum, item) => {
    const quantity = cart[item.itemName] || 0;
    return sum + item.innocreditPrice * quantity;
  }, 0);

  const remainingCredits = baseCredits - totalCost;

  const incrementQuantity = (itemName, price) => {
    if (remainingCredits - price < 0) {
      alert("Insufficient credits to add more of this item.");
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

  const handlePlaceOrder = () => {
    if (!cart || Object.keys(cart).length === 0) {
      alert("Your cart is empty.");
      return;
    }
    alert("Order placed successfully!");
    navigate("/");
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
                  <img
                    src={item.image?.preview_url || "/default-placeholder.png"}
                    alt={item.itemName || "Item"}
                    className={styles['item-image']}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/default-placeholder.png";
                    }}
                  />
                  <div className={styles['checkout-item-details']}>
                    <Typography variant="body" className={styles['item-name']}>
                      {item.itemName}
                    </Typography>
                    <Typography variant="body">
                      Price: <strong>{item.innocreditPrice} Credits</strong>
                    </Typography>

                    <div className={styles['quantity-controls']}>
                      <button onClick={() => decrementQuantity(item.itemName)}>–</button>
                      <Typography variant="body" className={styles['quantity-count']}>
                        {quantity}
                      </Typography>
                      <button onClick={() => incrementQuantity(item.itemName, item.innocreditPrice)}>+</button>
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

                    <Typography variant="body">
                      Subtotal: <strong>{subtotal} Credits</strong>
                    </Typography>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!isLoading && !error && cartItemsData.length > 0 && (
          <>
            <div className={styles['checkout-summary']}>
              <Typography variant="body" className={styles['summary-text']}>
                Total: {totalCost} Credits
              </Typography>
            </div>

            <div className={styles['checkout-place-order-container']}>
              <button className={styles['checkout-place-order-button']} onClick={handlePlaceOrder}>
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
