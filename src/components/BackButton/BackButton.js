import styles from "./BackButton.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as ChevronLeft } from "../../icons/arrow_back_ios.svg";
import Button from "../button/Button";

const BackButton = ({ to }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasPreviousState = location.key !== "default";

  const goBack = () => {
    if (to) {
      navigate(to);
    } else if (hasPreviousState) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <Button
      className={styles["detail-header-button"]}
      onClick={goBack}
      startIcon={<ChevronLeft />}
      variant="outlined"
    >
      Back
    </Button>
  );
};


export default BackButton;
