import React, { useState } from "react";
import { HomeBg, HomeBg2, HomeBg3, HomeBg4 } from "./../assets/imges/bg-images/index";
import { CardCarousel, FlightSearchCard, HomeCarousels, HotelSearchCard, OffersCarousel } from "../components";
import { GiCommercialAirplane } from "react-icons/gi";
import { FaHotel } from "react-icons/fa";

const Home = () => {
  const [isFlight, setIsFlight] = useState(true);

  return (
    <div className="bg-slate-300 -mt-28">
      <div
        className="relative flex flex-col items-center justify-center bg-cover bg-bottom min-h-screen"
        style={{
          backgroundImage: `url(${HomeBg2})`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Hero Section */}
        <div className="text-center mt-20  sm:text-left p-8 sm:p-12 z-10 max-w-4xl mx-auto">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight shadow-lg drop-shadow-lg">
          Find Next Place To Visit
          </h1>
          <p className="text-white text-base sm:text-lg md:text-xl mt-4 sm:mt-6">
            Discover amazing places at exclusive deals
          </p>
        </div>

        {/* Main Content Wrapper */}
        <div className="text-center mx-4 sm:mx-10 md:-mt-5 bg-white/90 text-black p-8 sm:p-10 rounded-lg shadow-2xl z-30 relative max-w-3xl w-full mt-12">
          {/* Tabs for Flight and Hotel */}
          <div className="bg-white shadow-xl rounded-md px-8 py-4 flex items-center space-x-8 justify-center mb-8">
            <button
              onClick={() => setIsFlight(true)}
              className={`${
                isFlight ? "text-blue-600 border-blue-600" : "text-gray-600"
              } flex items-center space-x-2 py-2 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:bg-blue-100 outline-none focus:outline-none`}
            >
              <GiCommercialAirplane size={30} />
              <span className="font-medium">Flight</span>
            </button>
            <button
              onClick={() => setIsFlight(false)}
              className={`${
                !isFlight ? "text-blue-600 border border-blue-600" : "text-gray-600"
              } flex items-center space-x-2 py-2 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:bg-blue-100 focus:outline-none`}
            >
              <FaHotel size={30} />
              <span className="font-medium">Hotel</span>
            </button>
          </div>
          {/* Content for Flight Search Card or Coming Soon */}
          {isFlight ? (
            <FlightSearchCard />
          ) : (
            <h1 className="text-xl sm:text-2xl mt-6 text-gray-500">
              <HotelSearchCard/>
            </h1>
          )}
        </div>
      </div>
      <HomeCarousels/>
      <CardCarousel/>
      <OffersCarousel/>
    </div>
  );
};

export default Home;
