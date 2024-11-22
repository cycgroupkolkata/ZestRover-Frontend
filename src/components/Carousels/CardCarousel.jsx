import React, { useRef, useState, useEffect } from "react";
import DestinationCard from "../Cards/DestinationCard";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { topDestinations } from "../../assets/imges/images";
import CardCarouselShimmer from "../Shimmers/CardCarouselShimmer";


// const destinations = [
//   { name: "New York", size: "451X600" },
//   { name: "London", size: "451X600" },
//   { name: "Barcelona", size: "451X600" },
//   { name: "Sydney", size: "451X600" },
//   { name: "Rome", size: "428X600" },
//   { name: "Paris", size: "451X600" },
//   { name: "Tokyo", size: "451X600" },
//   { name: "Dubai", size: "451X600" },
//   { name: "Berlin", size: "451X600" },
//   { name: "Moscow", size: "451X600" },{ name: "Barcelona", size: "451X600" },
//   { name: "Sydney", size: "451X600" },
//   { name: "Rome", size: "428X600" },
//   { name: "Paris", size: "451X600" },
//   { name: "Tokyo", size: "451X600" },
//   { name: "Dubai", size: "451X600" },
//   { name: "Berlin", size: "451X600" },
//   { name: "Moscow", size: "451X600" },{ name: "Barcelona", size: "451X600" },
//   { name: "Sydney", size: "451X600" },
//   { name: "Rome", size: "428X600" },
//   { name: "Paris", size: "451X600" },
//   { name: "Tokyo", size: "451X600" },
//   { name: "Dubai", size: "451X600" },
//   { name: "Berlin", size: "451X600" },
//   { name: "Moscow", size: "451X600" },{ name: "Barcelona", size: "451X600" },
//   { name: "Sydney", size: "451X600" },
//   { name: "Rome", size: "428X600" },
//   { name: "Paris", size: "451X600" },
//   { name: "Tokyo", size: "451X600" },
//   { name: "Dubai", size: "451X600" },
//   { name: "Berlin", size: "451X600" },
//   { name: "Moscow", size: "451X600" },
// ];

const CardCarousel = () => {
  const [leftButtonActive, setLeftButtonActive] = useState(false);
  const [rightButtonActive, setRightButtonActive] = useState(false);
  const scrollRef = useRef(null);
  const [isLoading,setIsLoading]=useState(true)

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
  useEffect(()=>{
    setTimeout(() => {
        setIsLoading(false)
    }, 3000);
  })

  useEffect(() => {
    const interval = setInterval(() => {
      scrollRight();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return isLoading?(<CardCarouselShimmer/>):(
    <div className="p-8 bg-white">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Popular Destinations
          </h2>
          <p className="text-gray-500">
            These popular destinations have a lot to offer
          </p>
        </div>
        <a href="#" className="text-blue-600 hover:underline flex items-center">
          View All Destinations <i className="fas fa-arrow-right ml-2"></i>
        </a>
      </div>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 "
          style={{ scrollbarWidth: "none" }}
        >
          {topDestinations.map((destination, index) => (
            <DestinationCard
              key={index}
              name={destination.title}
              imageUrl={destination.img}
              size={destination.size}
            />
          ))}
        </div>
        <button
          onClick={scrollLeft}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full shadow p-2 focus:outline-none ${
            leftButtonActive ? "bg-blue-500" : "bg-white"
          }`}
        >
          <FaChevronLeft size={20}/>
        </button>
        <button
          onClick={scrollRight}
          className={`focus:outline-none absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full shadow p-2 ${
            rightButtonActive ? "bg-blue-500" : "bg-white"
          }`}
        >
          <FaChevronRight size={20}/>
        </button>
      </div>
    </div>
  )
};

export default CardCarousel;
