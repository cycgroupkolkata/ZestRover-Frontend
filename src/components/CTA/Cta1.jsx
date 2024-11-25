import { Link } from "react-router-dom";
import { cta1 } from "../../assets/imges/images";

const Cta1 = () => {
  return (
    <section className="relative max-w-screen-xl mx-auto py-4 px-4 md:px-8">
      <div className="absolute top-0 left-0 w-full h-full bg-white opacity-40"></div>
      <div className="relative z-10 gap-5 items-center lg:flex">
        <div className="flex-1 max-w-lg py-5 sm:mx-auto sm:text-center lg:max-w-max lg:text-left">
          <h3 className="text-3xl text-gray-800 font-semibold md:text-4xl">
            Book your flight and hotel at{" "}
            <span className="text-indigo-600">affordable prices</span>
          </h3>
          <p className="text-gray-500 leading-relaxed mt-3">
            Enjoy seamless booking for your flights and hotels with the best
            deals. Our platform offers great prices and easy options to plan
            your next trip.
          </p>
          <Link
            className="mt-5 px-4 py-2 text-indigo-600 font-medium bg-indigo-50 rounded-full inline-flex items-center"
            to={'/'}
          >
            Book Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 ml-1 duration-150"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
        <div className="flex-1 mt-5 mx-auto p-4 sm:w-9/12 lg:mt-0 lg:w-auto">
          <img
            // src="https://i.postimg.cc/kgd4WhyS/container.png"
            src={cta1}
            alt="Flight and hotel booking"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Cta1;
