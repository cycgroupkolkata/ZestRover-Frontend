import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import FlightDetails from "../components/Cards/FlightDetails";
import { flightSearchService } from "../services/FlightSearchService";
import { toast } from "react-toastify";
import { Shimmer } from "react-shimmer";
import Loading from "./Loading";
import TopLoadingBar from "react-top-loading-bar";

const FlightBookingPage = () => {
  const [adults, setAdults] = useState([{}]);
  const [children, setChildren] = useState([]);
  const [infants, setInfants] = useState([]);
  const [hasGST, setHasGST] = useState(false);
  const [gstNumber, setGstNumber] = useState("");
  const [isRefundable, setIsRefundable] = useState(null);
  const [rules, setRules] = useState([]);
  const [finalData, setFInalData] = useState({});
  const [ssr, setssr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const loadingBarRef = useRef(null);

  const [error, setError] = useState("");

  const handleCheckboxChange = () => {
    setHasGST(!hasGST);
    if (hasGST) {
      setGstNumber(""); // Clear GST number if unchecked
      setError(""); // Clear error message
    }
  };

  const handleGstNumberChange = (e) => {
    const value = e.target.value;
    setGstNumber(value);

    // Simple validation for GST number (length check, format can be adjusted)
    if (value && value.length !== 15) {
      setError("GST number must be 15 characters long.");
    } else {
      setError("");
    }
  };

  const addNewTraveller = (type) => {
    if (type === "adult") {
      if (adults.length >= finalData.ADT) {
        toast.error("Not allowed");
        return;
      } else {
        setAdults([...adults, {}]);
      }
    }
    if (type === "child") {
      if (children.length >= finalData.CHD) {
        toast.error("Not allowed");
        return;
      } else {
        setChildren([...children, {}]);
      }
    }
    if (type === "infant") {
      if (infants.length >= finalData.INF) {
        toast.error("Not allowed");
        return;
      } else {
        setInfants([...infants, {}]);
      }
    }
  };

  const location = useLocation();

  const { signData, initialData, flight } = location.state || {};

  const removeTraveller = (type, index) => {
    if (type === "adult") setAdults(adults.filter((_, i) => i !== index));
    if (type === "child") setChildren(children.filter((_, i) => i !== index));
    if (type === "infant") setInfants(infants.filter((_, i) => i !== index));
  };

  const restProcess = async () => {
    loadingBarRef.current?.continuousStart();
    setLoadingProgress(50);
    try {
      setIsLoading(true);
      const data = await flightSearchService.flightSmartPitcher({
        Amount: flight.NetFare,
        Index: flight.Index,
        tui: initialData.TUI,
        clientId: signData.ClientID,
        jwtToken: signData.Token,
      });
      setLoadingProgress(80);
      const getPricerData = await flightSearchService.flightGetsPricer({
        tui: data.TUI,
        clientId: signData.ClientID,
        jwtToken: signData.Token,
      });
      setRules(getPricerData.Rules && getPricerData.Rules[0].Rule);
      console.log(getPricerData);
      setFInalData(getPricerData);
      setssr(getPricerData.SSR);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingProgress(100);
      setIsLoading(false);
      loadingBarRef.current?.complete();
    }
  };

  useEffect(() => {
    restProcess();
  }, [signData, initialData]);

  return (
    <>
      <TopLoadingBar
        className=""
        ref={loadingBarRef}
        progress={loadingProgress}
        height={5}
        color="#0074c6"
        onLoaderFinished={() => setLoadingProgress(0)}
      />
      {isLoading ? (
        <div className="h-screen">
          <div className="mt-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl pb-5 bg-blue-200 rounded-xl flex justify-center items-center mx-auto z-50">
            <Loading />
          </div>
        </div>
      ) : (
        <>
          <div className="bg-blue-500/5">
            <div className="max-w-5xl mx-auto p-4">
              <div className="bg-white p-1 rounded shadow">
                <FlightDetails flight={flight} SSR={ssr} />
              </div>

              {/* {rules.length > 0 && (
                <div className="bg-white p-4 rounded shadow mt-4">
                  <h2 className="text-lg font-semibold mb-4">
                    Make your booking refundable
                  </h2>
                  <div className="bg-blue-100 p-4 rounded mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="nonRefundable"
                          name="refundGroup"
                          value="Refundable"
                          className="mr-2"
                          onChange={(e) => setIsRefundable(e.target.value)}
                        />
                        <span className="text-blue-600 font-semibold">
                          Refundable Booking
                        </span>
                      </div>
                      <span className="text-blue-600 font-semibold">
                        Amount ₹770
                      </span>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-blue-600 font-semibold mb-2">
                        Rules -{" "}
                      </h3>
                      {rules.map((item, index) => (
                        <div key={index} className="mb-4">
                          <h4 className="text-gray-800 font-medium">
                            {item.Head}
                          </h4>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {item.Info.map((info, idx) => (
                              <li key={idx}>
                                <span className="font-semibold">
                                  {info.Description}:{" "}
                                </span>
                                <span>
                                  Adult: {info.AdultAmount || "N/A"}, Child:{" "}
                                  {info.ChildAmount || "N/A"}, Infant:{" "}
                                  {info.InfantAmount || "N/A"}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">
                      Upgrade your booking and receive a 100% refund if you
                      cannot attend and can evidence one of the many reasons in
                      our{" "}
                      <a href="#" className="text-blue-600">
                        Terms and Conditions
                      </a>{" "}
                      when you select a Refundable Booking.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="nonRefundable"
                      name="refundGroup"
                      value="Non-Refundable"
                      className="mr-2"
                      onChange={(e) => setIsRefundable(e.target.value)}
                    />
                    <span className="text-gray-600 font-semibold">
                      Non Refundable Booking (All sales are final)
                    </span>
                  </div>
                </div>
              )} */}

              <div className="bg-[#d4e9ec] p-4 rounded shadow mt-4">
                <h2 className="text-lg font-semibold mb-4 text-[#01579B]">
                  Fare Summary
                </h2>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Fare</span>
                  <span className="text-[#2E7D32] font-semibold">
                    ₹ {finalData.GrossAmount + finalData.GrossAmount * 0.04}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Instant Discount</span>
                  <span className="text-[#D32F2F] font-semibold">
                    - ₹{" "}
                    {(
                      (finalData.GrossAmount + finalData.GrossAmount * 0.04) *
                      0.03
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Insurance</span>
                  <span className="text-[#2E7D32] font-semibold">
                    + ₹ {finalData.InsPremium}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[#01579B] font-semibold">
                    Total Amount
                  </span>
                  <span className="text-[#2E7D32] font-semibold">
                    ₹ {finalData.GrossAmount + finalData.InsPremium}
                  </span>
                </div>
                {/* <div className="border-t pt-4">
              <h2 className="text-lg font-semibold mb-4">
                Choose from the offers below
              </h2>
              <div className="flex items-center mb-2">
                <input type="radio" name="offer" className="mr-2" />
                <span className="text-gray-600">
                  WINTERDEAL{" "}
                  <span className="text-sm text-gray-500">
                    AkbarSpecial: Choose this promo to enjoy a discount of ₹ 239
                  </span>
                </span>
              </div>
              <div className="flex items-center mb-2">
                <input type="radio" name="offer" className="mr-2" />
                <span className="text-gray-600">
                  ATREWARD25{" "}
                  <span className="text-sm text-gray-500">Get ₹ 500 Off</span>
                </span>
              </div>
              <div className="flex items-center mb-4">
                <input type="radio" name="offer" className="mr-2" />
                <span className="text-gray-600">
                  ATBANK50{" "}
                  <span className="text-sm text-gray-500">
                    10% Instant Discount on Bank Cards
                  </span>
                </span>
              </div>
            </div> */}
              </div>

              {/* Passanger Details */}
              {/* <div className="max-w-4xl mx-auto p-4 bg-gray-100"> */}
              <div className="bg-white p-6 rounded-lg mt-4 shadow-md">
                <h2 className="text-xl font-semibold mb-4">
                  Traveller Details
                </h2>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">ADULT (12 yrs+)</p>
                    <p className="text-gray-600">
                      {adults.length}/{adults.length} added
                    </p>
                  </div>
                  <p className="text-red-600 mt-2">
                    **Important: Enter name as mentioned on your passport or
                    Government approved IDs.
                  </p>
                </div>
                {adults.map((_, index) => (
                  <TravellerForm
                    key={index}
                    type="adult"
                    index={index}
                    removeTraveller={() => removeTraveller("adult", index)}
                    adults={adults}
                    children={children}
                    infants={infants}
                  />
                ))}
                <button
                  onClick={() => addNewTraveller("adult")}
                  className="text-blue-600 focus:outline-none border-none font-semibold"
                >
                  + ADD NEW ADULT
                </button>

                <div className="bg-blue-50 p-4 rounded-lg mb-4 mt-4">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">CHILD (2-12 yrs)</p>
                    <p className="text-gray-600">
                      {children.length}/{children.length} added
                    </p>
                  </div>
                </div>
                {children.map((_, index) => (
                  <TravellerForm
                    key={index}
                    type="child"
                    index={index}
                    removeTraveller={() => removeTraveller("child", index)}
                  />
                ))}
                <button
                  onClick={() => addNewTraveller("child")}
                  className="text-blue-600 focus:outline-none border-none font-semibold"
                >
                  + ADD NEW CHILD
                </button>

                <div className="bg-blue-50 p-4 rounded-lg mb-4 mt-4">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">INFANT (0-2 yrs)</p>
                    <p className="text-gray-600">
                      {infants.length}/{infants.length} added
                    </p>
                  </div>
                </div>
                {infants.map((_, index) => (
                  <TravellerForm
                    key={index}
                    type="infant"
                    index={index}
                    removeTraveller={() => removeTraveller("infant", index)}
                    adults={adults}
                    setAdults={setAdults}
                    children={children}
                    setChildren={setChildren}
                    infants={infants}
                    setInfants={setInfants}
                  />
                ))}
                <button
                  onClick={() => addNewTraveller("infant")}
                  className="text-blue-600 focus:outline-none border-none font-semibold"
                >
                  + ADD NEW INFANT
                </button>

                <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                  <h3 className="font-semibold mb-4">
                    Booking details will be sent to
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <select className="border p-2 rounded">
                      <option>India(91)</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Mobile No"
                      className="border p-2 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Email"
                      className="border p-2 rounded"
                    />
                  </div>
                  <p className="text-red-600 mb-4">Mobile No is required.</p>
                  <p className="text-red-600 mb-4">Email is required.</p>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={hasGST}
                        onChange={handleCheckboxChange}
                      />
                      <p>I have a GST number (Optional)</p>
                    </div>

                    {hasGST && (
                      <div className="mt-2">
                        <input
                          type="text"
                          placeholder="Enter your GST number"
                          value={gstNumber}
                          onChange={handleGstNumberChange}
                          className={`border p-2 ${
                            error ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {error && <p className="text-red-500">{error}</p>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* </div> */}

              <div className="bg-blue-500 rounded-lg mt-4 flex justify-center">
                <button onClick={()=>{
                  console.log(adults)
                  console.log(children)
                  console.log(infants)
                }} className="w-full py-2 focus:outline-none text-white">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <div
        className="absolute inset-0 blur-[50px] -z-10"
        style={{
          width: "100vw",
          height: "100vh",
          background:
            "linear-gradient(120deg, rgba(0, 123, 255, 0.2) 60%, rgba(255, 255, 255, 0.2) 80%, rgba(0, 123, 255, 0.1) 80%, rgba(255, 255, 255, 0.1) 90%)",
        }}
      ></div>
    </>
  );
};

export default FlightBookingPage;

const TravellerForm = ({
  type,
  index,
  removeTraveller,
  adults,
  children,
  infants,
  setAdults,
  setChildren,
  setInfants
}) => {
  const [firstMidName, setFirstMidName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");

  const handleAdd=()=>{
    if(firstMidName===""){
      toast.error("Enter First Name")
      return;
    }if(lastName===""){
      toast.error("Enter Last Name")
      return;
    }if(gender===""){
      toast.error("Select your gender")
      return;
    }
    console.log(firstMidName,lastName,gender)
    const newTravellers={
      firstName: firstMidName,
      lastName: lastName,
      gender: gender,
    }
    if(type==="adult"){
      setAdults(prev=>[...prev,newTravellers])
      console.log(adults)
    }
    if(type==="child"){
      setChildren([...children,newTravellers]);
    }
    if(type==="infant"){
      setInfants([...infants,newTravellers])
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <input type="checkbox" className="mr-2" checked />
          <p className="font-semibold">
            {type.toUpperCase()} {index + 1}
          </p>
        </div>
        <button
          onClick={() => removeTraveller(index)}
          className="text-red-600 font-semibold"
        >
          REMOVE
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          value={firstMidName}
          onChange={(e) => setFirstMidName(e.target.value)}
          type="text"
          placeholder="First & Middle Name"
          className="border p-2 rounded"
        />
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          placeholder="Last Name"
          className="border p-2 rounded"
        />
        <div className="flex items-center">
          <input
            onChange={(e) => setGender(e.target.value)}
            checked={gender === "MALE"}
            value={"MALE"}
            type="radio"
            name={`gender${type}${index}`}
            className="mr-2"
          />
          <label className="mr-4">MALE</label>
          <input
            onChange={(e) => setGender(e.target.value)}
            checked={gender === "FEMALE"}
            value={"FEMALE"}
            type="radio"
            name={`gender${type}${index}`}
            className="mr-2"
          />
          <label>FEMALE</label>
        </div>
        <div>
          <button onClick={handleAdd} className="px-4 py-2 bg-blue-500 text-white focus:outline-none border-none transition-all duration-300 hover:bg-blue-800 hover:delay-100">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};