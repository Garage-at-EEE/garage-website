import React, { useState, useEffect} from "react";
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
import { SHOP_API } from '../../utils/Constants';


const Shop = () => {
  const { data, isLoading, error} = useFetch({
    url: SHOP_API,
  });
const navigate = useNavigate(); 

  const [quantities, setQuantities] = useState({});
  const [cartCount, setCartCount] = useState(0);


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
      initialQuantities[item.itemName] = 0;
    });
    setQuantities(initialQuantities);
  }
}, [data]);


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
  
   
  const updateCartCount = (newQuantities) => {
    const totalItems = Object.values(newQuantities).reduce((sum, qty) => sum + qty, 0);
    setCartCount(totalItems);
  };

  const handleCheckout = () => {
    if (cartCount === 0) {
      alert("Your cart is empty! Please add items before checking out.");
      return;
    }
    navigate("/checkout", { state: { cartItems: { ...quantities } } });
  };
  
  

if (isLoading) {
  return (
    <Transition isLoading={isLoading}>
    <PageTemplate>
      <Typography variant="largeHeading">Garage Shop</Typography>
      <Typography variant="body">🔄 Loading shop items...</Typography>
    </PageTemplate></Transition>
  );
}


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
            <Typography variant="body" className={styles['credits-value']}>100</Typography>
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
  );
};

export default Shop;
