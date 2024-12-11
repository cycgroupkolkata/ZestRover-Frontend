import React, { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import { useLocation } from "react-router-dom";

const ImageGalary = () => {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { images } = location.state;

  useEffect(() => {
    setIsLoading(true);
    console.log(images);

    // Check if images are valid
    if (images && Array.isArray(images)) {
      const convertedData = images
        .filter(item => item.url) // Ensure the item has a valid URL
        .map((item) => ({
          src: item.url,
          alt: item.caption || "Image",
          width: 400, // We can adjust this dynamically later
          height: 300, // Same for height
        }));
      console.log(convertedData); // Check the converted data
      setSlides(convertedData);
    }
    setIsLoading(false);
  }, [images]);

  const handleImageClick = (index) => {
    setIndex(index);  // Set the clicked image's index for the Lightbox
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center px-4">
      <div className="container mx-auto">
        <h1 className="text-center text-2xl md:text-3xl font-bold mb-6">Hotel Images</h1>
        
        {/* Responsive Image Gallery */}
        <RowsPhotoAlbum
          photos={slides}
          targetRowHeight={150}
          onClick={({ index }) => handleImageClick(index)} // Pass the correct index to the Lightbox
          renderRow={({ row, index }) => (
            <div className="flex flex-wrap justify-center gap-4">
              {row.map((photo) => (
                <div
                  key={photo.src}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              ))}
            </div>
          )}
        />

        {/* Lightbox for displaying clicked image */}
        {index >= 0 && (
          <Lightbox
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            slides={slides}
          />
        )}
      </div>
    </div>
  );
};

export default ImageGalary;
