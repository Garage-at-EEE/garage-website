import styles from "./PageGap.module.css";

const PageGap = ({ children }) => {
  return <div className={styles["wrapper"]}>{children}</div>;
};

export default PageGap;
