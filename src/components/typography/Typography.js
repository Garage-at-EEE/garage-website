import typographyConfig from "./TypographyConfig";
import useBreakpoint from "../../hooks/useBreakpoint";

const Typography = ({ variant, children, style, ...props }) => {
  const breakpoint = useBreakpoint();
  const typography = typographyConfig[breakpoint] || {};
  const { fontSize, lineHeight, fontWeight } = typography[variant] || {};

  return (
    <p
      {...props}
      style={{
        fontSize,
        lineHeight,
        fontWeight,
        whiteSpace: "pre-line",
        ...style,
      }}
    >
      {children}
    </p>
  );
};

export default Typography;
