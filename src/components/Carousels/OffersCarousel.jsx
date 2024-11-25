import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import OfferCard from "../Cards/OfferCard";
import { christ, himachal, kashmir2, ladakh } from "../../assets/imges/images";
import { offers } from "../../utils/offers";

const OffersCarousel = () => {
  useEffect(() => {
    startAutoScroll();
  }, []);

  const startAutoScroll = () => {
    const container = document.querySelector(".scroll-container");
    const scrollStep = container.clientWidth / 3; // Scroll by one card width
    const scrollInterval = 5000; // Scroll every 3 seconds

    const scroll = () => {
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth
      ) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += scrollStep;
      }
    };

    setInterval(scroll, scrollInterval);
  };

 

  return (
    <div className="px-4 py-1 md:px-8 md:py-2 bg-white">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Offers</h1>
          <p className="text-gray-600">
            Discover the Best Deals for Your Next Vacation!
          </p>
        </div>
        <Link to={'/offers'} className="text-blue-600">
          View All
        </Link>
      </div>
      <div className="scroll-container space-x-4 flex overflow-x-auto scroll-smooth" style={{scrollbarWidth: 'none'}}>
        {offers.map((offer, index) => (
          <OfferCard img={offer.img} title={offer.title} nights={offer.nights} price={offer.price}/>
        ))}
      </div>
    </div>
  );
};

export default OffersCarousel;
