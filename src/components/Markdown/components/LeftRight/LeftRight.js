import React from "react";
import styles from "./LeftRight.module.css";
import MarkdownProcessor from "../../MarkdownProcessor";

const LeftRightLayout = ({ leftContent, rightContent }) => {
  return (
    <div className={styles["left-right-layout"]}>
      <div className={styles.left}>
        <MarkdownProcessor content={leftContent}></MarkdownProcessor>
      </div>
      <div className={styles.right}>
        <MarkdownProcessor content={rightContent}></MarkdownProcessor>
      </div>
    </div>
  );
};

export default LeftRightLayout;
