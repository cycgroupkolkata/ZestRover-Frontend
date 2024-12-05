import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { adv1, adv2, flight, hotel } from "../assets/imges/images";

export const ChooseUs = () => {
  return (
    <div className="bg-white mt-2">
      <TextParallaxContent
        // imgUrl="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3"
        imgUrl={adv1}
        subheading="Adventure Awaits"
        heading="Discover the World with Us."
      >
        <ExampleContent description="Embark on unforgettable adventures with ZestroverHolidays. From serene mountain escapes to sun-kissed beaches and vibrant cityscapes, we bring the world's most breathtaking destinations to your fingertips. Let us curate your perfect getaway, filled with adventure, relaxation, and cherished memories." />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl={hotel}
        // imgUrl="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3"
        subheading="Luxury Stays"
        heading="Hotels Tailored to You."
      >
        <ExampleContent description="Indulge in unparalleled comfort and style at our handpicked luxury hotels and resorts. At ZestroverHolidays, we prioritize your experience, offering stays that redefine elegance and hospitality. From cozy boutique inns to world-class accommodations, your comfort is our mission." />
      </TextParallaxContent>
      <TextParallaxContent
        // imgUrl="https://images.unsplash.com/photo-1531231144284-684ab7ebd027?q=80&w=2416&auto=format&fit=crop&ixlib=rb-4.0.3"
        imgUrl={flight}
        subheading="Seamless Travel"
        heading="Book Flights Hassle-Free."
      >
        <ExampleContent description="Travel without the stress! ZestroverHolidays offers seamless flight booking experiences, helping you find the best deals and travel routes. Whether you're flying solo or planning a group trip, we ensure your journey is smooth, efficient, and worry-free." />
      </TextParallaxContent>
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[120vh]">
        {" "}
        {/* Reduced height */}
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(75vh - ${IMG_PADDING * 2}px)`, // Reduced height
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  // Dynamic message based on heading
  const getMessage = (heading) => {
    switch (heading) {
      case "Discover the World with Us.":
        return "Step into a world of wonders where every destination tells a story. ZestroverHolidays promises to turn your travel dreams into extraordinary realities.";
      case "Hotels Tailored to You.":
        return "Experience luxury like never before. Our curated stays are designed to bring unmatched comfort, elegance, and personalized care to your travels.";
      case "Book Flights Hassle-Free.":
        return "Simplify your travel with seamless flight bookings. Whether it's a spontaneous getaway or a planned journey, we ensure you take off with ease.";
      default:
        return "Let ZestroverHolidays craft unforgettable moments for you. Adventure, comfort, and seamless experiences await!";
    }
  };

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white px-4"
    >
      <p className="mb-2 text-center text-xl font-semibold md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-medium md:text-7xl">{heading}</p>
      <p className="mt-4 text-center text-sm font-medium md:mt-6 md:text-lg">
        {getMessage(heading)}
      </p>
    </motion.div>
  );
};

const ExampleContent = ({ description }) => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Why Choose ZestroverHolidays?
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-lg text-neutral-600 md:text-lg">{description}</p>
    </div>
  </div>
);

export default ChooseUs;
