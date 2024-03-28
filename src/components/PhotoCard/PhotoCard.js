import { Link } from "react-router-dom"; // Import Link from React Router
import styles from "./PhotoCard.module.css";
import Typography from "../typography/Typography";

const Card = ({ image, topText, bottomText, to }) => {
  const cardContent = (
    <div className={styles["card-wrapper"]}>
      <div className={styles.card}>
        <img
          className={styles["card-image"]}
          loading="lazy"
          src={image}
          referrerPolicy="no-referrer"
        />
        <div className={styles["text-overlay"]}>
          <Typography variant={"smallHeading"}>{topText}</Typography>
        </div>
      </div>
      {bottomText && (
        <Typography variant={"smallHeading"} className={styles["bottom-text"]}>
          {bottomText}
        </Typography>
      )}
    </div>
  );

  return to ? (
    <Link to={to} className={styles["link"]}>
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
};

export default Card;
