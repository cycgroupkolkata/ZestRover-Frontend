import React from "react";
import { Shimmer } from "react-shimmer";

const FlightsMainShimmer = () => {
  return (
    <main className="w-full lg:w-3/4 p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        {/* Flights Count Shimmer */}
        <Shimmer
          width="30%"
          height={24}
          shimmerColors={{
            base: "#f0f0f0",
            highlight: "#e0e0e0",
          }}
        />
        {/* Filter & Sort Buttons Shimmer */}
        <div className="flex space-x-2">
          <Shimmer
            width={100}
            height={40}
            shimmerColors={{
              base: "#f0f0f0",
              highlight: "#e0e0e0",
            }}
          />
          <Shimmer
            width={100}
            height={40}
            shimmerColors={{
              base: "#f0f0f0",
              highlight: "#e0e0e0",
            }}
          />
        </div>
      </div>

      {/* Flight Cards Section */}
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-md p-4 shadow-sm"
          >
            {/* Airline Name & Price Shimmer */}
            <div className="flex justify-between items-center mb-4">
              <Shimmer
                width="40%"
                height={20}
                shimmerColors={{
                  base: "#f0f0f0",
                  highlight: "#e0e0e0",
                }}
              />
              <Shimmer
                width="20%"
                height={20}
                shimmerColors={{
                  base: "#f0f0f0",
                  highlight: "#e0e0e0",
                }}
              />
            </div>
            {/* Flight Details Shimmer */}
            <div className="grid grid-cols-2 gap-4">
              <Shimmer
                width="80%"
                height={16}
                shimmerColors={{
                  base: "#f0f0f0",
                  highlight: "#e0e0e0",
                }}
              />
              <Shimmer
                width="80%"
                height={16}
                shimmerColors={{
                  base: "#f0f0f0",
                  highlight: "#e0e0e0",
                }}
              />
            </div>
            {/* Flight Duration Shimmer */}
            <div className="mt-4">
              <Shimmer
                width="60%"
                height={16}
                shimmerColors={{
                  base: "#f0f0f0",
                  highlight: "#e0e0e0",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default FlightsMainShimmer;
