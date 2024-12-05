import React from 'react';

const TourPackageShimer = () => {
  return (
    <div className="w-full lg:w-2/3 bg-white p-4 lg:p-6 rounded-lg shadow-lg mb-4 lg:mb-0 relative overflow-hidden">
      {/* Shimmer Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>

      <div className="w-full bg-gray-300 rounded-lg mb-4 h-48">
        {/* Shimmer effect on image */}
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
        <div className="w-full lg:w-1/4 bg-gray-300 h-24 rounded-lg mb-2 lg:mb-0"></div>
        <div className="w-full lg:w-1/4 bg-gray-300 h-24 rounded-lg mb-2 lg:mb-0"></div>
        <div className="w-full lg:w-1/4 bg-gray-300 h-24 rounded-lg"></div>
      </div>

      <h2 className="text-2xl font-bold mb-2 bg-gray-300 h-6 rounded-md w-3/4"></h2>

      <p className="text-xl text-teal-600 font-semibold mb-2 bg-gray-300 h-6 rounded-md w-1/2"></p>

      <p className="text-gray-700 mb-4 bg-gray-300 h-12 rounded-md"></p>

      <h3 className="text-xl font-bold mb-2 bg-gray-300 h-6 rounded-md w-2/4"></h3>
    </div>
  );
};

export default TourPackageShimer;
