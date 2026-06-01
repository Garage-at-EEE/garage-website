import { Typography, Image } from "../../../components";
import { ReactComponent as RightChevron } from "../../../icons/arrow-forward-ios.svg";

import styles from "./Newsletter.module.css";

const NewsletterComponent = ({ src, link, title, date }) => {
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

export default NewsletterComponent;
