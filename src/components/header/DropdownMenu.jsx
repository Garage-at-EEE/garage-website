import { useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Typography from "../typography/Typography";
import { ReactComponent as ArrowDown } from "../../icons/arrow_down.svg";
import useBreakpoint from "../../hooks/useBreakpoint";
import styles from "./Header.module.css";

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
          {header} <ArrowDown />
        </Typography>
      </div>

      {open && (
        <div className={containerClassName}>
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
