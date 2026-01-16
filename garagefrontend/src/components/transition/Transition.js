import { motion } from "framer-motion";
import styles from "./Transition.module.css";
import { useLayoutEffect } from "react";

const Transition = ({ children, isLoading }) => {
  const anim = (variants, custom) => {
    return {
      initial: "initial",
      animate: isLoading ? "loading" : "hide",
      exit: "exit",
      variants,
      custom,
    };
  };

  const easing = [0.7, 0, 0.3, 1];
  const duration = 0.75; // Minimum of 0.1
  const loadingText = "Loading";

  // Animation starts from initial -> loading, once isLoading == false -> hide
  // On unmount exit animation plays

  const slideWhite = {
    initial: {
      y: 0,
    },
    hide: {
      y: "-100%",
      transition: {
        delay: 0.15,
        duration: duration + 0.1,
        ease: easing,
      },
      transitionEnd: {
        y: "100%",
      },
    },
    exit: {
      y: 0,
      transition: {
        duration: duration,
        ease: easing,
      },
    },
  };

  const slideBlue = {
    initial: {
      y: 0,
    },
    hide: {
      y: "-100%",
      transition: {
        duration: duration,
        ease: easing,
      },
      transitionEnd: {
        y: "100%",
      },
    },
    exit: {
      y: 0,
      transition: {
        delay: 0.15,
        duration: duration + 0.1,
        ease: easing,
      },
    },
  };

  const opacity = {
    initial: {
      opacity: 0.7,
    },
    hide: {
      opacity: 0,
      transition: {
        delay: 0.4,
        duration: duration,
      },
    },
    exit: {
      opacity: 0.7,
      transition: {
        duration: duration,
        ease: easing,
      },
    },
  };

  const slideText = {
    initial: {
      opacity: 1,
    },
    hide: {
      opacity: 0,
      top: "-10%",
      transition: {
        duration: duration - 0.1,
        ease: easing,
      },
      transitionEnd: {
        top: "110%",
      },
    },
    exit: {
      opacity: 1,
      top: "50%",
      transition: {
        delay: 0.15,
        duration: duration + 0.1,
        ease: easing,
      },
    },
  };

  const text = {
    loading: (i) => ({
      y: [0, -20],
      transition: {
        duration: 1,
        delay: 0.1 * i,
        repeatType: "reverse",
        repeat: Infinity,
        ease: [0, 0.55, 0.45, 1],
      },
    }),
    hide: {
      fontWeight: 100,
      letterSpacing: "1.2px",
      y: 0,
      transition: {
        duration: duration - 0.1,
        ease: easing,
      },
    },
    exit: {
      fontWeight: 500,
      letterSpacing: "-1.5px",
      transition: {
        delay: 0.15,
        duration: duration + 0.1,
        ease: easing,
      },
    },
  };

  const content = {
    initial: { y: "10rem", opacity: 0 },
    hide: {
      y: 0,
      opacity: 1,
      transition: {
        delay: duration / 1.5,
        duration: duration,
        ease: [0, 0, 0, 1],
      },
    },
  };

  useLayoutEffect(() => {
    // Scroll to top of page
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <motion.div className={styles["loading-text"]} {...anim(slideText)}>
        {[...Array(loadingText.length)].map((_, index) => {
          return (
            <motion.p key={loadingText.charAt(index)} {...anim(text, index)}>
              {loadingText.charAt(index)}
            </motion.p>
          );
        })}
      </motion.div>
      <motion.div className={styles["blue"]} {...anim(slideBlue)} />
      <motion.div className={styles["white"]} {...anim(slideWhite)} />
      <motion.div className={styles["overlay"]} {...anim(opacity)} />
      <motion.main {...anim(content)}>{children}</motion.main>
    </>
  );
};

export default Transition;
