import { useState } from "react";
import { Link } from "react-router-dom";
import Typography from "../typography/Typography";
import { ReactComponent as ArrowDown } from "../../icons/arrow_down.svg";
import useBreakpoint from "../../hooks/useBreakpoint";
import styles from "./Header.module.css";

const DropdownMenu = ({ children, header, navlinks }) => {
  const [open, setOpen] = useState(false);
  const breakpoint = useBreakpoint();

  const handleOpen = (e) => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  return (
    <div //Wrapper for entire menu (detects for mouse enter/exit it and its children)
      className={styles["navlink"]}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
    >
      <Link className={styles["navlink"]}> 
        <Typography variant="body">
          {header} <ArrowDown />
        </Typography>
      </Link>

      {open && (
        <div //Main container for dropdown menu
          className={
            breakpoint !== "mobile" ? 
              styles["login-menu"] :
              styles["mobile-login-menu"]
          }
        >

        {navlinks.map((navlink) => (
          <Link //All protected route links in dropdown menu
            key={navlink.label}
            to={navlink.to}
            className={styles["navlink"]}
            onClick={handleClose}
          >
            <Typography variant="body">{navlink.label}</Typography>
          </Link>
        ))}

        {children}

        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
