import { motion, AnimatePresence } from "framer-motion";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";

const Modal = ({ children, open, onClose, below = false }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={["modal", styles.modal, below && styles["below"]]
            .filter(Boolean)
            .join(" ")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.7, 0, 0.3, 1] }}
          onClick={onClose}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
