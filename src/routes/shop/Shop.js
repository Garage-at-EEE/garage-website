import React, { useState, useEffect, useMemo } from "react";
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
import { API_DOMAIN } from "../../utils/Constants";
import { useAuth } from "../../contexts/AuthProvider";

const Shop = () => {
  const { token } = useAuth();
  const navigate = useNavigate(); 

  // Fetch shop items from our new `type=shop` endpoint
  const { data: items = [], isLoading, error } = useFetch({
    url: `${API_DOMAIN}?type=shop`
  });

  // Fetch user credit balance from `type=userdata`
  const { data: userData = {}, isLoading: userLoading } = useFetch({
    url: `${API_DOMAIN}?type=userdata&token=${token}`
  });
  const userCredits = userData.currentInnocredit ?? 0;

  const [quantities, setQuantities] = useState({});
  const [cartCount, setCartCount] = useState(0);

  // Initialize quantities once items load
  useEffect(() => {
    if (Array.isArray(items)) {
      const init = {};
      items.forEach(item => { init[item.itemName] = 0; });
      setQuantities(init);
    }
  }, [items]);

  // Update the total cart count
  const updateCartCount = (newQuantities) => {
    const total = Object.values(newQuantities).reduce((a, b) => a + b, 0);
    setCartCount(total);
  };

  // Prevent adding if it exceeds userCredits
  const incrementQuantity = (itemName, price) => {
    // Current total cost
    const currentCost = Object.entries(quantities).reduce((sum, [name, qty]) => {
      const item = items.find(i => i.itemName === name);
      return sum + (item?.innocreditPrice || 0) * qty;
    }, 0);

    if (currentCost + price > userCredits) {
      alert("Insufficient credits to add more of this item.");
      return;
    }

    setQuantities(prev => {
      const updated = { ...prev, [itemName]: prev[itemName] + 1 };
      updateCartCount(updated);
      return updated;
    });
  };

  const decrementQuantity = (itemName) => {
    setQuantities(prev => {
      const updated = { ...prev };
      updated[itemName] = Math.max(0, prev[itemName] - 1);
      updateCartCount(updated);
      return updated;
    });
  };

  const handleCheckout = () => {
    if (cartCount === 0) {
      alert("Your cart is empty! Please add items before checking out.");
      return;
    }
    navigate("/checkout", { state: { cartItems: { ...quantities } } });
  };

  if (isLoading || userLoading) {
    return (
      <Transition isLoading>
        <PageTemplate>
          <Typography variant="largeHeading">Garage Shop</Typography>
          <Typography variant="body">🔄 Loading shop data...</Typography>
        </PageTemplate>
      </Transition>
    );
  }

  if (error) {
    return (
      <PageTemplate>
        <Typography variant="largeHeading">Garage Shop</Typography>
        <Typography variant="body" className={styles['error-message']}>
          Failed to load shop items. Please try again later.
        </Typography>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      <PageGap>
        <div className={styles['heading-space']}>
          <Typography variant="heading">Garage Shop</Typography>
          <BackButton />
        </div>

        <div className={styles['heading-space']}>
          <Typography variant="smallHeading">
            Welcome to Garage Shop
          </Typography>
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

        <div className={styles['shop-items-container']}>
          {items.map((item, idx) => (
            <div key={idx} className={styles['shop-item']}>
              <Image
                src={item.image?.preview_url || "/default-placeholder.png"}
                alt={item.itemName}
                className={styles['item-image']}
                onError={e => { e.target.onerror = null; e.target.src = "/default-placeholder.png"; }}
              />

              <Typography variant="subtitle" className={styles['item-description']}>
                {item.description || "No description available."}
              </Typography>

              <Typography variant="body" className={styles['item-name']}>
                {item.itemName}
              </Typography>

              <div className={styles['item-price']}>
                <Typography variant="body">
                  {item.innocreditPrice} Credits
                </Typography>
                <img src={coinIcon} alt="Credits Icon" className={styles['credits-icon']} />
              </div>

              <div className={styles['item-stock-quantity']}>
                <Typography variant="body" className={styles['item-stock']}>
                  {item.inventory ? `Stock: ${item.inventory}` : "Out of Stock"}
                </Typography>
                <div className={styles['quantity-controls']}>
                  <button
                    onClick={() => decrementQuantity(item.itemName)}
                    disabled={quantities[item.itemName] === 0}
                  >–</button>
                  <Typography variant="body" className={styles['quantity-count']}>
                    {quantities[item.itemName]}
                  </Typography>
                  <button
                    onClick={() => incrementQuantity(item.itemName, item.innocreditPrice)}
                    disabled={item.inventory && quantities[item.itemName] >= item.inventory}
                  >+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles['checkout']}>
          <button className={styles['checkout-button']} onClick={handleCheckout}>
            <div className={styles['cart-icon-wrapper']}>
              <img src={cartIcon} alt="Cart Icon" className={styles['cart-icon']} />
              {cartCount > 0 && <span className={styles['cart-count']}>{cartCount}</span>}
            </div>
            Check Out
          </button>
        </div>
      </PageGap>
    </PageTemplate>
  );
};

export default Shop;
