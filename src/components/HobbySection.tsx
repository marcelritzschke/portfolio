import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";

const HobbySection: React.FC = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [hasReachedBottom, setHasReachedBottom] = useState(false);
  const totalSlides = 2;
  const scrollThrottle = 1000;
  const bottomCooldown = 500;

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      const isAtPageBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 10;

      if (isAtPageBottom) {
        if (!hasReachedBottom) {
          setHasReachedBottom(true);
          setIsScrolling(true);
          setTimeout(() => setIsScrolling(false), bottomCooldown); // Delay before slide change
          return;
        }

        if (isScrolling) {
          event.preventDefault(); // Stop normal scrolling
        } else {
          if (slideIndex == 0 && event.deltaY < 0) {
            // allow scrolling the page up
            setHasReachedBottom(false);
          } else {
            event.preventDefault(); // Stop normal scrolling

            setIsScrolling(true);
            const delta = event.deltaY;

            if (delta > 0 && slideIndex < totalSlides - 1) {
              setSlideIndex((prev) => prev + 1);
            } else if (delta < 0 && slideIndex > 0) {
              setSlideIndex((prev) => prev - 1);
            }
            setTimeout(() => setIsScrolling(false), scrollThrottle);
          }
        }
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [slideIndex, isScrolling, hasReachedBottom]);

  return (
    <div className="hobby-section bg-dark vh-100 pt-5">
      <div className="container">
        <h2 className="headline text-center text-white mb-5">Beyond Work</h2>

        <Carousel
          activeIndex={slideIndex}
          onSelect={(selectedIndex) => setSlideIndex(selectedIndex)}
          interval={null}
        >
          <Carousel.Item>
            <img
              src="mika1.jpg"
              className="d-block w-100"
              alt="First slide"
              style={{ height: "75vh", objectFit: "cover" }}
            />
            <Carousel.Caption className="bg-dark bg-opacity-50 p-3 rounded">
              <h5>Living the Dad Life</h5>
              {/* <p>
                Some representative placeholder content for the first slide.
              </p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="hiking1.JPEG"
              className="d-block w-100"
              alt="Second slide"
              style={{ height: "75vh", objectFit: "cover" }}
            />
            <Carousel.Caption className="bg-dark bg-opacity-50 p-3 rounded">
              <h5>Into the Wilds of Beijing</h5>
              {/* <p>
                Some representative placeholder content for the second slide.
              </p> */}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default HobbySection;
