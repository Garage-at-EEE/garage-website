import Typography from "../Typography/Typography";
import BackButton from "../BackButton/BackButton";
import Image from "../Image/Image";
import styles from "./HeroImage.module.css";

const HeroImage = ({ heading, src, subheading, objectFit = "cover" }) => {
  return (
    <div className={styles.heading}>
      <div className={styles["top-space"]}>
        <div className={styles["heading-space"]}>
          <Typography variant="heading">{heading}</Typography>
          <BackButton />
        </div>
        {subheading && (
          <Typography variant={"smallHeading"}>{subheading}</Typography>
        )}
      </div>
      <Image
        objectFit={objectFit}
        src={src}
        className={styles["hero-image"]}
        alt={"image of '" + heading + "'"}
      />
    </div>
  );
};

export default HeroImage;