import { useEffect, useState } from "react";

const tourPackages = [
  { value: "", label: "Select Package"},
  { value: "Stunning Vietnam", label: "Stunning Vietnam" },
  { value: "Anant Kashi Ayodhya Yatra", label: "Anant Kashi Ayodhya Yatra" },
  { value: "Singapore", label: "Singapore" },
  {
    value: "Classical Cappadocia And Istanbul",
    label: "Classical Cappadocia And Istanbul",
  },
  { value: "Europe For All (Winter)", label: "Europe For All (Winter)" },
  {
    value: "North South Discovery New Zealand",
    label: "North South Discovery New Zealand",
  },
  { value: "Norway In A Nutshell", label: "Norway In A Nutshell" },
  { value: "Memorable Baku", label: "Memorable Baku" },
  {
    value: "Enchanting Himalayan Escape",
    label: "Enchanting Himalayan Escape",
  },
  { value: "Discovery of Morocco", label: "Discovery of Morocco" },
  { value: "Kerala’s Paradise Journey", label: "Kerala’s Paradise Journey" },
  {
    value: "Andaman’s Port Blair Exploration",
    label: "Andaman’s Port Blair Exploration",
  },
  {
    value: "Madrid-Barcelona MICE Fusion",
    label: "Madrid-Barcelona MICE Fusion",
  },
  {
    value: "Spiritual Heritage Tour: Varanasi, Ayodhya & Prayagraj",
    label: "Spiritual Heritage Tour: Varanasi, Ayodhya & Prayagraj",
  },
  { value: "Jagannath Heritage Tour", label: "Jagannath Heritage Tour" },
  { value: "Divine Tirupati Bliss Tour", label: "Divine Tirupati Bliss Tour" },
  { value: "Goa’s Golden Sands Escape", label: "Goa’s Golden Sands Escape" },
  { value: "North East Hills Retreat", label: "North East Hills Retreat" },
  {
    value: "Jyotirlinga Darshan – Madhya Pradesh",
    label: "Jyotirlinga Darshan – Madhya Pradesh",
  },
  {
    value: "Mata Vaishno Devi Darshan Yatra",
    label: "Mata Vaishno Devi Darshan Yatra",
  },
  { value: "South African Safari", label: "South African Safari" },
  {
    value: "The Bhutan Experience: Traditions & Trails",
    label: "The Bhutan Experience: Traditions & Trails",
  },
  {
    value: "Serene Nepal: Mountains & Monasteries",
    label: "Serene Nepal: Mountains & Monasteries",
  },
  { value: "Urban Wonders of Hong Kong", label: "Urban Wonders of Hong Kong" },
  {
    value: "Enchanting South Korea Journey",
    label: "Enchanting South Korea Journey",
  },
  { value: "Amazing Australia", label: "Amazing Australia" },
  { value: "Dubai’s Golden Delights", label: "Dubai’s Golden Delights" },
  {
    value: "Europe Expedition: Croatian Coastal Charm",
    label: "Europe Expedition: Croatian Coastal Charm",
  },
  {
    value: "Europe Expedition: Luxurious Paris Retreat",
    label: "Europe Expedition: Luxurious Paris Retreat",
  },
  {
    value: "European Expedition: London & Scotland Grand Tour",
    label: "European Expedition: London & Scotland Grand Tour",
  },
  {
    value: "European Expedition: Eternal Rome Experience",
    label: "European Expedition: Eternal Rome Experience",
  },
  { value: "Vietnam Serenity Escape", label: "Vietnam Serenity Escape" },
  { value: "Mauritius Dream Voyage", label: "Mauritius Dream Voyage" },
  { value: "Maldives Bliss Escape", label: "Maldives Bliss Escape" },
  { value: "Majestic Kenya Adventure", label: "Majestic Kenya Adventure" },
  {
    value: "Europe Expedition: Charming Switzerland Sojourn",
    label: "Europe Expedition: Charming Switzerland Sojourn",
  },
  { value: "Singapore Splendor Escape", label: "Singapore Splendor Escape" },
  { value: "Exotic Thailand Escape", label: "Exotic Thailand Escape" },
  {
    value: "Jammu & Kashmir Wonders Tour",
    label: "Jammu & Kashmir Wonders Tour",
  },
  {
    value: "Enchanted Hills of Western Ghats",
    label: "Enchanted Hills of Western Ghats",
  },
  {
    value: "Himalayan Haven of Uttarakhand",
    label: "Himalayan Haven of Uttarakhand",
  },
  { value: "Lakshadweep Lagoon Escape", label: "Lakshadweep Lagoon Escape" },
  { value: "Royal Rajasthan Expedition", label: "Royal Rajasthan Expedition" },
  {
    value: "Exotic Kashmir With Sonmarg",
    label: "Exotic Kashmir With Sonmarg",
  },
  {
    value: "Himachal Highlands Adventure",
    label: "Himachal Highlands Adventure",
  },
];

const ContactForm = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    try {
      fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => setCountries(data));
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <main className="relative pt-16 pb-1 bg-gray-900">
      <div className="relative z-10 max-w-screen-xl mx-auto text-gray-600 sm:px-4 md:px-8">
        <div className="max-w-lg space-y-3 px-4 sm:mx-auto sm:text-center sm:px-0">
          <h3 className="text-cyan-400 font-semibold">Adventure</h3>
          <p className="text-white text-3xl font-semibold sm:text-4xl">
            Book A Tour with Us
          </p>
          <p className="text-gray-300">
            Discover exciting new destinations, experience unique cultures, and
            create unforgettable memories on every journey with us{" "}
          </p>
        </div>
        <div className="mt-12 mx-auto px-4 p-8 bg-white sm:max-w-lg sm:px-8 sm:rounded-xl">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div>
              <label className="font-medium">Full name</label>
              <input
                type="text"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Phone number</label>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2">
                  <select className="text-sm bg-transparent outline-none rounded-lg h-full">
                    {countries.map((country, index) => (
                      <option key={index + 1} value={country.cca3}>
                        {country.cca2}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="number"
                  placeholder="+91 9147366913"
                  required
                  className="w-full pl-[4.5rem] pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="font-medium">Select Package</label>
              <select
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
              >
                {tourPackages.map((data,index)=>(
                    <option key={index + 1} value={data.value}>
                      {data.label}
                    </option>
  
                ))}

              </select>
            </div>
            <div>
              <label className="font-medium">Message</label>
              <textarea
                required
                className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
              ></textarea>
            </div>
            <button className="w-full px-4 py-2 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-lg duration-150">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div
        className="absolute inset-0 blur-[118px] max-w-lg h-[800px] mx-auto sm:max-w-3xl sm:h-[400px]"
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
        }}
      ></div>
    </main>
  );
};

export default ContactForm;
