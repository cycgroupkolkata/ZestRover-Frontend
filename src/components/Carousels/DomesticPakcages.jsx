import React, { useRef, useState, useEffect } from "react";
import DestinationCard from "../Cards/DestinationCard";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import CardCarouselShimmer from "../Shimmers/CardCarouselShimmer";
import { tourService } from "../../services/TourService";
import { Link, useNavigate } from "react-router-dom";

const DomesticPakcages = () => {
  const [leftButtonActive, setLeftButtonActive] = useState(false);
  const [rightButtonActive, setRightButtonActive] = useState(false);
  const scrollRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [destinitions, setDestinitions] = useState([]);

  const allDestinitions = async () => {
    try {
      setIsLoading(true);
      const data = await tourService.getAllToursByCategory("Domestic Packages");
      setDestinitions(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    allDestinitions();
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
      setLeftButtonActive(true);
      setTimeout(() => setLeftButtonActive(false), 300);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      if (
        scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
        scrollRef.current.scrollWidth
      ) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
      }
      setRightButtonActive(true);
      setTimeout(() => setRightButtonActive(false), 300);
    }
  };
  useEffect(() => {
    setTimeout(() => {}, 3000);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      scrollRight();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return isLoading ? (
    <CardCarouselShimmer />
  ) : (
    <div className="p-8 bg-white">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Explore Domestic Gems
          </h2>
          <p className="text-gray-500">
            Discover incredible destinations within your own country that have
            so much to offer.
          </p>
        </div>

        <Link to={"/service/Domestic Packages"} className="text-blue-600 hover:underline flex items-center">
          View All Destinations <i className="fas fa-arrow-right ml-2"></i>
        </Link>
      </div>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 "
          style={{ scrollbarWidth: "none" }}
        >
          {destinitions.map((destination, index) => (
            <DestinationCard
              key={index}
              name={destination.title}
              imageUrl={`${import.meta.env.VITE_IMAGE_URL}${
                destination.images[0]
              }`}
              size={destination.size}
              onclick={() => navigate(`/package/${destination.slug}`)}
            />
          ))}
        </div>
        <button
          onClick={scrollLeft}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full shadow p-2 focus:outline-none ${
            leftButtonActive ? "bg-blue-500" : "bg-white"
          }`}
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          onClick={scrollRight}
          className={`focus:outline-none absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full shadow p-2 ${
            rightButtonActive ? "bg-blue-500" : "bg-white"
          }`}
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default DomesticPakcages;
