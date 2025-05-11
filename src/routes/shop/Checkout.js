import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import Typography from "../../components/typography/Typography";
import BackButton from "../../components/BackButton/BackButton";
import PageGap from "../../components/pageGap/PageGap";
import coinIcon from '../../icons/coin-icon.png';
import styles from './Checkout.module.css';
import { API_DOMAIN } from '../../utils/Constants';
import { useAuth } from '../../contexts/AuthProvider';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();

  // Fetch the user's credit balance
  const { data: userData = {}, isLoading: userLoading } = useFetch({
    url: `${API_DOMAIN}?type=userdata&token=${token}`
  });
  // Default to 0 if not loaded yet
  const baseCredits = userData.currentInnocredit ?? 0;

  const initialCart = location.state?.cartItems && Object.keys(location.state.cartItems).length > 0
    ? { ...location.state.cartItems }
    : {};
  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    console.log("Cart Updated:", cart);
  }, [cart]);

  // Use the shop endpoint
  const { data, isLoading, error } = useFetch({ url: `${API_DOMAIN}?type=shop` });

  const cartItemsData = useMemo(() => {
    if (!Array.isArray(data) || !cart) return [];
    return data.filter(item => cart[item.itemName] > 0);
  }, [data, cart]);

  const totalCost = cartItemsData.reduce((sum, item) => {
    return sum + item.innocreditPrice * cart[item.itemName];
  }, 0);

  const remainingCredits = baseCredits - totalCost;

  // Prevent over-spend
  const incrementQuantity = (itemName, price) => {
    if (remainingCredits - price < 0) {
      alert("Insufficient credits to add more of this item.");
      return;
    }
    setCart(prev => ({ ...prev, [itemName]: (prev[itemName] || 0) + 1 }));
  };

  const decrementQuantity = (itemName) => {
    setCart(prev => {
      const next = { ...prev };
      if (next[itemName] > 1) next[itemName] -= 1;
      else delete next[itemName];
      return Object.keys(next).length > 0 ? next : {};
    });
  };

  // POST to the backend purchase endpoint
  const handlePlaceOrder = async () => {
    if (!cart || Object.keys(cart).length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const response = await fetch(`${API_DOMAIN}?type=purchase&token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "purchase", items: cart })
    });
    const result = await response.json();
    if (result.status !== "PURCHASE SUCCESSFUL") {
      alert(result.message || "Purchase failed.");
      return;
    }

    const orderDetails = {
      orderId: `#${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString("en-SG", {
        year: "numeric", month: "long", day: "numeric"
      }),
      totalCredits: totalCost,
      remainingCredits: result.remainingCredits,
      items: cartItemsData.map(item => ({
        name: item.itemName,
        quantity: cart[item.itemName],
        image: item.image?.preview_url || "/default-placeholder.png"
      }))
    };

    navigate("/acknowledgement", { state: { orderDetails } });
  };

  // Loading state
  if (isLoading || userLoading) {
    return (
      <PageTemplate>
        <PageGap>
          <Typography variant="heading">Checkout</Typography>
          <Typography>Loading…</Typography>
        </PageGap>
      </PageTemplate>
    );
  }

  if (error) {
    return (
      <PageTemplate>
        <PageGap>
          <Typography variant="heading">Checkout</Typography>
          <Typography>Error loading shop data.</Typography>
        </PageGap>
      </PageTemplate>
    );
  }

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
              Inno Credits Remaining:
            </Typography>
            <Typography variant="body" className={styles['credits-value']}>
              {Math.max(0, remainingCredits)}
            </Typography>
            <img src={coinIcon} alt="Credits Icon" className={styles['credits-icon']} />
          </div>
        </div>

        {(!data || cartItemsData.length === 0) && (
          <div className={styles['empty-cart-container']}>
            <Typography variant="body" className={styles['empty-cart-message']}>
              🚨 Your cart is empty. 🚨
            </Typography>
            <button onClick={() => navigate("/shop")}>Back to Shop</button>
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
                      src={item.image?.preview_url || "/default-placeholder.png"} className={styles['item-image']}
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = "/default-placeholder.png";}}
                    />

                  </div>
                  <div className={styles['checkout-item-name']}>
                    <Typography variant="smallHeading" className={styles['item-name']}>
                      {item.itemName}
                    </Typography>
                  </div>
                  <div className={styles['checkout-item-price']}>
                    <Typography variant="body">
                    {item.innocreditPrice} Credits
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
                    <Typography variant="body">
                      <strong>{subtotal} Credits</strong>
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

        {cartItemsData.length > 0 && (
          <div className={styles['checkout-place-order-container']}>
            <button
              className={styles['checkout-place-order-button']}
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        )}
      </PageGap>
    </PageTemplate>
  );
};

export default Checkout;
