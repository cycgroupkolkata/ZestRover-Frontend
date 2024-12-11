// Install the necessary library first: npm install react-shimmer

import React from "react";
import { Shimmer } from "react-shimmer";

const HotelDetailsShimmer = () => {
  return (
    <div className="p-4 space-y-6">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          {/* Large Image */}
          <Shimmer width="100%" height={200} />
        </div>
        <div className="flex flex-col gap-4 flex-1">
          {/* Small Images */}
          <Shimmer width="100%" height={90} />
          <Shimmer width="100%" height={90} />
        </div>
      </div>

      {/* Most Popular Facilities */}
      <div>
        <div className="mb-4">
          <Shimmer width="50%" height={20} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {Array(8)
            .fill()
            .map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-10">
                <Shimmer width="100%" height={40} />
              </div>
            ))}
        </div>
      </div>

      {/* Nearby Attractions */}
      <div>
        <div className="mb-4">
          <Shimmer width="50%" height={20} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {Array(8)
            .fill()
            .map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-10">
                <Shimmer width="100%" height={40} />
              </div>
            ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-gray-200 p-4 rounded-lg">
        <div className="mb-4">
          <Shimmer width="75%" height={20} />
          <Shimmer width="60%" height={20} className="mt-2" />
          <Shimmer width="40%" height={20} className="mt-2" />
        </div>
        <div className="mt-4">
          <div className="bg-blue-200 rounded-lg h-10 w-32">
            <Shimmer width="100%" height={40} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsShimmer;
