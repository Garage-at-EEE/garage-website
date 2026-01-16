import Typography from "../typography/Typography";
import { ReactComponent as RightChevron } from "../../icons/arrow_forward_ios.svg";
import Image from "../image/Image";
import styles from "./Newsletter.module.css";

const Newsletter = ({ src, link, title, date }) => {
  return (
    <div className={styles["newsletter-wrapper"]}>
      <Image
        src={src}
        alt={`${title} cover`}
        wrapperClassName={styles["cover"]}
      />
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className={styles["link"]}
      >
        <span className={styles["text"]}>
          <Typography variant="smallHeading">{title}</Typography>
          <Typography>{date}</Typography>
        </span>
        <RightChevron className={styles["chevron"]} />
      </a>
    </div>
  );
};

export default Newsletter;
