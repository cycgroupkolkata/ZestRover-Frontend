import React from "react";
import "tailwindcss/tailwind.css";

const ServicesShimmer = () => (
  <div className="container mx-auto p-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="flex-none w-56">
          <div className="bg-gray-300 h-80 shimmer"></div>
          <div className="h-4 bg-gray-300 shimmer mt-2 w-24 mx-auto"></div>
        </div>
      ))}
    </div>
  </div>
);

export default ServicesShimmer;
