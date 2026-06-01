import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import { Typography } from "../../components";
import DropdownMenu from "./DropdownMenu";

import styles from "./Header.module.css";

const LoginMenu = ({ protected_navlinks }) => {
  const { name, logoutAction } = useAuth();

  const handleLogout = (e) => {
    logoutAction();
  };

  return (
    <DropdownMenu header={name} navlinks={protected_navlinks}>
      <Link key="Logout" className={styles["navlink"]} onClick={handleLogout}>
        <Typography variant="body">Logout</Typography>
      </Link>
    </DropdownMenu>
  );
};

export default LoginMenu;
