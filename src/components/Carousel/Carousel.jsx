import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ReactComponent as Back } from "../../icons/arrow_back_ios.svg";
import { ReactComponent as Next } from "../../icons/arrow_forward_ios.svg";
import styles from "./Carousel.module.css";
import Typography from "../typography/Typography";
import Image from "../image/Image";
import Modal from "../modal/Modal";

const PrevButton = (props) => {
  const { children, ...restProps } = props;

  return (
    <button className={styles["pagination"]} {...restProps}>
      <Back className={styles["icon"]} />
    </button>
  );
};

const NextButton = (props) => {
  const { children, ...restProps } = props;

  return (
    <button className={styles["pagination"]} {...restProps}>
      <Next className={styles["icon"]} />
    </button>
  );
};

const Carousel = ({ images }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ skipSnaps: true });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [focusImage, setFocusImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, []);

  const handleImageClick = (imgsrc, index) => {
    if (currentIndex === index) setFocusImage(imgsrc);
    else emblaApi.scrollTo(index);
  };

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && !prevBtnDisabled) onPrevButtonClick();
      if (e.key === "ArrowRight" && !nextBtnDisabled) onNextButtonClick();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevBtnDisabled, nextBtnDisabled, emblaApi]);

  return (
    <section className={styles["carousel-container"]}>
      <div ref={emblaRef} className={styles["image-container"]}>
        <div className={styles["images"]}>
          {images.map((imgsrc, index) => (
            <div
              key={imgsrc}
              className={styles["image-slide"]}
              onClick={() => handleImageClick(imgsrc, index)}
            >
              <Image src={imgsrc} alt="" />
            </div>
          ))}
        </div>
      </div>

      <div className={styles["carousel-controls"]}>
        <div className={styles["carousel-pagination"]}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
        {emblaApi && (
          <Typography variant="body">
            {(currentIndex + 1).toString().padStart(2, "0")}/
            {images.length.toString().padStart(2, "0")}
          </Typography>
        )}
      </div>
      <Modal open={!!focusImage} onClose={() => setFocusImage("")}>
        <div>
          <Image
            src={focusImage}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className={styles["focus-image"]}
          />
        </div>
      </Modal>
    </section>
  );
};

export default Carousel;
