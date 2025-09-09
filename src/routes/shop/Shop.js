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
import { useCart } from "../../contexts/CartProvider";
import axios from 'axios';

const Shop = () => {
  const { matric, token } = useAuth();
  const { userCredits, cartCount, cartItems, setCredits, setCart } = useCart();
  const [quantities, setQuantities] = useState({});
  const [isLoadingCredits, setIsLoadingCredits] = useState(false);
  const [insufficientCredits, setInsufficientCredits] = useState(false);
  const [emptyCart, setEmptyCart] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();

  const { data, isShopLoading } = useFetch({
    url: API_DOMAIN + "?type=shopInventory&token=" + token,
  });

useEffect(() => {
  if (userCredits) {
    console.log("User Credits:", userCredits);
    return;
  }

  const fetchPoints = async () => {
    try {
      setIsLoadingCredits(true);

      const config = { 
        headers: { 
          "Content-Type": "text/plain;charset=utf-8", 
        }, 
        redirect: "follow", 
        mode: "cors", 
        method: "POST", 
      };

      const response = await axios.post(API_DOMAIN, {
        matric,
        type: "shopData",
      }, config);

      if (response.data.status === "DATA RETRIEVAL SUCCESSFUL") {
        setCredits(response.data.info.currentInnocredit);
      } else {
        console.error("Error fetching user credits", response.data.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoadingCredits(false);
    }
    };

    fetchPoints();
  }, [userCredits, matric]);

  const items = useMemo(() => {
    if (!data || !Array.isArray(data)) {
      return [];
    }
    return data.filter(entry => entry.itemName && entry.innocreditPrice !== undefined);
  }, [data]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const initialQuantities = {};

      data.forEach(item => {
        const cartItem = cartItems.find(cart => cart.itemName === item.itemName);

        initialQuantities[item.itemName] = cartItem ? cartItem.quantity : 0;
      });

      setQuantities(initialQuantities);
    }
  }, [data, cartItems]);

  const incrementQuantity = (itemName) => {
    const itemPrice = items.find(item => item.itemName === itemName).innocreditPrice;
    const currentTotal = Object.entries(quantities).reduce((sum, [name, qty]) => {
      const item = items.find(i => i.itemName === name);
      return sum + (item.innocreditPrice) * qty;
    }, 0);

    if (userCredits - currentTotal - itemPrice < 0) {
      setShowWarning(true);
      setInsufficientCredits(true);
      return;
    }

    const newQuantities = {
      ...quantities,
      [itemName]: (quantities[itemName] || 0) + 1,
    };

    setQuantities(newQuantities);
    updateCart(newQuantities);

  };

  const decrementQuantity = (itemName) => {
    const newQuantities = {
      ...quantities,
      [itemName]: (quantities[itemName] || 0) - 1,
    };
    setQuantities(newQuantities);
    updateCart(newQuantities);

  };

  const updateCartCount = (newQuantities) => {
    const totalItems = Object.values(newQuantities).reduce((sum, qty) => sum + qty, 0);
    return totalItems
  };

  const updateCart = (newQuantities) => {
    const cartQuantities = items.filter(item => newQuantities[item.itemName] && newQuantities[item.itemName] > 0);
    const cartItems = cartQuantities.map(item => ({
      itemName: item.itemName,
      quantity: newQuantities[item.itemName],
      cost: item.innocreditPrice,
      image: item.image.preview_url
    }));
    const totalItems = updateCartCount(newQuantities);
    setCart(totalItems, cartItems);
  };

  const handleCheckout = () => {
    if (cartCount === 0) {
      setShowWarning(true);
      setEmptyCart(true);
      return;
    }
    navigate("/checkout");
  };

  return (
    <Transition isLoading={isShopLoading || isLoadingCredits || !data}>
      <PageTemplate>
        <PageGap>
          {showWarning && (
            <div className={styles['purchase-warning-backdrop']}>
              <div className={styles['purchase-warning-modal']}>
                {insufficientCredits && <Typography variant='smallHeading'>You have insufficient credits to add this item.</Typography>}
                {emptyCart && <Typography variant='smallHeading'>Your cart is empty.</Typography>}
                <button   onClick={() => {
                  setShowWarning(false);
                  setEmptyCart(false);
                  setInsufficientCredits(false);
                }}><Typography variant='body'>Confirm</Typography>
                </button>
              </div>
            </div>
          )}
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
                    {item.innocreditPrice} Credits
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
    </Transition>
    
  );
};

export default Shop;