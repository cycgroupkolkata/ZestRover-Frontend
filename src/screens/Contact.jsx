import React, { useRef } from "react";
import { Breadcrumb, ChooseUs, ContactForm, Cta1 } from "../components";
import { ContactBg } from "../assets/imges/bg-images";
import { motion, useScroll, useTransform } from "framer-motion";

const Contact = () => {
  return (
    <>
      <Breadcrumb pageName={"Contact"} />

      {/* Contact Section Start */}
      <section className="relative bg-white dark:bg-gray-900">
        <div
          className="absolute inset-0 h-[680px] blur-xl"
          style={{
            background:
              "linear-gradient(160deg, rgba(173, 216, 230, 0.15) 15%, rgba(255, 229, 180, 0.2) 50%, rgba(255, 182, 193, 0.15) 85%)",
          }}
        ></div>

        <div className="container px-6 py-12 mx-auto z-50">
          <div className="text-center">
            <p className="font-medium text-blue-500 dark:text-blue-400">
              Get In Touch
            </p>

            <h1 className="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white">
              Our Contact Information
            </h1>

            <p className="mt-3 text-gray-500 dark:text-gray-400">
              Reach out to us for any inquiries.
            </p>
          </div>

          {/* Parallax Image */}
          <ParallaxImage imgUrl={ContactBg} />

          <div className="z-50 grid grid-cols-1 gap-12 mt-10 lg:grid-cols-3 sm:grid-cols-2">
            <ContactInfo
              icon="email"
              title="Email Address"
              description="For inquiries or bookings."
              links={[
                {
                  href: "mailto:connect@zestroverholidays.com",
                  text: "connect@zestroverholidays.com",
                },
                {
                  href: "mailto:bookings@zestroverholidays.com",
                  text: "bookings@zestroverholidays.com",
                },
              ]}
            />
            <ContactInfo
              icon="address"
              title="Our Address"
              description="Visit our office for any assistance."
              links={[
                {
                  href: "https://www.google.com/maps?q=32/1,+New+Alipore,+Sahapur+Colony,+Kolkata,+West+Bengal+700053",
                  text: "32/1, New Alipore, Kolkata",
                },
              ]}
            />
            <ContactInfo
              icon="phone"
              title="Phone Numbers"
              description="Mon-Fri from 8am to 5pm."
              links={[
                { href: "tel:+913335302326", text: "03335302326" },
                { href: "tel:+919147366913", text: "09147366913" },
              ]}
            />
          </div>
        </div>
      </section>
      {/* Contact Section End */}

      {/* Contact form */}
      <ContactForm />
      <div className="mt-4">
        <ChooseUs />
      </div>
      <Cta1 />
    </>
  );
};

const ParallaxImage = ({ imgUrl }) => {
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
        // height: "50vh",
        scale,
        opacity,
      }}
      ref={targetRef}
      className="z-50 relative w-full h-40 md:h-64 lg:h-80 object-cover mt-10 rounded-lg overflow-hidden"
    />
  );
};

const ContactInfo = ({ icon, title, description, links }) => {
  const icons = {
    email: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
        />
      </svg>
    ),
    address: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>
    ),
    phone: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
        />
      </svg>
    ),
  };

  return (
    <div className="p-4 rounded-lg bg-blue-50 md:p-6 dark:bg-gray-800">
      <span className="inline-block p-3 text-blue-500 rounded-lg bg-blue-100/80 dark:bg-gray-700">
        {icons[icon]}
      </span>
      <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">
        {title}
      </h2>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {description}
      </p>
      {links.map((link, index) => (
        <p
          key={index}
          className="mt-2 text-sm text-blue-500 dark:text-blue-400"
        >
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            {link.text}
          </a>
        </p>
      ))}
    </div>
  );
};

export default Contact;
