import { useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Typography from "../typography/Typography";
import useBreakpoint from "../../hooks/useBreakpoint";
import styles from "./Header.module.css";

const CircuitArrowDown = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', marginLeft: '4px' }}>
    <path d="M12 16l-6-6h12l-6 6z" />
    <circle cx="12" cy="4" r="1.5" />
    <line x1="12" y1="4" x2="12" y2="10" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

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
      <div
        className={styles["navlink-container"]}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
      >
      <Link className={styles["navlink"]}> 
        <Typography variant="body">
          {header} <CircuitArrowDown />
        </Typography>
      </Link>

      {open && (
        <div
          className={
            breakpoint === "desktop" ?
            styles["login-menu"] :
            styles["tablet-login-menu"]
          }
        >

          {navlinks.map((item) => {
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