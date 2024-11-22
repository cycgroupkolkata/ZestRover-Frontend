import React, { useState } from "react";
import { FaMinus, FaP } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";


function Counter({ label, subLabel, count, onDecrement, onIncrement }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-300">
      <div>
        <div className="font-semibold text-sm">{label}</div>
        {subLabel && <div className="text-sm text-gray-500">{subLabel}</div>}
      </div>
      <div className="flex items-center">
        <button
          onClick={onDecrement}
          className="w-8 h-8 border focus:outline-none border-blue-500 text-blue-500 rounded flex items-center justify-center"
        >
          <FaMinus/>
        </button>
        <span className="mx-4">{count}</span>
        <button
          onClick={onIncrement}
          className="w-8 h-8 border focus:outline-none border-blue-500 text-blue-500 rounded flex items-center justify-center"
        >
          <FaPlus/>
        </button>
      </div>
    </div>
  );
}

function HotelTravellers({
  adults,
  setAdults,
  children,
  setChildren,
  rooms,
  setRooms,
}) {
//   const [adults, setAdults] = useState(2);
//   const [children, setChildren] = useState(1);
//   const [rooms, setRooms] = useState(1);

  return (
    <div className="max-w-md mx-auto mt-10 px-4 rounded-lg">
      <Counter
        label="Adults"
        count={adults}
        onDecrement={() => setAdults(adults > 0 ? adults - 1 : 0)}
        onIncrement={() => setAdults(adults + 1)}
      />
      <Counter
        label="Children"
        subLabel="Ages 0 - 12"
        count={children}
        onDecrement={() => setChildren(children > 0 ? children - 1 : 0)}
        onIncrement={() => setChildren(children + 1)}
      />
      <Counter
        label="Rooms"
        count={rooms}
        onDecrement={() => setRooms(rooms > 0 ? rooms - 1 : 0)}
        onIncrement={() => setRooms(rooms + 1)}
      />
    </div>
  );
}

export default HotelTravellers;
