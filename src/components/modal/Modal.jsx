import { motion, AnimatePresence } from "framer-motion";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";

const Modal = ({ children, open, onClose }) => {
  return createPortal(
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
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
