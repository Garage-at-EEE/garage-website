import Gutter from "./gutter/Gutter";

import styles from "./PageTemplate.module.css";

const PageTemplate = ({ className, children }) => {
  return (
    <Gutter>
      <div className={[styles.wrapper, className].filter(Boolean).join(" ")}>
        {children}
      </div>
    </Gutter>
  );
};

export default PageTemplate;
