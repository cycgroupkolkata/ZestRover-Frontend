import { useEffect, useState } from "react";
import { career } from "../assets/imges/icons-logo";
import axios from "axios";
import { toast } from "react-toastify";
import { joinus } from "../assets/imges/images";

const jobOpenings = [
  { value: "", label: "Select Job" },
  {
    value: "1",
    label: "Regional Manager – Business Development (Alipur, Kolkata)",
  },
  {
    value: "2",
    label: "Senior Associate – Business Development (Alipur, Kolkata)",
  },
  {
    value: "3",
    label: "Product Manager (Alipur, Kolkata)",
  },
  {
    value: "4",
    label: "Assistant Sales Manager (Alipur, Kolkata)",
  },
  {
    value: "5",
    label: "React Developer (Intern) (Alipur, Kolkata)",
  },
];

const Career = () => {
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    job: "",
    resume: null,
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => setCountries(data));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const jobData = new FormData();
    jobData.append(
      "job-application",
      JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        job: formData.job,
        message: formData.message,
      })
    );

    jobData.append("resume", formData.resume);

    try {
      const uri = `${import.meta.env.VITE_API_URL}/api/v1/job/apply`;
      const response = await axios.post(uri, jobData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = await response.data;
      console.log(data);
      toast.success(data.msg);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }

    console.log(formData);
  };

  const scrollToJobs = () => {
    const viewHeight = window.innerHeight;
    const scrollAmount = viewHeight * 1.4;
    window.scrollBy({
      top: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="p-6">
        <div className="bg-blue-50 py-2 px-2 md:px-24 rounded-lg flex flex-col md:flex-row items-center justify-between">
          <div className="">
            <h1 className="text-4xl font-bold text-blue-900">Join our team</h1>
            <p className="text-black/60 mt-2 w-3/4">
              Driving innovation, sustainability, and unforgettable journeys to
              inspire the world.
            </p>
            <button
              onClick={scrollToJobs}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none"
            >
              View Open positions
            </button>
          </div>
          <img
            src={career}
            alt="Illustration of team working"
            className="mt-6 md:mt-0 md:ml-6 w-72 h-56"
          />
        </div>
        {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-blue-800 font-semibold">
              Company Goif Compain
            </h2>
            <img
              src="https://placehold.co/300x200"
              alt="Company meeting"
              className="mt-2 rounded-lg"
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-blue-800 font-semibold">Spenary Culture</h2>
            <p className="text-blue-600 mt-2">
              Dorasi creatubiruilreal Psaad Hotermesgto oolcto ectiting your
              bleate thy terecating to alot tnodarvehedidims, noorite.
            </p>
            <p className="text-blue-600 mt-2">Bor 0.2E sarort</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-blue-800 font-semibold">Besiler</h2>
            <p className="text-blue-600 mt-2">
              Vodsmrsreaygot olk raen veace Isand sloan caed torcl Vars the euse
              hoots rasng or were here loo tivier eart alod.
            </p>
            <div className="flex items-center mt-2">
              <i className="fas fa-user-circle text-blue-600"></i>
              <i className="fas fa-user-circle text-blue-600 ml-2"></i>
              <i className="fas fa-user-circle text-blue-600 ml-2"></i>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-blue-800 font-semibold">Eony Pucton</h2>
            <p className="text-blue-500 mt-2">Aech I2E Hos Urnesgaias</p>
            <ul className="text-blue-600 mt-2">
              <li>Hedin Heterent Poopers</li>
              <li>Hooture Bourery</li>
              <li>Brany Conture Food Rloics</li>
              <li>Location</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-blue-800 font-semibold">
              Company Culture Pectune
            </h2>
            <p className="text-blue-500 mt-2">
              Incthaal Loocdhs Bos Came Apply
            </p>
            <ul className="text-blue-600 mt-2">
              <li>Heottin Rerewent Preers</li>
              <li>Reolnen Four Rpers</li>
              <li>Recomtreet Lood Raoifs</li>
              <li>Loot Type</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-blue-800 font-semibold">Butt Blits</h2>
            <ul className="text-blue-600 mt-2">
              <li>Appoll Vag Bu Con</li>
              <li>Ficari isonstino bttiered</li>
              <li>Appotators</li>
              <li>Somik speaty de cult smgg</li>
              <li>Fiooorating</li>
              <li>Hesater, coting o' osclLling</li>
            </ul>
          </div>
        </div> */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            className="absolute inset-0 blur-[118px] max-w-lg h-[800px] mx-auto sm:max-w-3xl sm:h-[400px]"
            style={{
              background:
                "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
            }}
          ></div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-blue-800 font-semibold">
              Why Join Zestrover Holidays?
            </h2>
            <img
              src={joinus}
              alt="Team meeting at Zestrover Holidays"
              className="mt-2 rounded-lg"
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            <h2 className="text-blue-800 font-semibold text-xl">
              Our Vibrant Culture
            </h2>
            <p className="text-blue-600">
              At Zestrover Holidays, we take pride in cultivating a culture that
              celebrates diversity, creativity, and mutual respect.
            </p>
            <p className="text-blue-600">
              Our team thrives on collaboration and innovation, ensuring that
              every voice is heard and valued.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-blue-800 font-semibold">Employee Benefits</h2>
            <p className="text-blue-600 mt-2">
              Enjoy competitive benefits, opportunities for professional growth,
              and the chance to work in a dynamic industry.
            </p>
            <p className="text-blue-600 mt-2">
              We also prioritize employee well-being with flexible work options,
              wellness programs, and a supportive environment that fosters
              work-life balance.
            </p>
            <div className="flex items-center mt-2">
              <i className="fas fa-user-circle text-blue-600"></i>
              <i className="fas fa-user-circle text-blue-600 ml-2"></i>
              <i className="fas fa-user-circle text-blue-600 ml-2"></i>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-blue-800 font-semibold">
              Career Opportunities
            </h2>
            <p className="text-blue-500 mt-2">
              Join a team that values your skills.
            </p>
            <ul className="text-blue-600 mt-2">
              <li>Exciting roles in various departments</li>
              <li>Flexible work options</li>
              <li>Continuous learning and upskilling</li>
              <li>Opportunities to travel</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-blue-800 font-semibold">What We Offer</h2>
            <p className="text-blue-500 mt-2">
              A workplace where innovation meets opportunity.
            </p>
            <ul className="text-blue-600 mt-2" typeof="">
              <li>Comprehensive training programs</li>
              <li>Supportive leadership</li>
              <li>Team-building activities</li>
              <li>Open-door policies</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-blue-800 font-semibold">Join Us Today!</h2>
            <ul className="text-blue-600 mt-2">
              <li>Apply for roles that match your passion</li>
              <li>Grow with a company that values its people</li>
              <li>Work on innovative projects</li>
              <li>Experience the joy of transforming travel</li>
            </ul>
          </div>
        </div>
      </div>

      <main className="relative pt-16 pb-1 bg-gray-900">
        <div className="relative z-10 max-w-screen-xl mx-auto text-gray-600 sm:px-4 md:px-8">
          <div className="max-w-lg space-y-3 px-4 sm:mx-auto sm:text-center sm:px-0">
            <h3 className="text-cyan-400 font-semibold">Join Our Team</h3>
            <p className="text-white text-3xl font-semibold sm:text-4xl">
              Explore Career Opportunities with Us
            </p>
            <p className="text-gray-300">
              Take the next step in your career with an exciting role at our
              company. We offer dynamic work environments, growth opportunities,
              and a chance to make a real impact.
            </p>
          </div>

          <div className="mt-12 mx-auto px-4 p-8 bg-white sm:max-w-lg sm:px-8 sm:rounded-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="font-medium">Full name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">Phone number</label>
                <div className="relative mt-2">
                  <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2">
                    <select
                      name="countryCode"
                      className="text-sm bg-transparent outline-none rounded-lg h-full"
                    >
                      {countries.map((country, index) => (
                        <option key={index} value={country.cca3}>
                          {country.cca2}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="+91 9147366913"
                    required
                    className="w-full pl-[4.5rem] pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="font-medium">Select Job</label>
                <select
                  name="job"
                  value={formData.job}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                >
                  {jobOpenings.map((data, index) => (
                    <option key={index} value={data.value}>
                      {data.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-medium">Resume</label>
                <input
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-gray-800 shadow-sm rounded-lg"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-lg duration-150"
              >
                {isLoading ? (
                  <img
                    class="w-8 h-8 animate-spin"
                    src="https://www.svgrepo.com/show/199956/loading-loader.svg"
                    alt="Loading icon"
                  />
                ) : (
                  "Submit"
                )}
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
    </>
  );
};

export default Career;
