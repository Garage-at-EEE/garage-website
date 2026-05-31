import React from "react";
import styles from "./Gutter.module.css";

const Gutter = ({ children }) => {
  return (
    <div className={styles.gutter}>
      <div className={styles.container}>{children} </div>
    </div>
  );
};

export default Gutter;
