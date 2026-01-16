import { Link } from "react-router-dom"; // Import Link from React Router
import styles from "./PhotoCard.module.css";
import Typography from "../typography/Typography";
import Image from "../image/Image";

const Card = ({ image, topText, bottomText, tagline, bottomTextClassName, to }) => {
  const Comp = to ? Link : "div";
  return (
    <Comp
      to={to}
      className={[styles["card-wrapper"], to && styles["link"]]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.card}>
        <div className={styles["card-image"]}>
          <Image src={image} alt={topText ?? bottomText} />
        </div>
        <div className={styles["text-overlay"]}>
          <Typography variant={"smallHeading"}>{topText}</Typography>
        </div>
      </div>
      {(bottomText || tagline) && (
        <div className={styles["card-content"]}>
          {bottomText && (
            <Typography variant={"smallHeading"} className={[styles["bottom-text"], bottomTextClassName].join(" ")}>
              {bottomText}
            </Typography>
          )}
          {tagline && (
            <p className={styles["card-tagline"]}>{tagline}</p>
          )}
        </div>
      )}
    </Comp>
  );
};

export default Card;
