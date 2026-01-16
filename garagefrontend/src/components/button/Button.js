import { Link } from "react-router-dom";
import Typography from "../typography/Typography";

import styles from "./Button.module.css";
import { forwardRef } from "react";

const Button = forwardRef(
  (
    {
      children,
      onClick,
      startIcon,
      endIcon,
      to,
      variant = "filled",
      disabled = false,
      className,
      ...rest
    },
    ref
  ) => {
    const cn = [
      className,
      styles.btn,
      styles[variant],
      disabled && styles.disabled,
    ]
      .filter(Boolean)
      .join(" ");

    const Comp = to ? Link : "button";

    return (
      <Comp
        className={cn}
        to={to}
        onClick={onClick}
        disabled={disabled}
        ref={ref}
        {...rest}
      >
        {startIcon && (
          <div className={styles["start-icon-wrapper"]}>{startIcon}</div>
        )}
        <Typography variant="body">{children}</Typography>
        {endIcon && <div className={styles["end-icon-wrapper"]}>{endIcon}</div>}
      </Comp>
    );
  }
);

export default Button;
