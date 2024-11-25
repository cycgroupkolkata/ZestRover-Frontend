import React from "react";
import { motion } from "framer-motion";
import { about } from "../assets/imges/images";

const AboutUsComponent = () => (
  <div className="flex flex-col lg:flex-row justify-center items-center p-10 bg-gradient-to-r from-blue-50 via-gray-100 to-white">
    {/* Text Content Section */}
    <div className="max-w-4xl mx-auto mb-10 lg:mb-0 px-6">
      <motion.h1
        className="text-4xl lg:text-5xl font-extrabold text-blue-800 mb-6 leading-tight tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Let’s Go Together Plan Your Trip With Us
      </motion.h1>
      <motion.p
        className="text-lg lg:text-xl text-gray-800 mb-6 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        Zest Rover Holidays has laid its foundation with a focus on quality and
        premium service in the Travel and Tourism industry. Our priority is to
        ensure a comfortable and enjoyable holiday, creating memorable experiences
        for all our clients. From conceptualization and planning to execution and
        post-event evaluation, we handle it all with precision, creativity, and
        hassle-free service.
      </motion.p>
      <motion.p
        className="text-lg lg:text-xl text-gray-800 mb-6 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        Our offerings cater to corporates, business travelers, individuals,
        groups, students, honeymooners, and seniors, ensuring an awesome travel
        experience. We offer diversified services such as holiday packages for the
        MICE segment, events, inbound travel, rewards, recognition programs, and
        destination weddings. These packages are curated by industry experts in
        hospitality, hotels, airlines, and travel, ensuring quality and tailored
        packages to meet individual needs.
      </motion.p>
      <motion.p
        className="text-lg lg:text-xl text-gray-800 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        At Zest Rover Holidays, you can find all travel solutions under one roof.
        We believe our success lies in guest satisfaction and nurturing long-term
        relationships with our valued customers.
      </motion.p>
    </div>

    {/* Image Section */}
    <div className="lg:ml-12 flex justify-center w-full lg:w-1/2">
      <motion.img
        src={about}
        alt="Placeholder image with dimensions 630x700"
        className="w-full lg:w-auto rounded-lg shadow-2xl transition-transform duration-300 hover:scale-105"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  </div>
);

export default AboutUsComponent;
