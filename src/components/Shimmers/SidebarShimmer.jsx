import React from "react";
import { Shimmer } from "react-shimmer";

const SidebarShimmer = (
  { isSidebarOpen }
) => {
  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-gray-100 p-4 shadow-lg z-50 lg:z-0 lg:static lg:w-1/4 overflow-y-auto ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Close Button Placeholder */}
      <div className="mb-4 lg:hidden">
        <Shimmer width={24} height={24} />
      </div>

      {/* Search Section Shimmer */}
      <div className="mb-4">
        <Shimmer width="70%" height={20} />
        <Shimmer width="100%" height={40} className="mt-2" />
      </div>

      {/* Deals Section Shimmer */}
      <div className="mb-4">
        <Shimmer width="50%" height={20} />
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center mt-2">
            <Shimmer width={16} height={16} className="mr-2" />
            <Shimmer width="80%" height={16} />
          </div>
        ))}
      </div>

      {/* Popular Filters Section Shimmer */}
      <div className="mb-4">
        <Shimmer width="50%" height={20} />
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex items-center mt-2">
            <Shimmer width={16} height={16} className="mr-2" />
            <Shimmer width="80%" height={16} />
          </div>
        ))}
      </div>

      {/* Price Range Shimmer */}
      <div className="mb-4">
        <Shimmer width="50%" height={20} />
        <Shimmer width="100%" height={20} className="mt-2" />
      </div>

      {/* Amenities Section Shimmer */}
      <div className="mb-4">
        <Shimmer width="50%" height={20} />
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex items-center mt-2">
            <Shimmer width={16} height={16} className="mr-2" />
            <Shimmer width="80%" height={16} />
          </div>
        ))}
      </div>

      {/* Property Type Section Shimmer */}
      <div className="mb-4">
        <Shimmer width="50%" height={20} />
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center mt-2">
            <Shimmer width={16} height={16} className="mr-2" />
            <Shimmer width="80%" height={16} />
          </div>
        ))}
        <Shimmer width="40%" height={20} className="mt-2" />
      </div>
    </aside>
  );
};

export default SidebarShimmer;
