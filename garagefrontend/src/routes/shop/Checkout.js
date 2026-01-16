import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Transition from "../../components/transition/Transition";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import Typography from "../../components/typography/Typography";
import BackButton from "../../components/BackButton/BackButton";
import PageGap from "../../components/pageGap/PageGap";
import coinIcon from '../../icons/coin-icon.png';
import trashIcon from "../../icons/trash.svg";
import Image from '../../components/image/Image';
import styles from './Checkout.module.css';
import { useAuth } from "../../contexts/AuthProvider";
import { useCart } from "../../contexts/CartProvider";

const Checkout = () => {
  const navigate = useNavigate();
  const { token, name, matric } = useAuth();
  const { userCredits, cartCount, cartItems, setCart } = useCart();

  const [errorMessage, setErrorMessage] = useState("");

  const totalCost = cartItems.reduce((sum, item) => {
    const quantity = item.quantity;
    return sum + item.cost * quantity;
  }, 0);

  const remainingCredits = userCredits - totalCost;

  const incrementQuantity = (itemName, price) => {
    if (remainingCredits - price < 0) {
      setErrorMessage("Insufficient credits to add this item.");
      return;
    }

    const updatedCart = cartItems.map(item =>
      item.itemName === itemName
        ? { ...item, quantity: item.quantity + 1}
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
        ? { ...item, quantity: item.quantity - 1}
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

  const handlePlaceOrder = async () => {
    const payload = {
      name: name,
      matric: matric,
      token: token,
      item: cartItems.map((item) => ({
        itemName: item.itemName,
        quantity: item.quantity,
      })),
      type: "purchase",
      totalCost: totalCost,
      userCredits: userCredits,
      remainingCredits: remainingCredits
    };

    navigate("/acknowledgement", { state: { payload } });
  };

  return (
    <Transition>
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
          <div className={styles['checkout-wrapper']}>
            <div className={styles['checkout-table']}>
              <Typography variant="body" className={styles['checkout-table-heading']}>Image</Typography>
              <Typography variant="body" className={styles['checkout-table-heading']}>Product</Typography>
              <Typography variant="body" className={styles['checkout-table-heading']}>Price</Typography>
              <Typography variant="body" className={styles['checkout-table-heading']}>Quantity</Typography>
              <Typography variant="body" className={styles['checkout-table-heading']}>Subtotal</Typography>
              <div></div>
            </div>

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
          </div>

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
                  onClick={handlePlaceOrder}
                  disabled={!cartCount}
                >
                  Place Order
                </button>
              </div>
            </div>
          )}
        </PageGap>
      </PageTemplate>
    </Transition>
  );
};

export default Checkout;