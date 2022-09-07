import React, { useState } from "react";
import "./carousel.css";
import { Carousel, CarouselItem, CarouselIndicators } from "reactstrap";

export const CarouselDiv = ({ name, img }) => {
  let img1 = img[0].img1;
  let img2 = img[0].img2;
  let img3 = img[0].img3;
  console.log(img1);
  const items = [
    {
      src: img1,
      altText: name,
      key: 1,
    },
    {
      src: img2,
      altText: name,
      key: 2,
    },
    {
      src: img3,
      altText: name,
      key: 3,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        className="carouselItem"
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
      </CarouselItem>
    );
  });
  return (
    <div className="divCarousel">
      <Carousel activeIndex={activeIndex}>
        <CarouselIndicators
          className="carouselIndicators"
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
      </Carousel>
    </div>
  );
};
