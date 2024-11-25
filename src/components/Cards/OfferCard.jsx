import React from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";


const OfferCard = ({img,title,nights,price,slug="/offers",isOffer=false,onClick}) => {
  return (
    <div
    onClick={onClick}
      className="w-64 md:w-1/3 bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0 mb-2 shadow-black/10 shadow-md"
    >
      <img
        src={img}
        alt={title}
        className="cursor-pointer w-full h-40 object-cover transition-all duration-1000 hover:delay-100 hover:scale-110"
      />
      <div className="p-4">
        <h2 className="font-bold">{title}</h2>
        <Link onClick={isOffer?(e)=>e.preventDefault():null} to={slug} className="flex items-center text-blue-600">
          <FaLongArrowAltRight/>
          <span>{nights}</span>
        </Link>
        <div className="text-xl font-bold text-blue-600 mt-2">
          {price}
        </div>
        <div className="text-gray-600">Per Person</div>
      </div>
    </div>
  );
};

export default OfferCard;
