import { useState } from "react";

type Slide = {
  imageUrl: string;
};

type ImageSliderProps = {
  slides: Slide[];
};

export default function ImageSlider({ slides }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (!slides || slides.length === 0) {
    return <div>No slides available</div>;
  }

  return (
    <div className="relative">
      <div
        className="absolute top-[50%] left-[32px] text-2xl z-10 cursor-pointer"
        onClick={goToPrevious}
      >
        Prev
      </div>
      <div
        className="h-[350px] md:h-[450px] lg:h-[550px] w-full "
        style={{
          background: `url(${slides[currentIndex]}) center no-repeat`,
          backgroundSize: "cover",
        }}
      />
      <div
        className="absolute top-[50%] right-[32px] text-2xl z-10 cursor-pointer"
        onClick={goToNext}
      >
        Next
      </div>
    </div>
  );
}
