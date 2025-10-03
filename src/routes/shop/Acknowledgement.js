import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Transition from "../../components/transition/Transition";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import Typography from "../../components/typography/Typography";
import BackButton from "../../components/BackButton/BackButton";
import PageGap from "../../components/pageGap/PageGap";
import Image from '../../components/image/Image';
import coinIcon from '../../icons/coin-icon.png';
import styles from './Acknowledgement.module.css';
import { PURCHASE_API_DOMAIN } from '../../utils/Constants';
import { useAuth } from "../../contexts/AuthProvider";
import { useCart } from "../../contexts/CartProvider";
import axios from 'axios';
import useFetchPoints from "../../hooks/useFetchPoints";

const Acknowledgement = () => {
  const { userCredits, cartItems, setCredits, setCart } = useCart();
  const { matric } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [isLoadingCredits, setIsLoadingCredits] = useState(false);
  const [acknowledgement, setAcknowledgement] = useState();
  const confirmation = useRef(false);

  const location = useLocation();
  const payload = (location.state?.payload || {});
  const now = new Date();

  const currentDate = now.toLocaleDateString();
  const currentTime = now.toLocaleTimeString();

  const orderDetails = cartItems.map(item => ({
    ...item,
    dateTime: new Date().toLocaleString(),
  }));

  console.log("Order Details:", orderDetails);

  const totalCost = cartItems.reduce((sum, item) => {
    const quantity = item.quantity;
    return sum + item.cost * quantity;
  }, 0);

  const { credits, loading } = useFetchPoints(
  orderDetails.length === 0 ? matric : null
  );

  useEffect(() => {
    setIsLoadingCredits(loading);
    if (credits !== undefined && credits !== null) {
      setCredits(credits);
  }  }, [loading, credits]);

  useEffect(() => {
    const sendOrder = async () => {
      try {
        setLoading(true);

        const response = await axios.post(
          PURCHASE_API_DOMAIN,
          payload,
          {
            redirect: "follow",
            mode: "cors",
            method: "POST",
            headers: {
              "Content-Type": "text/plain;charset=utf-8",
            },
          }
        );

        setAcknowledgement(response);

        if (response.data.status === "PURCHASE SUCCESSFUL") {
          console.log("Purchase successful:", response.data.info);
          setCredits(payload.remainingCredits);
          confirmation.current = true;
          return;
        }
        else {
          console.error("Purchase failed:", response.data.info.message);
          return;
        }
      } catch (error) {
        console.error("Error sending data to the server:", error);
        return;
      } finally{
        setLoading(false);
      }
    };
    sendOrder();

    return () => {
      if (confirmation.current) {
        setCart(0, []);
        console.log("Leaving acknowledgement page...");
      }
    };
  }, []);

  return (
    <Transition isLoading={isLoading || !acknowledgement || isLoadingCredits}>
      <PageTemplate>
        <PageGap>
          <div className={styles['heading-space']}>
            <Typography variant="heading">Acknowledgement</Typography>
            <BackButton to="/shop" />
          </div>
          <div className={styles["credits-wrapper"]}>
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
          {confirmation.current ? (
            <div className={styles['ack-container']}>
              <div className={styles['ack-info-container']}>
                <div className={styles['ack-order-date-time']}>
                  <Typography variant="body">Order Datetime: {currentDate} {currentTime}</Typography>
                </div>
              </div>
              <div className={styles['heading-text']}>
                <Typography variant="smallHeading">Thank You</Typography>
              </div>
              <div className={styles['ack-subtext-container']}>
                <Typography variant="body" className={styles['ack-subtext']}>
                  
                </Typography>
                <Typography variant="body" className={styles['ack-subtext']}>
                  An email has been sent to you with the collection details.
                </Typography>
                <Typography variant="body" className={styles['ack-subtext']}>
                  You can collect your items at the Garage Office (S2.2-B4-05) during opening hours.
                </Typography>
              </div>
              <div className={styles['ack-items-card']}>
                {orderDetails.map((item, index) => (
                  <div key={index} className={styles['ack-image-card']}>
                    <div className={styles['quantity-badge']}>
                      {item.quantity}
                    </div>
                    <Image
                      src={item.image}
                      alt={`Item ${index + 1}`}
                      className={styles['ack-item-image']}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-placeholder.png";
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className={styles['ack-info']}>
                <Typography variant="body">
                  Total: {totalCost} Credits
                </Typography>
              </div>
            </div>
          ) : (
            <div className={styles['ack-container']}>
              <div className={styles['heading-text']}>
                <Typography variant="smallHeading">Purchase Failed</Typography>
              </div>
              <div className={styles['ack-subtext-container']}>
                <Typography variant="body" className={styles['ack-subtext']}>
                  We are unable to process your order at the moment.
                </Typography>
                <Typography variant="body" className={styles['ack-subtext']}>
                  Please try again later.
                </Typography>
              </div>
            </div>
          )
        }
        </PageGap>
      </PageTemplate>
    </Transition>
  );
};

export default Acknowledgement;