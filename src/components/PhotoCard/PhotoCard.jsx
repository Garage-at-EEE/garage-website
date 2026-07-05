import { Link } from "react-router-dom";
import {Typography, Image} from "../../components";

import styles from "./PhotoCard.module.css";

const Card = ({ image, topText, bottomText, bottomTextClassName, to }) => {
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
      {bottomText && (
        <Typography variant={"smallHeading"} className={[styles["bottom-text"], bottomTextClassName].join(" ")}>
          {bottomText}
        </Typography>
      )}
    </Comp>
  );
};

export default Card;