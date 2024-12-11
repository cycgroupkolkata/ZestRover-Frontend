import { StarIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { IoLocation } from "react-icons/io5";

const HotelCard = ({
  searchData,
  hotel,
  signatureData,
  location,
  rate = {},
}) => {
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const [hotelRate, setHotelRate] = useState({});
  // const rate=

  useEffect(() => {
    if (Array.isArray(rate.hotels) && hotel.id) {
      const matchedHotel = rate.hotels.find((h) => h.id === hotel.id);
      setPrice(matchedHotel?.rate.total+(matchedHotel?.rate.total*15/100)+matchedHotel?.rate.taxes);
      setHotelRate(matchedHotel);
    }
  }, [hotel.id, rate.hotels]);

  const handleClick = () => {
    navigate("/hotel-details", {
      state: {
        hotel: hotel,
        searchData: searchData,
        signatureData: signatureData,
        hotelRate: hotelRate,
      },
    });
  };
  return price > 0 ? (
    <div
      onClick={handleClick}
      className="cursor-pointer border rounded-lg overflow-hidden shadow-lg"
    >
      <div className="relative">
        <img
          src={hotel.heroImage}
          alt={hotel.name}
          className="w-full h-48 object-cover transition-all duration-500 hover:scale-110 hover:delay-200 "
        />

        {hotelRate.freeBreakfast ? (
          <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Breakfast
          </span>
        ) : (
          <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
            {hotel.starRating >= 3.5 ? "Very Good" : "Best Choice"}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{hotel.name}</h3>
        <p className="text-sm text-gray-600">{location}</p>
        <div className="flex items-center mt-2">
          <FaStar size={20} color="#FFC30B" />
          <span className="ml-1 text-sm font-semibold">
            {hotel.userReview.rating}
          </span>
          <span className="ml-1 text-sm text-gray-600">
            ({hotel.userReview.count} reviews)
          </span>
        </div>
        <div className="flex items-center space-x-4 p-1">
          <div className="text-blue-500">
            <IoLocation size={32} />
          </div>
          <p className="text-gray-700 text-sm font-medium">{hotel.address}</p>
        </div>

        <p className="mt-2 text-blue-600 font-semibold">
          {price > 0 && `Starting From ₹${price.toFixed(2)}`}
        </p>
      </div>
    </div>
  ) : null;
};

export default HotelCard;
