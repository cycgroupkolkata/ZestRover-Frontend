import React from "react";
import Lottie from "react-lottie";
import { LoadingAnimation } from "../assets/imges/icons-logo";

const Loading = () => {
  return (
    <div className="flex flex-col items-center text-center">

        <Lottie
          options={{
            animationData: LoadingAnimation,
          }}
          width={400}
          height={400}
          style={{marginTop: -100}}
        />

      <h1 className="mt-4 text-2xl font-bold text-gray-800">
        Searching for Your Perfect Flight...
      </h1>
      <p className="mt-2 text-gray-600">
        Hang tight! We're comparing the best options for your travel needs.
      </p>

      <p className="mt-1 text-gray-600">
        Get ready to explore new destinations!
      </p>
    </div>
  );
};

export default Loading;
