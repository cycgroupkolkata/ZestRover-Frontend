import React, { useState } from "react";
import { FaPlaneDeparture } from "react-icons/fa";
import { MdFlightLand } from "react-icons/md";
import { GiCommercialAirplane } from "react-icons/gi";
import {Airports} from './../utils/AirportData'


const AirportAutoComplete = ({
  selectedAirport,
  setSelectedAirport,
  placeholder,
  from = false,
}) => {
  const [query, setQuery] = useState("");
  const [filteredAirports, setFilteredAirports] = useState([]);
  //   const [selectedAirport, setSelectedAirport] = useState(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    if (value) {
      const results = Airports.filter(
        (airport) =>
          airport.Name.toLowerCase().includes(value.toLowerCase()) ||
          airport.CityName.toLowerCase().includes(value.toLowerCase()) ||
          airport.Code.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredAirports(results);
    } else {
      setFilteredAirports([]);
    }
  };

  const handleSelect = (airport) => {
    setSelectedAirport(airport);
    setQuery(`${airport.CityName} (${airport.Code})`);
    setFilteredAirports([]);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="flex flex-row gap-1 justify-center items-center">
        {from?(<FaPlaneDeparture className="text-blue-500" size={24} />):(<MdFlightLand className="text-blue-500" size={24}/>)}
        <input
          autoComplete="off"
          spellCheck="false"
          autoCapitalize="off"
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          style={{ width: "90%" }}
          className="w-auto outline-none p-4 text-lg focus:outline-none border-b-0 sm:border-b-2 md:border-b-2 lg:border-b-2 xl:border-b-2 border-gray-400"
        />
      </div>
      {filteredAirports.length > 0 && (
        <ul className="absolute z-10 w-60 bg-white border border-gray-300 rounded shadow-md mt-1 max-h-60 overflow-auto">
          {filteredAirports.map((airport, index) => (
            <li
              key={index}
              onClick={() => handleSelect(airport)}
              className="px-4 py-2  hover:bg-blue-100 cursor-pointer text-sm"
            >
              {airport.CityName} ({airport.Code}) - {airport.Name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AirportAutoComplete;
