import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

const Travellers = ({adults,setAdults,children,setChildren,infants,setInfants}) => {


  const Counter = ({ label, subLabel, count, onDecrement, onIncrement }) => (
    <div className="flex items-center justify-between py-4">
      <div>
        <div className="font-semibold">{label}</div>
        {subLabel && <div className="text-sm text-gray-500">{subLabel}</div>}
      </div>
      <div className="flex items-center">
        <button
          onClick={onDecrement}
          className="border border-blue-500 text-blue-500 px-2 py-1 rounded"
        >
          <FaMinus />
        </button>
        <span className="mx-4">{count}</span>
        <button
          onClick={onIncrement}
          className="border border-blue-500 text-blue-500 px-2 py-1 rounded"
        >
          <FaPlus />{" "}
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded">
      <Counter
        label="Adults"
        count={adults}
        onDecrement={() => setAdults(adults > 0 ? adults - 1 : 0)}
        onIncrement={() => setAdults(adults + 1)}
      />
      <hr />
      <Counter
        label="Children"
        subLabel="Age 2y - 12y"
        count={children}
        onDecrement={() => setChildren(children > 0 ? children - 1 : 0)}
        onIncrement={() => setChildren(children + 1)}
      />
      <hr />
      <Counter
        label="Infants"
        subLabel={"Age 0y - 2y"}
        count={infants}
        onDecrement={() => setInfants(infants > 0 ? infants - 1 : 0)}
        onIncrement={() => setInfants(infants + 1)}
      />
    </div>
  );
};

export default Travellers;
