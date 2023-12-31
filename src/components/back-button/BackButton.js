import "./BackButton.css";
import { useNavigate } from "react-router-dom";
import chevronLeft from "../../img/chevron-left.svg";

const BackButton = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="detail-back-button">
      <button className="detail-header-button" onClick={goBack}>
        <img src={chevronLeft} alt="back-button" />

        <div className="detail-header-button-back">Back</div>
      </button>
    </div>
  );
};

export default BackButton;
