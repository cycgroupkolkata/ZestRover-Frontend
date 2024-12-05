// import React, { useEffect } from "react";

// const FlightCard = ({ index, flight }) => {
//   const formatHour = (timestamp) => {
//     const date = new Date(timestamp);
//     const hour = String(date.getHours()).padStart(2, "0"); // Ensures 2 digits for hour
//     const minute = String(date.getMinutes()).padStart(2, "0"); // Ensures 2 digits for minute
//     const formattedTime = `${hour}:${minute}`;
//     return formattedTime;
//   };
//   return (
//     <div
//       key={index}
//       className="cursor-pointer flex flex-col lg:flex-row items-center bg-white p-4 shadow-md rounded-md"
//     >
//       {/* Airline Logo and Flight Details */}
//       <div className="flex items-center w-full lg:w-3/4 mb-4 lg:mb-0">
//         <img
//           src={"https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/6E.png"
//           }
//           alt="Airline logo"
//           className="mr-4 w-16 h-16"
//         />
//         <div>
//           {/* Flight Timing and Route */}
//           <div className="flex items-center mb-2">
//             <span className="font-bold text-lg">
//               {formatHour(flight.DepartureTime)}
//             </span>
//             <span className="mx-2">{flight.From}</span>
//             <span className="text-gray-500">
//               {flight.Stops >= 1 ? `${flight.Stops} Stop` : "Nonstop"}
//             </span>
//             <span className="mx-2">{formatHour(flight.ArrivalTime)}</span>
//             <span>{flight.To}</span>
//           </div>
//           <div className="text-gray-500 mb-2">{flight.Duration} (Duration)</div>
//           {/* Additional Flight Information */}
//           <div className="text-sm text-gray-500">
//             <div>
//               <span className="font-medium">{flight.AirlineName}</span>
//             </div>
//             <div>
//               <span className="font-medium">15kg Check-In, 7kg Cabin</span>
//             </div>
//             <div>
//               Layover: <span className="font-medium">None</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Price and Action */}
//       <div className="w-full lg:w-1/4 text-right">
//         <div className="text-lg font-bold">
//           INR ₹{flight.GrossFare + flight.GrossFare * 0.04}
//         </div>
//         <div className="text-gray-500 mb-2">{flight.Seats} Seats</div>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
//           View Deal
//         </button>
//         {/* Additional Call to Action */}
//         <div className="text-sm text-gray-400 mt-2">
//           {flight.Refundable === "Y" ? "Includes free cancellation" : ""}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FlightCard;

const FlightCard = ({ index, flight,onclick }) => {
  const formatHour = (timestamp) => {
    const date = new Date(timestamp);
    const hour = String(date.getHours()).padStart(2, "0"); // Ensures 2 digits for hour
    const minute = String(date.getMinutes()).padStart(2, "0"); // Ensures 2 digits for minute
    const formattedTime = `${hour}:${minute}`;
    return formattedTime;
  };
  return (
    <div
      onClick={onclick}
      key={index}
      className="cursor-pointer flex flex-col md:flex-row items-center justify-between p-4 border-b w-full bg-white shadow-md rounded-md mb-4"
    >
      <div className="flex items-center mb-4 md:mb-0 w-full md:w-auto">
        <img
          src={
            `https://dhiz4uvf5rpaq.cloudfront.net/images/airline-logos/${flight.Provider}.jpg?V2`
          }
          alt={`${flight.AirlineName.split("|")[0]} logo`}
          className="w-8 h-8 mr-4"
        />
        <div>
          <div className="text-lg font-bold text-blue-700">
            {formatHour(flight.DepartureTime)}
          </div>
          <div className="text-sm text-gray-500">
            {flight.AirlineName.split("|")[0]}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mb-4 md:mb-0 w-full md:w-auto">
        <div className="text-sm text-gray-500">{flight.Duration}</div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
          <div className="w-16 h-1 bg-gray-300 mx-2"></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
        </div>
        <div className="text-sm text-gray-500">
          {flight.Stops >= 1 ? `${flight.Stops} Stop` : "Nonstop"}
        </div>
      </div>
      <div className="text-lg font-bold text-blue-700 mb-4 md:mb-0 w-full md:w-auto">
        {formatHour(flight.ArrivalTime)} <br />
        <span className="text-sm text-gray-400 font-medium">Arrival</span>
      </div>
      <div className="text-right mb-4 md:mb-0 w-full md:w-auto">
        <div className="text-lg font-bold text-blue-700">
          ₹{flight.GrossFare + flight.GrossFare * 0.04}
        </div>
        {/* <div className="text-sm text-green-500">{discount}</div> */}
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto focus:outline-none group">
        Book
      </button>
    </div>
  );
};

export default FlightCard;
