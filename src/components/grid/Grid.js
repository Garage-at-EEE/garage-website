import useBreakpoint from "../../hooks/useBreakpoint";
import styles from "./Grid.module.css";

const Grid = ({ children, desktop = 3, tablet = 2, mobile = 1 }) => {
  const breakpoint = useBreakpoint();
  const gridStyles = {
    gridTemplateColumns:
      breakpoint === "desktop"
        ? `repeat(${desktop}, 1fr)`
        : breakpoint === "tablet"
        ? `repeat(${tablet}, 1fr)`
        : `repeat(${mobile}, 1fr)`, // Use the 'columns' variable
  };
  return (
    <div className={styles["grid-container"]} style={gridStyles}>
      {children}
    </div>
  );
};

export default Grid;
