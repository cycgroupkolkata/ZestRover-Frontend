import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tourService } from "../services/TourService";
import { RecentSidePosts, TourPackageShimer } from "../components";
import "react-image-gallery/styles/css/image-gallery.css"; // Import CSS for the gallery
import ReactImageGallery from "react-image-gallery";

const TourPackage = () => {
  const { slug } = useParams();
  const [tour, setTour] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);

  const tourPackage = async () => {
    try {
      setIsLoading(true);
      const data = await tourService.getBySlug(slug);
      setTour(data);
      const allImages = data.images.map((img) => ({
        original: `${import.meta.env.VITE_IMAGE_URL}${img}`,
        thumbnail: `${import.meta.env.VITE_IMAGE_URL}${img}`, // Assuming "_thumb" suffix for thumbnail images
      }));
      // console.log(data);
      setImages(allImages);
    } catch (error) {
      console.error("Error fetching tour package:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    tourPackage();
  }, [slug]);

  return (
    <div className="flex flex-col lg:flex-row justify-center p-4 lg:p-8">
      {isLoading ? (
        <TourPackageShimer />
      ) : (
        <div className="w-full lg:w-2/3 bg-white p-4 lg:p-6 rounded-lg shadow-lg mb-4 lg:mb-0">
          {/* <img
            // src="https://placehold.co/800x400"
            src={images[0]}
            alt="Scenic view of a coastal city with a beach and buildings"
            className="w-full rounded-lg mb-4"
          />
          <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
            <img
              src="https://placehold.co/150x100"
              alt="Cityscape of Madrid"
              className="w-full lg:w-1/4 rounded-lg mb-2 lg:mb-0"
            />
            <img
              src="https://placehold.co/150x100"
              alt="Sagrada Familia in Barcelona"
              className="w-full lg:w-1/4 rounded-lg mb-2 lg:mb-0"
            />
            <img
              src="https://placehold.co/150x100"
              alt="Aerial view of Barcelona"
              className="w-full lg:w-1/4 rounded-lg"
            />
          </div> */}


            <ReactImageGallery items={images} autoPlay={true} />
          {/* <div className="w-full max-w-[90%] lg:max-w-[800px] xl:max-w-[1000px] mx-auto p-4 max-h-[500px]">
            <ReactImageGallery
              items={images}
              autoPlay={true}
              showFullscreenButton={false}
              showPlayButton={false}
              showThumbnails={true}
            />
          </div> */}

          <h2 className="text-2xl font-bold mb-2">{tour.title}</h2>
          <p className="text-xl text-teal-600 font-semibold mb-2">
            ₹{tour.price}{" "}
            <span className="text-gray-600 text-base">/Onwards Person</span>
          </p>
          <br />
          <div className="prose space-y-2" dangerouslySetInnerHTML={{ __html: tour.content }}>
            </div>

          {/* <h3 className="text-xl font-bold mb-2">Tour Itinerary</h3> */}
        </div>
      )}
      <div className="w-full lg:w-1/3 lg:ml-8">
        <RecentSidePosts/>
      </div>
    </div>
  );
};

export default TourPackage;
