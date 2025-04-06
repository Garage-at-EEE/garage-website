import { useState } from "react";
import { Link } from "react-router-dom";
import Typography from "../typography/Typography";
import { ReactComponent as ArrowDown } from "../../icons/arrow_down.svg";
import { useAuth } from "../../contexts/AuthProvider";
import useBreakpoint from "../../hooks/useBreakpoint";
import styles from "./Header.module.css";

const LoginMenu = ({ protected_navlinks }) => {
  const [open, setOpen] = useState(false);
  const { name, logoutAction } = useAuth();
  const breakpoint = useBreakpoint();

  const handleOpen = (e) => {
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  const handleLogout = (e) => {
    window.location.reload();
    setOpen(false);
    logoutAction();
  };

  return (
    <div //Wrapper for entire menu (detects for mouse enter/exit it and its children)
      className={styles["navlink"]}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
    >
      <Link className={styles["navlink"]}> 
        <Typography variant="body">
          {name} <ArrowDown />
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

        {protected_navlinks.map((navlink) => (
          <Link //All protected route links in dropdown menu
            key={navlink.label}
            to={navlink.to}
            className={styles["navlink"]}
            onClick={handleClose}
          >
            <Typography variant="body">{navlink.label}</Typography>
          </Link>
        ))}

          <Link //Logout will be last link in the dropdown menu
            key="Logout"
            className={styles["navlink"]} 
            onClick={handleLogout}
          >
            <Typography variant="body">Logout</Typography>
          </Link>
        </div>
      )}
    </div>
  );
};

export default LoginMenu;
