import React from "react";
import { Shimmer } from "react-shimmer";

const HotelContentShimmer = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Title Placeholder */}
      <div className="mb-4">
        <Shimmer width="70%" height={24} />
      </div>

      {/* Paragraph Placeholder */}
      <div className="mb-4">
        {[...Array(3)].map((_, index) => (
          <Shimmer key={index} width="100%" height={16} className="mb-2" />
        ))}
      </div>

      {/* Image/Card Placeholder */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
          <Shimmer key={index} width="100%" height={150} />
        ))}
      </div>
    </div>
  );
};

export default HotelContentShimmer;
