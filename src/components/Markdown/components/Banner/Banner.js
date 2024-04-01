import styles from "./Banner.module.css";

const BannerImage = ({ src, alt }) => {
  return (
    <img
      className={styles["banner-image"]}
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
    />
  );
};

export default BannerImage;
