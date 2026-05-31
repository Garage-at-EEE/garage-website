import styles from "./Typography.module.css";

const Typography = ({
  variant = "body",
  children,
  textAlign,
  style,
  className,
  ...props
}) => {
  const cn = [styles[variant], className, styles["base"]].join(" ");

  return (
    <p
      {...props}
      className={cn}
      style={{
        textAlign: textAlign,
        ...style,
      }}
    >
      {children}
    </p>
  );
};

export default Typography;
