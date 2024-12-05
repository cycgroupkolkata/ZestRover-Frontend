import React from 'react';



const FacilityListCard = ({ facility }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">
        <i className={`${facility.icon} mr-2`}></i>
        {facility.category}
      </h2>
      <ul className="list-none pl-0">
        {facility.items.map((item, idx) => (
          <li key={idx} className="mb-1">
            <i className="fas fa-check mr-2 text-blue-500"></i>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};


export default FacilityListCard