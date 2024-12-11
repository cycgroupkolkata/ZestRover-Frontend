import React, { useEffect } from "react";

const SSRDetailsComponent = ({
  ssrDetails,
  selectedSSRItems,
  setSelectedSSRItems,
  totalSSRAmount,
  setTotalSSRAmount,
}) => {
  const handleSelection = (item) => {
    setSelectedSSRItems((prevItems) => {
      const isSelected = prevItems.some(
        (selected) => selected.Code === item.Code
      );
      if (isSelected) {
        // If the item is already selected, remove it
        return prevItems.filter((selected) => selected.Code !== item.Code);
      } else {
        // If the item is not selected, add it
        return [...prevItems, item];
      }
    });
  };

  // Update totalSSRAmount whenever selectedSSRItems changes
  useEffect(() => {
    const total = selectedSSRItems.reduce((sum, item) => sum + item.Charge, 0);
    setTotalSSRAmount(total);
  }, [selectedSSRItems, setTotalSSRAmount]);

  return (
    <div className="mx-auto my-2 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">SSR Options</h2>
      <div className="space-y-4">
        {ssrDetails.length === 0 ? (
          <p className="text-gray-500">Loading SSR options...</p>
        ) : (
          ssrDetails.map((item) => (
            <div
              key={item.Code}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition duration-200"
            >
              <input
                type="checkbox"
                id={`item-${item.Code}`}
                onChange={() => handleSelection(item)}
                checked={selectedSSRItems.some(
                  (selected) => selected.Code === item.Code
                )}
                className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor={`item-${item.Code}`}
                className="ml-3 text-gray-800"
              >
                <strong>{item.Description}</strong>
                <br />
                <span className="text-sm text-gray-600">
                  Code: {item.Code} | Charge: ₹{item.Charge} | VAT: {item.VAT}%
                </span>
              </label>
            </div>
          ))
        )}
      </div>

      <h3 className="text-xl font-semibold text-blue-600 mt-6">
        Selected Items:
      </h3>
      <ul className="mt-2 space-y-2">
        {selectedSSRItems.map((item) => (
          <li key={item.Code} className="text-gray-800">
            {item.Description} - ₹{item.Charge}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SSRDetailsComponent;