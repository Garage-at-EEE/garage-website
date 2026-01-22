import Typography from "../../components/typography/Typography";
import Transition from "../../components/transition/Transition";
import { motion } from "framer-motion";
import { useEffect } from "react";
import styles from "./AboutUs.module.css";
import bannerImage from "../../img/banner.jpeg";
import cappyimg from "../../img/cappy/goldcappyforwardtrans.png";
import excitedcappy from "../../img/cappy/excitedtranscappy copy.webm";
import bluecappy from "../../img/cappy/bluecappyforwardtrans.png";

const AboutUs = () => {
  useEffect(() => {
    const images = document.querySelectorAll('.fade-on-scroll');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          entry.target.classList.remove('is-fading');
        } else {
          entry.target.classList.remove('is-visible');
          entry.target.classList.add('is-fading');
        }
      });
    }, { threshold: 0.3 });

    images.forEach(img => observer.observe(img));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Transition>
      <div className={styles.aboutContainer}>
        <div className={styles.heroSection}>
          <div 
            className={styles.heroBackground}
            style={{ backgroundImage: `url(${bannerImage})` }}
          />
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="heading" className={styles.heroTitle}>
              GARAGE@EEE
            </Typography>
            <Typography variant="body" className={styles.heroSubtitle}>
              Where Innovation Meets Community
            </Typography>
          </motion.div>

          <motion.div
            className={styles.mascotContainer}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <img
              src={cappyimg}
              alt="Garage Mascot"
              className={styles.mascot}
            />
          </motion.div>
        </div>

        <div className={styles.comingSoon}>
          <div className={styles.textContent}>
            <Typography variant="Heading">
              Our story begins here...
            </Typography>
            <Typography variant="body">
              conceptualized in 2012, with the first batch of projects approved in october 2014 
            </Typography>
          </div>

          <img 
            src={bluecappy} 
            alt="Garage Mascot Blue Cappy" 
            className="fade-on-scroll"
            style={{ width: '200px', height: 'auto', marginRight: 'auto' }}
          />
          
          <video 
            className={styles.videoRight}
            autoPlay 
            muted 
            loop
            playsInline
            style={{ backgroundColor: 'transparent' }}
          >
            <source src={excitedcappy} type="video/webm" />
          </video>
        </div>
  
      </div>
    </Transition>
  );
};

export default AboutUs;


