import React from "react";
import { TECarousel, TECarouselItem } from "tw-elements-react";
import { inter1, inter2, inter3 } from "../../assets/imges/images";
import { Link } from "react-router-dom";

const images = [
  {
    img: inter1,
    link: "link1",
  },
  {
    img: inter2,
    link: "link2",
  },
  {
    img: inter3,
    link: "link3",
  },
];

const HomeCarousels = () => {
  return (
    <>
      <TECarousel interval={500} showControls showIndicators ride="carousel">
        {/* Carousel wrapper */}
        <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
          {images.map((image, index) => (
            <TECarouselItem
              key={index + 1}
              itemID={index + 1}
              className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
            >
              {/* Make image clickable with a link */}
              <Link to={image.link}>
                <img
                  src={image.img}
                  className="block w-full h-auto max-h-[500px] object-cover"
                  alt={`Slide ${index + 1}`}
                />
              </Link>
            </TECarouselItem>
          ))}
        </div>
      </TECarousel>
    </>
  );
};

export default HomeCarousels;
