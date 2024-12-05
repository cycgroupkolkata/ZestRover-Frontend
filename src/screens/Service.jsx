import React, { useEffect, useState } from "react";
import { Breadcrumb, ServicesShimmer, ToursCard } from "../components";
import { tourService } from "../services/TourService";

const Service = () => {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTours = async () => {
    const data = await tourService.getAllRecentTours();
    setTours(data);
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      fetchTours();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []); // Remove category or define it if necessary

  return isLoading ? (
    <ServicesShimmer />
  ) : (
    <>
      <Breadcrumb pageName={"Service"} />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tours.map((tour, index) => (
            <ToursCard key={index} tour={tour} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Service;
