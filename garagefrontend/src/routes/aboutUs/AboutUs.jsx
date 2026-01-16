import Typography from "../../components/typography/Typography";
import Transition from "../../components/transition/Transition";
import { motion } from "framer-motion";
import styles from "./AboutUs.module.css";
import bannerImage from "../../img/banner.jpeg";

const AboutUs = () => {
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
              src="/img/cappy/goldcappyforward.png"
              alt="Garage Mascot"
              className={styles.mascot}
            />
          </motion.div>
        </div>

        <div className={styles.comingSoon}>
          <Typography variant="smallHeading">
            Content Coming Soon
          </Typography>
          <Typography variant="body">
            We're working on something exciting. Check back later!
          </Typography>
        </div>
      </div>
    </Transition>
  );
};

export default AboutUs;
