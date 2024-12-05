import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Travellers from "./Travellers";
import { FaExchangeAlt } from "react-icons/fa";

import AirportAutoComplete from "./AirportAutoComplete";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

const classes = [
  { id: 1, name: "Economy" },
  { id: 2, name: "Premium Economy" },
  { id: 3, name: "Business" },
  { id: 4, name: "First Class" },
];
const bags = [
  { id: 1, name: "0 Bags" },
  { id: 2, name: "1 Bag" },
  { id: 3, name: "2 Bags" },
  { id: 4, name: "3 Bags" },
  { id: 5, name: "4 Bags" },
];

const FlightSearchCard = ({
  isRtn = false,
  selCls = 0,
  selBag = 0,
  depDate = "",
  retDate = "",
  adl = 1,
  child = 0,
  inf = 0,
  from = null,
  to = null,
}) => {
  const [isReturn, setIsReturn] = useState(isRtn);
  const [selectedClass, setSelectedClass] = useState(classes[selCls]);
  const [selectedBag, setSelectedBag] = useState(bags[selBag]);
  const [departureDate, setDepartureDate] = useState(depDate);
  const [returnDate, setReturnDate] = useState(retDate);
  const [adults, setAdults] = useState(adl);
  const [children, setChildren] = useState(child);
  const [infants, setInfants] = useState(inf);
  const [selectedFrom, setSelectedFrom] = useState(from);
  const [selectedTo, setSelectedTo] = useState(to);
  const [isRotated, setIsRotated] = useState(false);
  const navigate = useNavigate();

  //   const formatDate = (date) => {
  //     const newDate = new Date(date == "" ? new Date() : date);
  //     return newDate.toLocaleDateString("en-US", {
  //       weekday: "long", // "Friday"
  //       day: "2-digit", // "22"
  //       month: "short", // "Nov"
  //       year: "numeric", // "2024"
  //     });
  //   };

  const handleExchangeAirport = () => {
    const fromAirport = selectedFrom;
    setSelectedFrom(selectedTo);
    setSelectedTo(fromAirport);
    console.log(fromAirport);
    console.log(selectedFrom);
    console.log(selectedTo);
    setIsRotated(!isRotated); // Toggle rotation state
  };

  const handleSubmit = () => {
    if (selectedFrom === null) {
      toast.warning("Select From");
      return;
    }
    if (selectedTo === null) {
      toast.warning("Select To");
      return;
    }
    if (departureDate === "") {
      toast.warning("Select Departure Date");
      return;
    }

    navigate(
      `/flight-search?class=${selectedClass.id}&noBags=${selectedBag.id}&depDate=${departureDate}&retDate=${returnDate}&adult=${adults}&child=${children}&infants=${infants}&return=${isReturn}`,
      {
        state: {
          from: selectedFrom,
          to: selectedTo,
        },
      }
    );


  };

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center mb-4 gap-4 sm:gap-6 md:gap-8">
        {/* Return Checkbox */}
        <div className="text-lg text-gray-700 mb-2 sm:mb-0 w-full sm:w-auto">
          <label
            htmlFor="Toggle1"
            className="inline-flex items-center space-x-4 cursor-pointer text-gray-800"
          >
            <span className="relative">
              <input
                value={isReturn}
                onChange={() => setIsReturn(!isReturn)}
                id="Toggle1"
                type="checkbox"
                className="hidden peer"
              />
              <div className="w-10 h-6 rounded-full shadow-inner bg-gray-300 peer-checked:bg-blue-500"></div>
              <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow bg-gray-100 peer-checked:right-0 peer-checked:left-auto"></div>
            </span>
            <span>Return</span>
          </label>
        </div>

        {/* Class Dropdown */}
        <div className="text-sm text-gray-700 mb-2 sm:mb-0 w-full sm:w-auto">
          <div className="mx-auto text-gray-800 w-full sm:w-52">
            <Listbox value={selectedClass} onChange={setSelectedClass}>
              <ListboxButton
                className={clsx(
                  "relative block w-full rounded-lg bg-white border border-gray-300 py-1.5 pr-8 pl-3 text-left text-sm shadow-sm",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                )}
              >
                {selectedClass.name}
                <ChevronDownIcon
                  className="pointer-events-none absolute top-2.5 right-2.5 h-4 w-4 text-gray-500"
                  aria-hidden="true"
                />
              </ListboxButton>
              <ListboxOptions
                anchor="bottom"
                transition
                className={clsx(
                  "absolute z-10 mt-1 z-50 w-full sm:w-60 rounded-lg bg-white border border-gray-300 shadow-lg",
                  "focus:outline-none"
                )}
              >
                {classes.map((classType) => (
                  <ListboxOption
                    key={classType.name}
                    value={classType}
                    className="group flex cursor-pointer items-center gap-2 rounded-lg py-2 px-3 select-none hover:bg-gray-100"
                  >
                    <CheckIcon className="h-4 w-4 text-blue-500 invisible group-data-[selected]:visible" />
                    <div className="text-sm text-gray-800">
                      {classType.name}
                    </div>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Listbox>
          </div>
        </div>

        {/* Bag Dropdown */}
        <div className="text-sm text-gray-700 mb-2 sm:mb-0 w-full sm:w-auto">
          <div className="mx-auto text-gray-800 w-full sm:w-52">
            <Listbox value={selectedBag} onChange={setSelectedBag}>
              <ListboxButton
                className={clsx(
                  "relative block w-full rounded-lg bg-white border border-gray-300 py-1.5 pr-8 pl-3 text-left text-sm shadow-sm",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                )}
              >
                {selectedBag.name}
                <ChevronDownIcon
                  className="pointer-events-none absolute top-2.5 right-2.5 h-4 w-4 text-gray-500"
                  aria-hidden="true"
                />
              </ListboxButton>
              <ListboxOptions
                anchor="bottom"
                transition
                className={clsx(
                  "absolute z-10 mt-1 z-50 w-full sm:w-60 rounded-lg bg-white border border-gray-300 shadow-lg",
                  "focus:outline-none"
                )}
              >
                {bags.map((bagType) => (
                  <ListboxOption
                    key={bagType.name}
                    value={bagType}
                    className="group flex cursor-pointer items-center gap-2 rounded-lg py-2 px-3 select-none hover:bg-gray-100"
                  >
                    <CheckIcon className="h-4 w-4 text-blue-500 invisible group-data-[selected]:visible" />
                    <div className="text-sm text-gray-800">{bagType.name}</div>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Listbox>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg px-6 py-2 w-full my-5 border max-w-md sm:max-w-6xl">
        <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center gap-4">
          <div className="flex bg-white w-full flex-col sm:flex-row sm:items-center gap-4 ">
            {/* Flying From */}
            <div className="w-full sm:flex-1 text-left">
              <div className="text-sm font-semibold text-gray-800">
                Flying From
              </div>
              {/* <div className="text-gray-500"> */}
              <AirportAutoComplete
                // q={`${selectedFrom ? selectedFrom.CityName : ""} ${selectedFrom?`(${selectedFrom.Code}`:""}`}
                q={
                  selectedFrom === null
                    ? ""
                    : `${selectedFrom.CityName} (${selectedFrom.Code})`
                }
                placeholder={"From"}
                selectedAirport={selectedFrom}
                setSelectedAirport={setSelectedFrom}
                from={true}
              />
              {/* </div> */}
              <hr className="sm:hidden my-2" />
            </div>

            {/* Exchange Icon */}
            <div className="flex items-center justify-center sm:mx-4">
              <button
                onClick={handleExchangeAirport}
                className={`text-gray-600 p-4 focus:outline-none hover:text-gray-800 transition-transform transform ${
                  isRotated ? "rotate-180" : "rotate-0"
                }`}
                aria-label="Exchange"
              >
                <FaExchangeAlt size={28} />
              </button>
            </div>

            {/* Flying To */}
            {/* Flying From */}
            <div className="w-full sm:flex-1 text-left">
              <div className="text-sm font-semibold text-gray-800">
                Flying From
              </div>
              {/* <div className="text-gray-500"> */}
              <AirportAutoComplete
                // q={`${selectedTo ? selectedFrom.CityName : ""} ${selectedTo?`(${selectedTo.Code})`:""}`}
                q={
                  selectedTo === null
                    ? ""
                    : `${selectedTo.CityName} (${selectedTo.Code})`
                }
                placeholder={"To"}
                selectedAirport={selectedTo}
                setSelectedAirport={setSelectedTo}
                from={false}
              />
              {/* </div> */}
              <hr className="sm:hidden my-2" />
            </div>
          </div>

          {/* Depart */}
          <div className="w-full sm:flex-1 text-left">
            <div className="text-sm font-semibold text-gray-800">Depart</div>
            <input
              onChange={(event) => setDepartureDate(event.target.value)}
              value={departureDate}
              type="date"
              className="text-lg bg-transparent outline-none focus:outline-none text-gray-500"
            />
            {/* {formatDate(departureDate)} */}
            <hr className="sm:hidden my-2" />
          </div>

          {/* Return */}
          <div className="w-full sm:flex-1 text-left">
            <div className="text-sm font-semibold text-gray-800">Return</div>
            <div className="text-sm text-gray-500">
              <input
                disabled={!isReturn}
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                type="date"
                className="text-lg bg-transparent outline-none focus:outline-none text-gray-500"
              />
            </div>
            <hr className="sm:hidden my-2" />
          </div>

          {/* Travellers */}
          <div className="w-full sm:flex-1 text-left">
            <div className="text-sm font-semibold text-gray-800">
              Travellers
            </div>
            {/* <div className="text-sm text-gray-500">
              2 adults - 1 child - 1 room
            </div> */}
            <Menu
              as="div"
              className="relative  inline-block text-left outline-none border-none"
            >
              <div>
                <MenuButton className="inline-flex border-none outline-none focus:outline-none w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm  hover:bg-gray-50">
                  {adults} adults - {children} child - {infants}
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 size-5 text-gray-400 outline-none border-none"
                  />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute right-0 z-50 mb-2 w-56 origin-bottom-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                {" "}
                <Travellers
                  adults={adults}
                  setAdults={setAdults}
                  children={children}
                  setChildren={setChildren}
                  infants={infants}
                  setInfants={setInfants}
                />
              </MenuItems>
            </Menu>
          </div>

          {/* Search Button */}
          <div className="w-full sm:w-auto text-center sm:ml-4">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-900 space-x-4 focus:outline-none hover:bg-blue-700 transition-all duration-200 hover:delay-100 text-white px-6 py-3 rounded-lg flex justify-center items-center shadow-lg w-full sm:w-auto"
            >
              <FaSearch size={24} /> <span>Search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchCard;
