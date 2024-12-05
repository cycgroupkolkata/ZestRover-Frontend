import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Add Tailwind and FontAwesome through CSS or include them in your public/index.html
import { Link, useNavigate } from "react-router-dom";
import { PiStarThin } from "react-icons/pi";

function ToursCard({ tour }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/package/${tour.slug}`)}
      className="hotel-card border rounded-lg shadow-lg overflow-hidden transition-transform duration-300 cursor-pointer"
    >
      <div className="relative">
        <img
          src={`${import.meta.env.VITE_IMAGE_URL}${tour.images[0]}`}
          alt={`Image of ${tour.title}`}
          className="hotel-image w-full transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold">
          {tour.title.split(" ").map((word, index) => (
            <span key={index} className="relative inline-block">
              {word}
              <span className="underline absolute left-0 bottom-0 h-1 bg-blue-600 transition-all duration-300"></span>
            </span>
          ))}
        </h3>
        {/* <p className="text-gray-500">{hotel.location}</p> */}
        <div className="flex items-center mt-2">
          <PiStarThin />
          <span className="text-blue-600 font-bold">{4.7}</span>
          <span className="text-gray-500 ml-2">{`4000+`} reviews</span>
        </div>
        <p className="mt-2 text-gray-700 font-bold">
          ₹{tour.price} /Onwards Person
        </p>
        <Link className="my-2" to={`/package/${tour.slug}`}>Read More</Link>
      </div>
    </div>
  );
}

export default ToursCard;
