import { motion } from "framer-motion";
import styles from "./AnimatedLine.module.css";

const AnimatedLine = ({
  width = "100%",
  accentWidth = "20%",
  lineColor = "rgba(255, 255, 255, 0.2)",
  accentColor = "var(--garage-blue)",
  height = "1px",
  accentHeight = "4px",
  className = "",
  animate = true,
  duration = 2,
}) => {
  return (
    <div className={`${styles.container} ${className}`} style={{ width }}>
      <div
        className={styles.baseLine}
        style={{
          backgroundColor: lineColor,
          height,
        }}
      />
      <motion.div
        className={styles.accentLine}
        style={{
          backgroundColor: accentColor,
          height: accentHeight,
          width: accentWidth,
        }}
        initial={{ x: 0, opacity: 0 }}
        animate={
          animate
            ? {
                x: ["0%", "100%", "0%"],
                opacity: [0, 1, 1, 0],
              }
            : { opacity: 1 }
        }
        transition={
          animate
            ? {
                duration,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : {}
        }
      />
    </div>
  );
};

export default AnimatedLine;
