import { useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
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
      <div //Wrapper for entire menu (detects for mouse enter/exit it and its children (desktop) & detects clicks (tablet))
        className={styles["navlink-container"]}
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
            breakpoint === "desktop" ?
            styles["login-menu"] :
            styles["tablet-login-menu"]
          }
        >

          {navlinks.map((item) => {
            // If it's a hash link, use HashLink for in-page scroll
            if (item.to.includes("#")) {
              return (
                <HashLink
                  key={item.label}
                  smooth
                  to={item.to}
                  className={styles.navlink}
                  onClick={() => setOpen(false)}
                >
                  <Typography variant="body">{item.label}</Typography>
                </HashLink>
              );
            }
            // Otherwise a normal page Link
            return (
              <Link
                key={item.label}
                to={item.to}
                className={styles.navlink}
                onClick={() => setOpen(false)}
              >
                <Typography variant="body">{item.label}</Typography>
              </Link>
            );
          })}

        {children}

        </div>
      )}
    </div>
  );
};

export default DropdownMenu;