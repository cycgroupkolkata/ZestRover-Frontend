import React, { useEffect, useRef, useState } from "react";
import { HotelCard, HotelContentShimmer, HotelSearchCard } from "../components";
import { IoFilter } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import Slider from "rc-slider";
import TopLoadingBar from "react-top-loading-bar";
import { useLocation } from "react-router-dom";
import { setMinutes } from "date-fns";
import SidebarShimmer from "../components/Shimmers/SidebarShimmer";
import { hotelService } from "../services/HotelService";

const HotelSearch = () => {
  const [isLoading, setIsLoading] = useState(true);
  const loadingBarRef = useRef();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [pageNo, setPageNo] = useState(0);
  const PriceRangeSlider = () => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(500);

    const handleSliderChange = (e) => {
      const [min, max] = e.target.value.split(",").map(Number);
      setMinPrice(min);
      setMaxPrice(max);
    };

    return (
      <div className="mb-4">
        <h2 className="font-bold">Price</h2>
        <p className="mb-2">
          ₹{minPrice}-₹{maxPrice}
        </p>
        {/* <input
        type="range"
        min={price[0]}
        max={price[1]}
        className="w-full"
      /> */}

        <Slider
          range={true}
          min={1000}
          max={10000}
          onChange={(value) => {
            setMinPrice(value[0]);
            setMaxPrice(value[1]);
          }}
          trackStyle={[{ backgroundColor: "#1D4ED8" }]} // Blue 600 for the track
          handleStyle={[
            { borderColor: "#1D4ED8", backgroundColor: "#1D4ED8" }, // Blue 600 for the handle
            { borderColor: "#1D4ED8", backgroundColor: "#1D4ED8" }, // Blue 600 for second handle (range)
          ]}
          railStyle={{ backgroundColor: "#E0F2FE" }}
        />
        <div className="flex justify-between text-sm">
          <span>₹{minPrice}</span>
          <span>₹{maxPrice}</span>
        </div>
      </div>
    );
  };

  // Api Response Releted Data store - Start
  const [hotels, setHotels] = useState([]);
  const [searchResult, setSearchResult] = useState({});
  const [fareData,setFareData]=useState({})
  // Api Response Releted Data store - End

  const location = useLocation();
  const [path, setPath] = useState(location.pathname);
  const params = new URLSearchParams(location.search);
  const { date, selLocation } = location.state;
  const adults = params.get("adults");
  const children = params.get("child");
  const rooms = params.get("rooms");
  const [signatureData, setSignatureData] = useState(null);

  const Sidebar = ({ isOpen, toggleSidebar }) => {
    const [showAllProp, setShowAllProp] = useState(false);
    const allPropType = [
      "Hotel",
      "Apartment",
      "Homestay",
      "Villa",
      "Hostel",
      "Farm House",
      "Guest House",
      "Resort",
      "Cottage",
      "Motel",
    ];
    const handleShowProp = () => {
      setShowAllProp((prev) => !prev);
    };
    return isLoading ? (
      <SidebarShimmer />
    ) : (
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white p-4 shadow-lg z-50 lg:z-0 lg:static lg:w-1/4 transition-transform duration-700 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 overflow-y-auto`}
        style={{ scrollbarWidth: "none" }} // Optional to hide the scrollbar
      >
        <button className="lg:hidden mb-4" onClick={toggleSidebar}>
          <IoClose />
        </button>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Search by property name</h2>
          <input
            type="text"
            placeholder="e.g. Hilton"
            className="w-full p-2 border rounded mt-2"
          />
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Deals</h2>
          {[
            "Free cancellation",
            "Free Breakfast",
            "Discounted Rates",
            "Complimentary Wi-Fi",
            "Room Upgrade",
          ].map((data, index) => {
            return (
              <div key={index} className="mt-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>{data}</span>
                </label>
              </div>
            );
          })}
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Popular Filters</h2>
          <div className="mt-2">
            {["5 stars", "4 stars", "3 stars", "2 Star"].map(
              (filter, index) => (
                <label className="flex items-center mt-2" key={index}>
                  <input type="checkbox" className="mr-2" />
                  <span>{filter}</span>
                </label>
              )
            )}
          </div>
        </div>
        <PriceRangeSlider />
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Amenities</h2>
          <div className="mt-2">
            {["Free WiFi", "Pool", "Spa", "Parking"].map((amenity, index) => (
              <label className="flex items-center mt-2" key={index}>
                <input type="checkbox" className="mr-2" />
                <span>{amenity}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Property Type</h2>
          <div className="mt-2">
            {allPropType
              .slice(0, showAllProp ? allPropType.length : 5)
              .map((filter, index) => (
                <label className="flex items-center mt-2" key={index}>
                  <input type="checkbox" className="mr-2" />
                  <span>{filter}</span>
                </label>
              ))}
            <button
              onClick={handleShowProp}
              className="px-2 focus:outline-none mt-2 text-blue-500"
            >
              {showAllProp ? "Show Less -" : "Show All +"}
            </button>
          </div>
        </div>
      </aside>
    );
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const properties = [
    {
      image:
        "https://cdn.pixabay.com/photo/2021/12/11/07/59/hotel-6862159_640.jpg",
      title: "Hotel Luxury Retreat",
      location: "Paris",
      rating: "8.3",
      reviews: "1,200",
      price: "10,000", // USD 120 converted to INR
      badge: "FREE BREAKFAST",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2023/03/29/10/27/hotel-7885138_640.jpg",
      title: "Seaside Hotel Escape",
      location: "Maldives",
      rating: "9.1",
      reviews: "800",
      price: "20,750", // USD 250 converted to INR
      badge: "POOL ACCESS",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2015/09/07/19/12/hotel-928937_640.jpg",
      title: "Mountain View Resort",
      location: "Switzerland",
      rating: "9.0",
      reviews: "450",
      price: "24,900", // USD 300 converted to INR
      badge: "FREE WI-FI",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2015/11/02/06/46/hotel-1018039_640.jpg",
      title: "City Center Hotel",
      location: "New York",
      rating: "8.7",
      reviews: "1,000",
      price: "14,940", // USD 180 converted to INR
      badge: "24/7 ROOM SERVICE",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2015/08/19/20/15/hotel-896569_640.jpg",
      title: "Beachfront Boutique Hotel",
      location: "Hawaii",
      rating: "9.3",
      reviews: "600",
      price: "18,300", // USD 220 converted to INR
      badge: "OCEAN VIEW",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2016/03/10/21/46/hotel-1249348_640.jpg",
      title: "Eco-Friendly Resort",
      location: "Costa Rica",
      rating: "9.2",
      reviews: "750",
      price: "12,450", // USD 150 converted to INR
      badge: "SUSTAINABLE STAY",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2012/06/23/02/03/singapore-50547_640.jpg",
      title: "Singapore Skyline Hotel",
      location: "Singapore",
      rating: "9.5",
      reviews: "1,500",
      price: "29,050", // USD 350 converted to INR
      badge: "CITY VIEWS",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2012/08/28/23/17/victoria-55240_640.jpg",
      title: "The Empress Victoria",
      location: "Canada",
      rating: "9.0",
      reviews: "980",
      price: "14,940", // USD 180 converted to INR
      badge: "FAMILY-FRIENDLY",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2021/12/11/07/59/hotel-6862159_640.jpg",
      title: "Historic Downtown Hotel",
      location: "Rome",
      rating: "8.8",
      reviews: "600",
      price: "10,000", // USD 120 converted to INR
      badge: "CENTRAL LOCATION",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2023/03/29/10/27/hotel-7885138_640.jpg",
      title: "Modern Urban Hotel",
      location: "Tokyo",
      rating: "9.1",
      reviews: "1,200",
      price: "23,240", // USD 280 converted to INR
      badge: "SMART TECHNOLOGY",
    },
  ];

  const searchHotels = async () => {
    setIsLoading(true);
    setLoadingProgress(20);
    try {
      const signature = await hotelService.generateSignature();
      setSignatureData(signature);
      setLoadingProgress(50);
      const init = await hotelService.initHotels({
        location: selLocation,
        dates: date,
        adults: adults,
        children: children,
        rooms: rooms,
        jwtToken: signature.Token,
      });

      const searchData = await hotelService.hotelContent({
        searchId: init.searchId,
        authToken: signature.Token,
        limit: 100,
        offset: pageNo === 0 ? -1 : pageNo * 30,
      });

      const fareData = await hotelService.hotelRate({
        searchId: searchData.searchId,
        authToken: signature.Token,
      });


      setFareData(fareData)
      setSearchResult(searchData);
      setHotels(searchData.hotels);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setLoadingProgress(100);
    }
  };

  useEffect(() => {
    loadingBarRef.current.continuousStart();
    searchHotels();
    loadingBarRef.current.complete();
  }, [selLocation, date, adults, children, rooms, pageNo]);

  return (
    <div className="bg-black/5">
      <TopLoadingBar
        ref={loadingBarRef}
        progress={loadingProgress}
        height={5}
        onLoaderFinished={() => setLoadingProgress(0)}
        color="#00008B"
      />
      <div className="px-16 py-12 bg-gradient-to-b from-blue-800 via-blue-900 to-blue-950">
        <HotelSearchCard
          adl={adults}
          child={children}
          rm={rooms}
          dates={date}
          loc={selLocation}
        />
      </div>
      <div className="container mx-auto p-4 ">
        <div className="flex flex-col lg:flex-row">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          {isLoading ? (
            <HotelContentShimmer />
          ) : (
            <main className="w-full lg:w-3/4 p-4">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">
                  {searchResult?.total} Results in {searchResult?.locationName}
                </h1>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded lg:hidden"
                  onClick={toggleSidebar}
                >
                  <IoFilter />
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hidden lg:block">
                  Top picks for your search
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {hotels.map((hotel, index) => {
                  return (
                    <HotelCard
                      key={index}
                      hotel={hotel}
                      rate={fareData}
                      searchData={searchResult}
                      signatureData={signatureData}
                    />
                  );
                })}
              </div>
            </main>
          )}
        </div>
      </div>
      <div class="flex flex-col items-center">
        <span class="text-sm text-blue-700 dark:text-gray-400">
          ({pageNo + 1} of {Math.floor(searchResult?.total / 30)})
        </span>
        <div class="inline-flex mt-2 xs:mt-0 space-x-2 my-5">
          <button
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
              setPageNo((prev) => prev - 1);
            }}
            disabled={pageNo === 0}
            class="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-blue-600 focus:outline-none dark:hover:text-white"
          >
            <svg
              class="w-3.5 h-3.5 me-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 5H1m0 0 4 4M1 5l4-4"
              />
            </svg>
            Prev
          </button>
          <button
            disabled={pageNo >= Math.floor(searchResult?.total / 100) - 1}
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
              setPageNo((prev) => prev + 1);
            }}
            class="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-blue-600 focus:outline-none rounded-s dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
            <svg
              class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelSearch;
