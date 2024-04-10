import Typography from "../typography/Typography";

import styles from "./Button.module.css";

const Btn = ({
  children,
  onClick,
  variant = "filled",
  disabled = false,
  className,
  ...rest
}) => {
  // Use the btnStyle prop to determine the button class to be applied
  const cn = [
    styles.btn, // Base button class
    styles[variant],
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={cn} onClick={onClick} disabled={disabled} {...rest}>
      {" "}
      {/* Ensure type is "button" */}
      <Typography variant="body">{children}</Typography>
    </button>
  );
};

export default Btn;
