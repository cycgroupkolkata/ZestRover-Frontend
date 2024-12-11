import React, { useEffect, useRef, useState } from "react";
import {
  FlightCard,
  FlightSearchCard,
  FlightsMainShimmer,
  SidebarShimmer,
} from "../components";
import { FaFilter } from "react-icons/fa6";
import { MdSort } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TopLoadingBar from "react-top-loading-bar";
import { flightSearchService } from "../services/FlightSearchService";

const FlightSearch = () => {
  const [sortByPrice, setSortByPrice] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const loadingBarRef = useRef(null);
  const [enabled, setEnabled] = useState(true);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [showMinPrice, setShowMinPrice] = useState(0);
  const [showMaxPrice, setShowMaxPrice] = useState(0);
  const location = useLocation();
  const param = new URLSearchParams(location.search);
  const classType = param.get("class");
  const noOfBags = param.get("noBags");
  const depDate = param.get("depDate");
  const retDate = param.get("retDate");
  const adult = param.get("adult");
  const child = param.get("child");
  const infants = param.get("infants");
  const isReturn = param.get("return");

  const [totalFlights, setTotalFlights] = useState(0);
  const [flightsData, setFLightData] = useState([]);
  const [originalFlights, setOriginalFLigts] = useState([]);
  const [signData, setSignData] = useState({});
  const [initialData, setIntialData] = useState({});
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const { from, to } = location.state || {};

  {
    /* Filter Datas */
  }
  const [nonStop, setNonStop] = useState(true);
  const [oneStop, setOneStop] = useState(false);
  const [twoStops, setTwoStops] = useState(false);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [isRefundable, setIsRefundable] = useState(true);

  const handleToggle = () => {
    setIsRefundable((prev) => !prev);
  };
  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;

    setSelectedAirlines((prevSelectedAirlines) => {
      if (checked) {
        return [...prevSelectedAirlines, id];
      } else {
        return prevSelectedAirlines.filter((code) => code !== id);
      }
    });
  };

  const flightSearching = async () => {
    setIsLoading(true)
    setLoadingProgress(10);
    setFLightData([]);
    loadingBarRef.current?.continuousStart();
    const signatureData = await flightSearchService.generateSignature();
    setSignData(signatureData);
    setLoadingProgress(30);
    const initializeData = await flightSearchService.initializeSearch({
      adl: adult,
      child: child,
      infants: infants,
      // cabin: classType===1?'E':classType===2?"PE":classType==3?"B":"F",
      clientId: signatureData.ClientID,
      fromCode: from.Code,
      toCode: to.Code,
      depDate: depDate,
      retDate: retDate,
      jwttoken: signatureData.Token,
      airlines: selectedAirlines.join(","),
      refundable: isRefundable,
      isDirect: nonStop
    });
    setIntialData(initializeData);

    setLoadingProgress(50);

    const flightData = await flightSearchService.searchFlights({
      clientId: signatureData.ClientID,
      tui: initializeData.TUI,
      jwtToken: signatureData.Token,
    });


    const trips = flightData.Trips;

    const journey = trips[0].Journey;
    setOriginalFLigts(journey);
    const fares = journey.map((item) => item.GrossFare);
    setShowMinPrice(Math.min(...fares));
    setShowMaxPrice(Math.max(...fares));
    setMinPrice(Math.min(...fares));
    setMaxPrice(Math.max(...fares));
    setFLightData(journey);
    setLoadingProgress(100);
    loadingBarRef.current?.complete();
    setIsLoading(false);
  };

  useEffect(() => {
    flightSearching();
  }, [
    from,
    to,
    classType,
    noOfBags,
    depDate,
    retDate,
    adult,
    child,
    infants,
    isReturn,
    isRefundable,
    selectedAirlines,
    nonStop,
  ]);

  {
    /* For Filter UseEffect */
  }
  useEffect(() => {
    // if (originalFlights.length > 0) {
    //   const filtered = originalFlights
    //     .filter((flight) => {
    //       const fare = flight.NetFare || flight.GrossFare; // Assuming fare is either 'NetFare' or 'GrossFare'
    //       return fare >= minPrice && fare <= maxPrice;
    //     })
    //     .sort((a, b) => {
    //       const fareA = a.NetFare || a.GrossFare;
    //       const fareB = b.NetFare || b.GrossFare;
    //       return fareA - fareB; // Sorting by price (ascending order)
    //     });

    //   setFLightData(filtered);
    // }
    if (originalFlights.length > 0) {
      const filtered = originalFlights
        .filter((flight) => {
          // Get fare information
          const fare = flight.NetFare || flight.GrossFare;
  
          // Filter by price
          const priceCondition = fare >= minPrice && fare <= maxPrice;
  
          // Filter by stops
          const stopsCondition =
            (flight.Stops === 0 && nonStop) || // Non-stop
            (flight.Stops === 1 && oneStop) || // One-stop
            (flight.Stops === 2 && twoStops);  // Two-stops
  
          return priceCondition && stopsCondition;
        })
        .sort((a, b) => {
          // Sorting by price (ascending order)
          const fareA = a.NetFare || a.GrossFare;
          const fareB = b.NetFare || b.GrossFare;
          return fareA - fareB;
        });
  
      setFLightData(filtered);
      setTotalFlights(filtered.length)
    }
  }, [minPrice, maxPrice,oneStop,twoStops,originalFlights]);

  useEffect(() => {
    if (sortByPrice) {
      const sortedAscending = flightsData.sort(
        (a, b) => a.GrossFare - b.GrossFare
      );
      setFLightData(sortedAscending);
    } else {
      const sortedDescending = flightsData.sort(
        (a, b) => b.GrossFare - a.GrossFare
      );
      setFLightData(sortedDescending);
    }
  }, [sortByPrice]);

  return (
    <>
      <TopLoadingBar
        waitingTime={1000}
        ref={loadingBarRef}
        progress={loadingProgress}
        height={3}
        color="#00008B"
        onLoaderFinished={() => setLoadingProgress(0)}
      />
      <div className="flex flex-col items-center">
        {/* <div className="bg-gradient-to-b from-[#def4ff] to-[#bde9ff] w-full flex justify-center"> */}
        <div className="bg-gradient-to-b from-sky-300 to-sky-700 w-full flex justify-center">
          <FlightSearchCard
            selCls={classType - 1}
            selBag={noOfBags - 1}
            from={from}
            to={to}
            adl={adult}
            child={child}
            inf={infants}
            retDate={retDate}
            depDate={depDate}
          />
        </div>

        <div className="flex flex-col lg:flex-row p-4 bg-gray-100 w-screen px-0 lg:px-10 min-h-screen">
          {isLoading ? (
            <>
              <SidebarShimmer isSidebarOpen={isSidebarOpen} />
              <FlightsMainShimmer />
            </>
          ) : (
            <>
              <aside
                className={`fixed inset-0 bg-white shadow-md p-4 z-50 lg:z-0 transform ${
                  isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform lg:relative lg:translate-x-0 lg:w-1/4 lg:mb-0`}
              >
                <button className="hidden bg-gray-200 px-4 py-2 rounded-md outline-none focus:outline-none hover:bg-blue-600 hover:text-white transition-all duration-200 hover:delay-100 flex flex-row items-center mb-2">
                  Filter
                  <FaFilter className="ml-1" />
                </button>
                <button
                  className="lg:hidden bg-gray-200 px-4 py-2 rounded-full mb-4"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <IoClose />
                </button>
                {/* <div className="mb-4">
                  <h2 className="font-bold mb-2">Stops</h2>
                  <div>
                    <input type="checkbox" id="nonstop" />
                    <label htmlFor="nonstop" className="ml-2">
                      Non Stop
                    </label>
                  </div>
                  <div>
                    <input type="checkbox" id="1stop" />
                    <label htmlFor="1stop" className="ml-2">
                      1 Stop
                    </label>
                  </div>
                  <div>
                    <input type="checkbox" id="2stops" />
                    <label htmlFor="2stops" className="ml-2">
                      2+ Stops
                    </label>
                  </div>
                </div> */}
                <div className="mb-4">
                  <h2 className="font-bold mb-2">Stops</h2>
                  <div className="flex flex-wrap gap-1">
                    <div className="flex items-center rounded-full">
                      <input
                        type="checkbox"
                        id="nonstop"
                        checked={nonStop}
                        onChange={() => setNonStop(!nonStop)}
                        className="peer hidden"
                      />
                      <label
                        htmlFor="nonstop"
                        className={`px-4 py-2  border border-gray-300 rounded-md cursor-pointer 
                      ${
                        nonStop
                          ? "bg-blue-500 text-white"
                          : "bg-white text-black"
                      } 
                      transition-all`}
                      >
                        Non Stop
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="1stop"
                        checked={oneStop}
                        onChange={() => {
                          setOneStop(!oneStop)
                          if(nonStop && !oneStop){
                            setNonStop(false)
                          }
                        }}
                        className="peer hidden"
                      />
                      <label
                        htmlFor="1stop"
                        className={`px-4 py-2 border border-gray-300 rounded-sm cursor-pointer 
                      ${
                        oneStop
                          ? "bg-blue-500 text-white"
                          : "bg-white text-black"
                      } 
                      transition-all`}
                      >
                        1 Stop
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="2stops"
                        checked={twoStops}
                        onChange={() => setTwoStops(!twoStops)}
                        className="peer hidden"
                      />
                      <label
                        htmlFor="2stops"
                        className={`px-4 py-2 border border-gray-300 rounded-sm cursor-pointer 
                      ${
                        twoStops
                          ? "bg-blue-500 text-white"
                          : "bg-white text-black"
                      } 
                      transition-all`}
                      >
                        2+ Stops
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-4 font-sans">
                  <h2 className="font-bold mb-1">Fare Type</h2>
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      id="refundable"
                      checked={isRefundable}
                      onChange={handleToggle}
                      className="h-5 w-5 text-teal-500 border-gray-300 rounded focus:ring-teal-500"
                    />
                    <label htmlFor="refundable" className="font-medium text-lg">
                      Refundable
                    </label>
                  </div>
                </div>

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
                    min={showMinPrice}
                    max={showMaxPrice}
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
                <div className="mb-4">
                  <h2 className="font-bold mb-2">Airlines</h2>
                  <div>
                    <input
                      type="checkbox"
                      id="AI"
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="AI" className="ml-2">
                      Air India
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="6E"
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="6E" className="ml-2">
                      Indigo
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="9W"
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="9W" className="ml-2">
                      Jet Airways
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="UK"
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="UK" className="ml-2">
                      Vistara
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="G8"
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="G8" className="ml-2">
                      GoAir
                    </label>
                  </div>
                </div>
              </aside>
              <main className="w-full lg:w-3/4 p-4">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-xl font-bold">{totalFlights>0?`${totalFlights} Flights`:"Flight Not Found"}</h1>
                  <div className="flex space-x-2">
                    <button
                      className="bg-gray-200 px-4 py-2 rounded-md outline-none focus:outline-none hover:bg-blue-600 hover:text-white transition-all duration-200 hover:delay-100 flex flex-row items-center"
                      onClick={() => setIsSidebarOpen(true)}
                    >
                      <FaFilter className="ml-1" />
                    </button>
                    <button
                      onClick={() => setSortByPrice((prev) => !prev)}
                      className="bg-gray-200 px-4 py-2 rounded-md outline-none focus:outline-none hover:bg-blue-600 hover:text-white transition-all duration-200 hover:delay-100 flex flex-row items-center"
                    >
                      Sort
                      <MdSort className="ml-1" />
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  {flightsData.map((flight, index) => (
                    <FlightCard
                      onclick={() => {
                        navigate("/flight-booking", {
                          state: {
                            signData,
                            initialData,
                            flight,
                          },
                        });
                      }}
                      key={index}
                      index={index}
                      flight={flight}
                    />
                  ))}
                </div>
              </main>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FlightSearch;
