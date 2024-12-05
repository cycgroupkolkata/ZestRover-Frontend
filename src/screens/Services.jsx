import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb, ServicesShimmer, ToursCard } from "../components";
import { tourService } from "../services/TourService";

const Services = () => {
  const { category } = useParams();
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTours = async () => {
    if (category === "All") {
      const data = await tourService.getAllRecentTours();
      setTours(data);
    } else {
      const data = await tourService.getAllToursByCategory(category);
      setTours(data);
    }
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
  }, [category]);

  return isLoading ? (
    <ServicesShimmer />
  ) : (
    <>
    <Breadcrumb pageName={category}/>
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

export default Services;
