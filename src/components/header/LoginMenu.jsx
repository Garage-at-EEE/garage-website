import { Link } from "react-router-dom";
import Typography from "../typography/Typography";
import { useAuth } from "../../contexts/AuthProvider";
import styles from "./Header.module.css";
import DropdownMenu from "./DropdownMenu";

const LoginMenu = ({ protected_navlinks }) => {
  const { name, logoutAction } = useAuth();

  const handleLogout = (e) => {
    logoutAction();
  };

  return (
    <DropdownMenu header={name} navlinks={protected_navlinks}>
      <Link //Logout will be last link in the dropdown menu
        key="Logout"
        className={styles["navlink"]}
        onClick={handleLogout}
      >
        <Typography variant="body">Logout</Typography>
      </Link>
    </DropdownMenu>
  );
};

export default LoginMenu;
