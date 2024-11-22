const CardCarouselShimmer = () => {
  return (
    <div className="p-8 bg-white">
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="h-6 bg-gray-300 shimmer w-48 mb-2"></div>
          <div className="h-4 bg-gray-300 shimmer w-64"></div>
        </div>
        <div className="h-6 bg-gray-300 shimmer w-32"></div>
      </div>
      <div className="relative">
        <div className="flex overflow-x-auto space-x-4 no-scrollbar" style={{scrollbarWidth: 'none'}}>
          {Array(7)
            .fill()
            .map((_, index) => (
              <div key={index} className="flex-none w-56">
                <div className="bg-gray-300 h-80 shimmer"></div>
                <div className="h-4 bg-gray-300 shimmer mt-2 w-24 mx-auto"></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CardCarouselShimmer;
