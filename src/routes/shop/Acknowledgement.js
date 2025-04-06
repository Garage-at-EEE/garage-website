import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Transition from "../../components/transition/Transition";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import Typography from "../../components/typography/Typography";
import BackButton from "../../components/BackButton/BackButton";
import PageGap from "../../components/pageGap/PageGap";
import Image from '../../components/image/Image';
import coinIcon from '../../icons/coin-icon.png'; 
import cartIcon from '../../icons/shopping-cart.png'; 
import styles from './Acknowledgement.module.css';
import { SHOP_API } from '../../utils/Constants';

const Acknowledgement = () => {
      
    const location = useLocation();
  //  const navigate = useNavigate();
    //  const [baseCredits] = useState(100);
    const orderDetails = location.state?.orderDetails || {
      orderId: "#0123_456789",
      date: "December 12, 2024",
      totalCredits: 14,
      items: [2, 3, 1], // dummy images/items
    };

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
          <BackButton /></div>
          <div className={styles["credits-wrapper"]}>
          <div className={styles['credits']}>
            <Typography variant="body" className={styles['credits-label']}>
              Inno Credits:
            </Typography>
            <Typography variant="body" className={styles['credits-value']}>
              {orderDetails.remainingCredits < 0 ? 0 : orderDetails.remainingCredits}
            </Typography>
            <img src={coinIcon} alt="Credits Icon" className={styles['credits-icon']} />
          </div></div>

          <div className={styles['ack-container']}>
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
                    </div><img
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
            <div className={styles['ack-info-container']}>
                <div className={styles['ack-info']}>
                    <Typography variant="body">Order Code: {orderDetails.orderId}
                    </Typography></div>
                 <div className={styles['ack-info']}>
                    <Typography variant="body">Date: {orderDetails.date}
                    </Typography></div>
                 <div className={styles['ack-info']}>
                    <Typography variant="body">Total: {orderDetails.totalCredits} Credits
                </Typography> 
                 </div>
            </div>
  

          </div>
      </PageGap>
      </PageTemplate>
  );
};

export default Acknowledgement;
