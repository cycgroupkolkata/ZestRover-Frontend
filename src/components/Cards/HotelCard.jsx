import { StarIcon } from '@heroicons/react/16/solid';
import React from 'react';
import { FaStar } from "react-icons/fa6";

const HotelCard = ({ image, title, location, rating, reviews, price, badge }) => (
    <div className="cursor-pointer border rounded-lg overflow-hidden shadow-lg">
        <div className="relative">
            <img src={image} alt={title} className="w-full h-48 object-cover transition-all duration-500 hover:scale-110 hover:delay-200 " />
            {badge && (
                <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    {badge}
                </span>
            )}
        </div>
        <div className="p-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-gray-600">{location}</p>
            <div className="flex items-center mt-2">
                <FaStar size={20} color='#FFC30B'/>
                <span className="ml-1 text-sm font-semibold">{rating}</span>
                <span className="ml-1 text-sm text-gray-600">({reviews} reviews)</span>
            </div>
            <p className="mt-2 text-blue-600 font-semibold">Starting From ₹{price}</p>
        </div>
    </div>
);

export default HotelCard;
