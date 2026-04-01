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

const isHashLink = (to) => typeof to === "string" && to.includes("#");

const DropdownMenu = ({ children, header, navlinks = [] }) => {
  const [open, setOpen] = useState(false);
  const breakpoint = useBreakpoint();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const containerClassName =
    breakpoint === "desktop" ? styles["login-menu"] : styles["tablet-login-menu"];

  const renderLink = (item) => {
    if (!item?.to) return null;

    if (isHashLink(item.to)) {
      return (
        <HashLink
          key={item.label}
          smooth
          to={item.to}
          className={styles.navlink}
          onClick={handleClose}
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
        onClick={handleClose}
      >
        <Typography variant="body">{item.label}</Typography>
      </Link>
    );
  };

  return (
    <div
      className={styles["navlink-container"]}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
    >
      {/* Header button (not actually navigating) */}
      <div
        className={`${styles.navlink} ${styles["navlink--dropdown"]}`}
        role="button"
        tabIndex={0}
      >
        <Typography variant="body">
          {header} <CircuitArrowDown />
        </Typography>
      </div>

      {open && (
        <div
          className={
            breakpoint === "desktop" ?
            styles["login-menu"] :
            styles["tablet-login-menu"]
          }
        >
          {navlinks.map((item) => {
            // 2nd level dropdown (e.g. Programmes -> ...)
            if (Array.isArray(item.dropdown)) {
              return (
                <div key={item.label} className={styles["submenu-container"]}>
                  <div className={styles["submenu-header"]}>
                    <Typography variant="body">{item.label}</Typography>
                    {/* optional right caret */}
                    <span style={{ marginLeft: 8 }}>›</span>
                  </div>

                  <div className={styles["submenu"]}>
                    {item.dropdown.map((sub) => renderLink(sub))}
                  </div>
                </div>
              );
            }

            // normal item
            return renderLink(item);
          })}

          {children}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
