import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const ServiceCarousel = () => {
  const [leftButtonActive, setLeftButtonActive] = useState(false);
  const [rightButtonActive, setRightButtonActive] = useState(false);
  const scrollRef = useRef(null);

  const categories = [
    { id: 4, categoryName: "Domestic Packages" },
    { id: 1, categoryName: "Europe Expedition" },
    { id: 7, categoryName: "Hotel Booking" },
    { id: 3, categoryName: "International Packages" },
    { id: 2, categoryName: "MICE Tour" },
    { id: 6, categoryName: "Theme Based Tour" },
    { id: 5, categoryName: "Wedding Destination" },
  ];

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
    const interval = setInterval(() => {
      scrollRight();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 via-white to-blue-50">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
          <p className="text-gray-600">Explore a wide range of experiences.</p>
        </div>
        <Link
          to={"/service"}
          className="text-blue-600 hover:underline flex items-center font-medium"
        >
          View All <FaArrowRight className="ml-2" />
        </Link>
      </div>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-6 scrollbar-hide"
          style={{
            scrollbarWidth: 'none'
          }}
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/service/${category.categoryName}`}
              className="min-w-[200px] mb-2 bg-white p-6 rounded-xl shadow-lg transition transform hover:-translate-y-2 hover:shadow-xl hover:bg-blue-100"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {category.categoryName}
              </h3>
            </Link>
          ))}
        </div>
        <button
          onClick={scrollLeft}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full shadow-lg p-3 transition-transform ${
            leftButtonActive
              ? "bg-blue-600 scale-105"
              : "bg-white hover:bg-blue-50"
          }`}
        >
          <FaChevronLeft size={24} />
        </button>
        <button
          onClick={scrollRight}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full shadow-lg p-3 transition-transform ${
            rightButtonActive
              ? "bg-blue-600 scale-105"
              : "bg-white hover:bg-blue-50"
          }`}
        >
          <FaChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default ServiceCarousel;
