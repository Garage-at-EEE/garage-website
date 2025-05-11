// Acknowledgement.js
import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import Typography from "../../components/typography/Typography";
import BackButton from "../../components/BackButton/BackButton";
import PageGap from "../../components/pageGap/PageGap";
import Image from '../../components/image/Image';
import coinIcon from '../../icons/coin-icon.png'; 
import styles from './Acknowledgement.module.css';

const Acknowledgement = () => {
  const { state } = useLocation();
  const orderDetails = state?.orderDetails;
  
  if (!orderDetails) {
    return (
      <PageTemplate>
        <PageGap>
          <Typography variant="heading">Invalid Order</Typography>
          <Typography variant="body">No order data was found.</Typography>
        </PageGap>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      <PageGap>
        <div className={styles['heading-space']}>
          <Typography variant="heading">Acknowledgement</Typography>
          <BackButton />
        </div>

        <div className={styles['credits-wrapper']}>
          <div className={styles['credits']}>
            <Typography variant="body" className={styles['credits-label']}>
              Inno Credits Remaining:
            </Typography>
            <Typography variant="body" className={styles['credits-value']}>
              {Math.max(0, orderDetails.remainingCredits)}
            </Typography>
            <img src={coinIcon} alt="Credits Icon" className={styles['credits-icon']} />
          </div></div>

          <div className={styles['ack-container']}>
            <div className={styles['ack-info-container']}>
              <div className={styles['ack-order-id']}>  <Typography variant="body">Order ID: {orderDetails.orderId}
              </Typography></div>
              <div className={styles['ack-order-date']}>  <Typography variant="body">Date: {orderDetails.date}
              </Typography></div>
            </div>
            <div className={styles['heading-text']}>
                <Typography variant="smallHeading">Thank You!🎉</Typography>
            </div>
            <div className={styles['ack-subtext-container']}><Typography variant="body" className={styles['ack-subtext']}>
                Your order has been received.</Typography>
                <Typography variant="body" className={styles['ack-subtext']}> An email has been sent to you with the collection details.
                  </Typography>
            </div>
            <div className={styles['ack-items-card']}>
                {orderDetails.items.map((item, index) => (
                    <div key={index} className={styles['ack-image-card']}>
                    <div className={styles['quantity-badge']}>
                        {item.quantity}
                    </div><Image
                        src={item.image}
                        alt={`Item ${index}`}
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
                <Typography variant="body">Total: {orderDetails.totalCredits} Credits
                </Typography> 
            </div>
          </div>
        </div>

        <div className={styles['ack-container']}>
          <Typography variant="smallHeading">Thank You! 🎉</Typography>
          <Typography variant="body" className={styles['ack-subtext']}>
            Your order has been received.
          </Typography>
          <Typography variant="body" className={styles['ack-subtext']}>
            An email has been sent to you with the collection details.
          </Typography>

          <div className={styles['ack-items-card']}>
            {orderDetails.items.map((item, idx) => (
              <div key={idx} className={styles['ack-image-card']}>
                <div className={styles['quantity-badge']}>{item.quantity}</div>
                <img
                  src={item.image || "/default-placeholder.png"}
                  alt={item.name || `Item ${idx}`}
                  className={styles['ack-item-image']}
                  onError={e => { e.target.onerror = null; e.target.src = "/default-placeholder.png"; }}
                />
              </div>
            ))}
          </div>

          <div className={styles['ack-info-container']}>
            <Typography variant="body">
              Order Code: {orderDetails.orderId}
            </Typography>
            <Typography variant="body">
              Date: {orderDetails.date}
            </Typography>
            <Typography variant="body">
              Total Spent: {orderDetails.totalCredits} Credits
            </Typography>
          </div>
        </div>
      </PageGap>
    </PageTemplate>
  );
};

export default Acknowledgement;
