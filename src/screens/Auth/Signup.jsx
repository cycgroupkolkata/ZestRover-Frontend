import React from "react";
import { facebook, google, loging_vector } from "../../assets/imges/icons-logo"; // Assuming you have a sign-up vector image
import { FaUserAlt, FaKey } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SignupAnimation } from "../../assets/imges/icons-logo";
import Lottie from "react-lottie";

const SignUpForm = () => {
  return (
    <div className="w-full max-w-sm z-50">
      <div className="mb-4">
        <label className="block text-gray-700">
          <div className="flex bg-blue-600 bg-opacity-15 py-1 rounded-md px-1 flex-row space-x-2 justify-center items-center">
            <FaUserAlt color="blue"/>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">
          <div className="bg-blue-600 bg-opacity-15 py-1 rounded-md px-1 flex flex-row space-x-2 justify-center items-center">
            <FaKey color="blue"/>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">
          <div className="bg-blue-600 bg-opacity-15 py-1 rounded-md px-1 flex flex-row space-x-2 justify-center items-center">
            <FaKey color="blue"/>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
        </label>
      </div>
      <button className="w-full bg-blue-600/80 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300">
        Sign Up Now
      </button>
    </div>
  );
};

const SocialSignUpButtons = () => {
  return (
    <div className="w-full max-w-sm z-50">
      <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg flex items-center justify-center mb-2 hover:bg-gray-100 transition duration-300">
        <img src={google} alt="Google logo" className="mr-2 w-7 h-7" />
        Sign Up with Google
      </button>
      <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg flex items-center justify-center hover:bg-gray-100 transition duration-300">
        <img src={facebook} alt="Facebook logo" className="mr-2 w-7 h-7" />
        Sign Up with Facebook
      </button>
    </div>
  );
};

const SignUpSection = () => {
  return (
    <div className="w-full md:w-1/2 flex flex-col bg-white justify-center items-center">
      <div
        className="absolute inset-0 blur-xl h-[580px]"
        style={{
          background:
            "linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(232, 121, 249, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)",
        }}
      ></div>
      <div className="w-full h-full flex flex-col py-10 items-center">
        <h1 className="text-2xl font-bold mb-4">SIGN UP</h1>
        <p className="text-gray-500 mb-2 z-50">
          Already have an account?{" "}
          <Link className="text-blue-700" to="/login">
            Login
          </Link>
        </p>
        <SignUpForm />
        <p className="text-gray-500 my-4">Sign Up with Others</p>
        <SocialSignUpButtons />
      </div>
    </div>
  );
};

const PromoSection = () => {
  return (
    <div className="hidden md:flex justify-center flex-1">
      <div className="text-white text-center rounded-lg bg-opacity-70 max-w-md mt-5">
        <h2 className="text-3xl font-semibold mt-5">
          Ready for your next adventure? Book your flight today!
        </h2>
        <p className="text-lg  text-opacity-80 my-3 mb-5">
        Discover destinations, affordable flights, effortlessly
        </p>
        {/* <img
          src={loging_vector}
          alt="Person holding a tablet and smiling"
          className="rounded-lg -mt-10"
        /> */}

          <Lottie
            options={{
              animationData: SignupAnimation
            }}
            width={320}
            height={320}
          />

      </div>
    </div>
  );
};

const Signup = () => {
  return (
    <div className="flex min-h-screen bg-blue-600/80">
      <PromoSection />
      <SignUpSection />
    </div>
  );
};

export default Signup;
