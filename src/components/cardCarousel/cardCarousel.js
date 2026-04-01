import { useState, useEffect } from "react";
import Card from "../PhotoCard/PhotoCard";
import { ReactComponent as Back } from "../../icons/arrow_back_ios.svg";
import { ReactComponent as Next } from "../../icons/arrow_forward_ios.svg";
import styles from "./cardCarousel.module.css";

const CardCarousel = ({
  data,
  linkPrefix = "/project-openings/", // default to project-openings
  autoPlay = true, // default auto play next image
  interval = 10000, // default to 10 seconds
  maxItems = 5, // default to display 5 items max
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const arrayData = Array.isArray(data) ? data : [];
  const displayData = arrayData.slice(0, maxItems);

  // Left/right arrow navigation
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % displayData.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + displayData.length) % displayData.length
    );
  };

  // Auto-play logic
  useEffect(() => {
    if (!autoPlay || displayData.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % displayData.length);
    }, interval);

    return () => clearInterval(timer);
  }, [displayData.length, autoPlay, interval, activeIndex]);

  if (!displayData || displayData.length === 0) return null;

  const activeItem = displayData[activeIndex];

  return (
    <div className={styles["carousel-container"]}>
      <div className={styles["main-display"]}>
        {/* Left Arrow */}
        <button
          className={styles["arrow-btn"]}
          onClick={handlePrev}
          aria-label="Previous"
        >
          <Back className={styles["arrow-icon"]} />
        </button>

        <div className={styles["card-wrapper"]}>
          <Card
            image={activeItem.coverPic}
            bottomText={activeItem.name}
            to={`${linkPrefix}${activeItem.id}`}
          />
        </div>

        {/* Right Arrow */}
        <button
          className={styles["arrow-btn"]}
          onClick={handleNext}
          aria-label="Next"
        >
          <Next className={styles["arrow-icon"]} />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className={styles["dots-container"]}>
        {displayData.map((_, index) => (
          <button
            key={index}
            className={`${styles["dot"]} ${
              index === activeIndex ? styles["dot-active"] : ""
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;
