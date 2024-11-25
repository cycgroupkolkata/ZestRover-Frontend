import React from "react";
import { Link } from "react-router-dom";
import { adventure3 } from "../../assets/imges/images";

const Cta2 = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-800 lg:py-12 lg:flex lg:justify-center">
      <div className="overflow-hidden bg-white dark:bg-gray-900 lg:mx-8 lg:flex lg:max-w-6xl lg:w-full lg:shadow-md lg:rounded-xl">
        {/* Image Section */}
        <div className="lg:w-1/2">
          <div
            className="h-64 bg-contain bg-no-repeat lg:h-full"
            style={{
              backgroundImage:
                `url(${adventure3})`,
            }}
            role="img"
            aria-label="Adventure Image"
          ></div>
        </div>

        {/* Content Section */}
        <div className="max-w-xl px-6 py-12 lg:max-w-5xl lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            Your Next <span className="text-blue-500">Adventure</span> Awaits
            with <span className="text-blue-500">Zest Rover Holidays</span>
          </h2>

          <p className="mt-4 text-gray-500 dark:text-gray-300">
            Discover unforgettable journeys, thrilling adventures, and serene
            escapes. Whether you're booking flights, hotels, or complete travel
            packages, we've got you covered for every step of your journey.
            Start exploring the world with Zest Rover Holidays today.
          </p>

          <div className="inline-flex flex-wrap gap-4 mt-6">
            <Link
              to={'/contact'}
              className="inline-flex items-center justify-center w-full px-6 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-100 focus:ring focus:ring-blue-300 focus:ring-opacity-80 sm:w-auto"
            >
              Book a Tour
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta2;
