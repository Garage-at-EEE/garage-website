import { forwardRef, useState } from "react";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import styles from "./Image.module.css";

/**
 * Drop in replacement for `<img>` tags. Provides lazy loading spinners
 * and fades image in on load
 */
const Image = forwardRef(
  (
    { src, alt, className, wrapperClassName, objectFit = "cover", ...rest },
    ref
  ) => {
    const [isLoading, setIsLoading] = useState(true);
    return (
      <div
        className={[styles["image-wrapper"], wrapperClassName]
          .filter(Boolean)
          .join(" ")}
      >
        {isLoading && (
          <div className={styles["spinner"]}>
            <LoadingSpinner />
          </div>
        )}
        <img
          loading="lazy"
          referrerPolicy="no-referrer"
          style={{ objectFit: objectFit }}
          className={[
            styles["image"],
            styles[objectFit],
            !isLoading && styles["loaded"],
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          src={src}
          alt={alt}
          onLoad={() => setIsLoading(false)}
          {...rest}
          ref={ref}
        />
      </div>
    );
  }
);

export default Image;
