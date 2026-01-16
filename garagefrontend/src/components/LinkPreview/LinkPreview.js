import Typography from "../typography/Typography";
import styles from "./LinkPreview.module.css";

function LinkPreview({ link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className={styles["link-preview"]}
    >
      <img
        className={styles["favicon"]}
        src={`https://www.google.com/s2/favicons?domain=${link}&sz=128`}
        alt="url's favicon"
      />
      <div className={styles["link-label"]}>
        <Typography variant="smallHeading">Visit Us</Typography>
        <Typography className={styles["truncate"]}>{link}</Typography>
      </div>
    </a>
  );
}

export default LinkPreview;
