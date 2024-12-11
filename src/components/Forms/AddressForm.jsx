import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AddressForm = ({ type, index, address, setAddress }) => {
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedAddress = { streetAddress, city, state, zipCode };
    setAddress(updatedAddress);
    console.log(address)
    toast.success("Address added succesfully!")
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <p className="font-semibold text-xl">
             Add Address
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
          type="text"
          placeholder="Street Address"
          className="border p-2 rounded"
          required
        />
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          type="text"
          placeholder="City"
          className="border p-2 rounded"
          required
        />
        <input
          value={state}
          onChange={(e) => setState(e.target.value)}
          type="text"
          placeholder="State"
          className="border p-2 rounded"
          required
        />
        <input
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          type="text"
          placeholder="Zip Code"
          className="border p-2 rounded"
          required
        />
        <div className="col-span-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white focus:outline-none border-none transition-all duration-300 hover:bg-blue-800 w-full"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
