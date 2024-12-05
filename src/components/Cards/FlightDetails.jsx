import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";

const FlightDetails = ({ flight, SSR }) => {
  const [showConnections, setShowConnections] = useState(false);
  const renderFlightSegment = (segment, index) => {
    const {
      AirlineName,
      FlightNo,
      DepartureTime,
      ArrivalTime,
      FromName,
      ToName,
      Duration,
      Stops,
      VAC,
    } = segment;

    const formatHour = (timestamp) => {
      const date = new Date(timestamp);
      const hour = String(date.getHours()).padStart(2, "0");
      const minute = String(date.getMinutes()).padStart(2, "0");
      return `${hour}:${minute}`;
    };

    return (
      <div key={index} className="border rounded-lg p-4 mb-4">
        {/* Airline Info */}
        {(AirlineName || FlightNo) && (
          <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
            <div className="flex items-center mb-4 sm:mb-0">
              {VAC && (
                <img
                  src={`https://dhiz4uvf5rpaq.cloudfront.net/images/airline-logos/${VAC}.jpg?V2`}
                  alt={`${AirlineName} logo`}
                  className="mr-2"
                />
              )}
              <span className="font-semibold">
                {AirlineName.split("|")[0]} | {FlightNo}
              </span>
            </div>
            {Duration && (
              <div className="text-sm text-gray-500">{Duration}</div>
            )}
          </div>
        )}

        {/* Timing Info */}
        {(DepartureTime || ArrivalTime || FromName || ToName) && (
          <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
            {DepartureTime && (
              <div className="text-center sm:text-left mb-4 sm:mb-0">
                <div className="text-xl font-bold">
                  {formatHour(DepartureTime)}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(DepartureTime).toDateString()}
                </div>
                {FromName && <div className="text-sm">{FromName}</div>}
              </div>
            )}

            {ArrivalTime && (
              <div className="text-center mb-4 sm:mb-0">
                <div className="text-xl font-bold">
                  {formatHour(ArrivalTime)}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(ArrivalTime).toDateString()}
                </div>
                {ToName && <div className="text-sm">{ToName}</div>}
              </div>
            )}

            {Stops !== undefined && (
              <div className="text-center sm:text-right">
                <div className="text-sm font-semibold mb-2">STOPS</div>
                <div className="text-sm">
                  {Stops === 0 ? "Direct Flight" : `${Stops} Stop(s)`}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Baggage Info */}
        {segment.BaggageAllowance && segment.BaggageAllowance.adult && (
          <div className="text-center sm:text-right">
            <div className="text-sm font-semibold mb-2">BAGGAGE ALLOWANCE:</div>
            <div className="space-y-2">
              {segment.BaggageAllowance.adult && (
                <div className="flex justify-between">
                  <div className="text-sm font-semibold">ADULT</div>
                  <div className="text-sm">
                    {segment.BaggageAllowance.adult}
                  </div>
                </div>
              )}
              {segment.BaggageAllowance.checkin && (
                <div className="flex justify-between">
                  <div className="text-sm font-semibold">CHECK-IN</div>
                  <div className="text-sm">
                    {segment.BaggageAllowance.checkin}
                  </div>
                </div>
              )}
              {segment.BaggageAllowance.cabin && (
                <div className="flex justify-between">
                  <div className="text-sm font-semibold">CABIN</div>
                  <div className="text-sm">
                    {segment.BaggageAllowance.cabin}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {SSR && SSR.length > 0 && (
          <div className="text-center sm:text-right">
            <div className="text-sm font-semibold mb-2">BAGGAGE ALLOWANCE</div>
            <div className="space-y-2">
              {SSR.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <div className="text-sm font-semibold">{}</div>
                  <div className="text-sm">
                    {item.Description} / {item.PTC}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Info */}
        {(segment.BeverageAvailable || segment.SeatType) && (
          <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-500">
            {segment.BeverageAvailable && <div>Beverage Available</div>}
            {segment.SeatType && <div>{segment.SeatType}</div>}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-4 rounded-lg ">
      <h1 className="text-lg font-semibold mb-4 text-center sm:text-left">
        {flight.FromName.split("|")[1]} to {flight.ToName.split("|")[1]},{" "}
        <span className="text-blue-500">
          {new Date(flight.DepartureTime).toDateString()}
        </span>
      </h1>

      {/* Render Main Flight Segment */}
      {renderFlightSegment(flight, 0)}

      {/* Toggle Show Connections */}
      {flight.Connections && flight.Connections.length > 0 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowConnections(!showConnections)}
            className="text-blue-600 flex flex-row justify-center items-center outline-none focus:outline-none focus:border-none"
          >
            {showConnections ? <FaCaretDown /> : <FaCaretUp />}
            {showConnections ? `Hide Connections` : `Show Connections`}
          </button>
        </div>
      )}

      {/* Render Connections */}
      {/* {showConnections &&
        flight.Connections.map((connection, index) => {
          console.log(connection)
          return (
            <div key={index} className="border rounded-lg p-4 mb-4">
              <div
                onClick={onclick}
                key={index}
                className="cursor-pointer flex flex-col md:flex-row items-center justify-between p-4 border-b w-full bg-white shadow-md rounded-md mb-4"
              >
                <div className="flex items-center mb-4 md:mb-0 w-full md:w-auto">
                  <img
                    src={`https://dhiz4uvf5rpaq.cloudfront.net/images/airline-logos/${connection.VAC}.jpg?V2`}
                    alt={`${connection.VAC}`}
                    className="w-12 h-12 mr-4"
                  />
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-700">
                    {connection.From}
                    {connection.FromName}
                  </div>
                </div>
                <div className="flex flex-col items-center mb-4 md:mb-0 w-full md:w-auto">
                  <div className="text-sm text-gray-500">
                    {connection.Duration}
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <div className="w-16 h-1 bg-gray-300 mx-2"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-700">
                    {connection.To}
                  </div>
                </div>
              </div>
            </div>
          );
        })} */}

      {showConnections &&
        flight.Connections.map((connection, index) => {
          console.log(connection);
          return (
            <div key={index} className="border rounded-lg p-4 mb-4">
              <div
                onClick={onclick}
                key={index}
                className="cursor-pointer flex flex-col md:flex-row items-center justify-between p-4 border-b w-full bg-white shadow-md rounded-md mb-4"
              >
                <div className="flex items-center mb-4 md:mb-0 w-full md:w-auto">
                  <img
                    src={`https://dhiz4uvf5rpaq.cloudfront.net/images/airline-logos/${connection.VAC}.jpg?V2`}
                    alt={connection.VAC}
                    className="w-12 h-12 mr-4"
                  />
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-700">
                    {connection.From} 
                  </div>
                  <div className="text-sm text-gray-500">{connection.MAC}</div>
                </div>
                <div className="flex flex-col items-center mb-4 md:mb-0 w-full md:w-auto">
                  <div className="text-sm text-gray-500">
                    {connection.Duration}
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <div className="w-16 h-1 bg-gray-300 mx-2"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-700">
                    {connection.To} - {connection.ArrAirportName}
                  </div>
                  <div className="text-sm text-gray-500">{connection.OAC}</div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default FlightDetails;
