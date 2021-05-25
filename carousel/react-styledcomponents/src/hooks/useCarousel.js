import { useState } from "react";

const useCarousel = () => {
  // Carousel window, currentSlide, duration, isMoving
  const [images] = useState(["/images/movie-1.jpg", "/images/movie-2.jpg", "/images/movie-3.jpg", "/images/movie-4.jpg"]);
  const [width, setWidth] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  // 마운트시 슬라이딩은 지연시간없이 진행된다.
  const sliding = (newCurrentSlide, newDuration = 0) => {
    if (newDuration) setIsMoving(true);

    setCurrentSlide(newCurrentSlide);
    setDuration(newDuration);
  };

  return { images, width, currentSlide, duration, isMoving, setWidth, setIsMoving, sliding };
};

export default useCarousel;
