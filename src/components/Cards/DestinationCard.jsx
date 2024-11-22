// const DestinationCard = ({ name, size, imageUrl }) => (
//   <div className="flex-none w-56">
//     <div
//       className="bg-gray-300 h-80 flex flex-col items-start justify-end relative bg-cover bg-center p-4"
//       style={{ backgroundImage: `url(${imageUrl})` }}
//     >
//       <p className="text-white font-semibold">{name}</p>
//       <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded transition-all duration-200 hover:delay-150 hover:bg-blue-900 outline-none focus:outline-none">
//         View Details
//       </button>
//     </div>
//   </div>
// );

// export default DestinationCard;


import { TERipple } from "tw-elements-react";

const DestinationCard = ({ name, size, imageUrl }) => (
  <TERipple rippleColor="info">
    <div className="flex-none w-56 cursor-pointer">
      <div
        className="bg-gray-300 h-80 flex flex-col items-start justify-end relative bg-cover bg-center p-4 group"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        {/* Black shade overlay with default opacity */}
        <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-30 transition-all duration-300"></div>

        {/* Card content */}
        <p className="text-white font-semibold z-10">{name}</p>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded transition-all duration-200 hover:delay-150 hover:bg-blue-900 outline-none focus:outline-none z-10"
        >
          View Details
        </button>
      </div>
  </div>
  </TERipple>
);

export default DestinationCard;
