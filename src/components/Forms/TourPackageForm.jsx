// import React, { useState } from "react";
// import axios from "axios";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const TourPackageForm = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     price: "",
//     country: "",
//     packageDuration: "",
//     continent: "",
//     category: { id: null },
//   });

//   const [images, setImages] = useState([]);
//   const categories = [
//     { id: 4, name: "Domestic Packages" },
//     { id: 1, name: "Europe Expedition" },
//     { id: 7, name: "Hotel Booking" },
//     { id: 3, name: "International Packages" },
//     { id: 2, name: "MICE Tour" },
//     { id: 6, name: "Theme Based Tour" },
//     { id: 5, name: "Wedding Destination" },
//   ];

//   const continents = [
//     "Asia",
//     "Europe",
//     "North America",
//     "South America",
//     "Australia",
//     "Africa",
//     "Antarctica",
//   ];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     // Handle category selection separately
//     if (name === "category") {
//       setFormData({
//         ...formData,
//         category: { id: parseInt(value) || null }, // Ensure the value is a number or null
//       });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleContentChange = (value) => {
//     setFormData({ ...formData, content: value });
//   };

//   const handleImageUpload = (e) => {
//     setImages([...e.target.files]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("tour", JSON.stringify(formData));
//     images.forEach((image) => data.append("images", image));

//     console.log("Form Data:", formData);
//     console.log("Images:", images);

//     try {
//       setIsLoading(true);
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/v1/tours/create`,
//         data,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       alert("Tour Package Created Successfully!");
//     } catch (error) {
//       console.error("Error creating tour package:", error);
//       alert("Failed to create tour package.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-bold mb-4 text-center">
//         Create Tour Package
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Title
//           </label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleInputChange}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="Enter the package title"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Content
//           </label>
//           <ReactQuill
//             theme="snow"
//             value={formData.content}
//             onChange={handleContentChange}
//             className="mt-1"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Price (in INR)
//           </label>
//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleInputChange}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="Enter the package price in INR"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Country
//           </label>
//           <input
//             type="text"
//             name="country"
//             value={formData.country}
//             onChange={handleInputChange}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="Enter the country"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Package Duration
//           </label>
//           <input
//             type="text"
//             name="packageDuration"
//             value={formData.packageDuration}
//             onChange={handleInputChange}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="Enter the duration (e.g., 5 days, 7 nights)"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Continent
//           </label>
//           <select
//             name="continent"
//             value={formData.continent}
//             onChange={handleInputChange}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//             required
//           >
//             <option value="">Select a continent</option>
//             {continents.map((cont, index) => (
//               <option key={index} value={cont}>
//                 {cont}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Category
//           </label>
//           <select
//             name="category"
//             value={formData.category.id || ""}
//             onChange={handleInputChange}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//             required
//           >
//             <option value="">Select a category</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Images
//           </label>
//           <input
//             type="file"
//             multiple
//             onChange={handleImageUpload}
//             className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
//         >
//           {isLoading ? (
//             "Loading..."
//           ) : (
          
//             "Create Package"
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default TourPackageForm;





import React, { useState } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";

const TourPackageForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    price: "",
    country: "",
    packageDuration: "",
    continent: "",
    category: { id: null },
  });

  const [images, setImages] = useState([]);
  const categories = [
    { id: 4, name: "Domestic Packages" },
    { id: 1, name: "Europe Expedition" },
    { id: 7, name: "Hotel Booking" },
    { id: 3, name: "International Packages" },
    { id: 2, name: "MICE Tour" },
    { id: 6, name: "Theme Based Tour" },
    { id: 5, name: "Wedding Destination" },
  ];

  const continents = [
    "Asia",
    "Europe",
    "North America",
    "South America",
    "Australia",
    "Africa",
    "Antarctica",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      setFormData({
        ...formData,
        category: { id: parseInt(value) || null },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleContentChange = (content) => {
    setFormData({ ...formData, content });
  };

  const handleImageUpload = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("tour", JSON.stringify(formData));
    images.forEach((image) => data.append("images", image));

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/tours/create`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Tour Package Created Successfully!");
    } catch (error) {
      console.error("Error creating tour package:", error);
      alert("Failed to create tour package.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Create Tour Package
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter the package title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <Editor
            apiKey="dc3ossxpuy1yfv61567cloipxq845g0rorjeyfic3jaq3smc" // Replace with your TinyMCE API key
            value={formData.content}
            onEditorChange={handleContentChange}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help",
            }}
          />
        </div>

        {/* Other form fields remain unchanged */}

        <div>
  <label className="block text-sm font-medium text-gray-700">
    Price (in INR)
  </label>
  <input
    type="number"
    name="price"
    value={formData.price}
    onChange={handleInputChange}
    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
    placeholder="Enter the package price in INR"
    required
  />
</div>

<div>
  <label className="block text-sm font-medium text-gray-700">
    Country
  </label>
  <input
    type="text"
    name="country"
    value={formData.country}
    onChange={handleInputChange}
    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
    placeholder="Enter the country"
  />
</div>

<div>
  <label className="block text-sm font-medium text-gray-700">
    Package Duration
  </label>
  <input
    type="text"
    name="packageDuration"
    value={formData.packageDuration}
    onChange={handleInputChange}
    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
    placeholder="Enter the duration (e.g., 5 days, 7 nights)"
  />
</div>

<div>
  <label className="block text-sm font-medium text-gray-700">
    Continent
  </label>
  <select
    name="continent"
    value={formData.continent}
    onChange={handleInputChange}
    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
    required
  >
    <option value="">Select a continent</option>
    {continents.map((cont, index) => (
      <option key={index} value={cont}>
        {cont}
      </option>
    ))}
  </select>
</div>

<div>
  <label className="block text-sm font-medium text-gray-700">
    Category
  </label>
  <select
    name="category"
    value={formData.category.id || ""}
    onChange={handleInputChange}
    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
    required
  >
    <option value="">Select a category</option>
    {categories.map((cat) => (
      <option key={cat.id} value={cat.id}>
        {cat.name}
      </option>
    ))}
  </select>
</div>

<div>
  <label className="block text-sm font-medium text-gray-700">
    Images
  </label>
  <input
    type="file"
    multiple
    onChange={handleImageUpload}
    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
  />
</div>




        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
        >
          {isLoading ? "Loading..." : "Create Package"}
        </button>
      </form>
    </div>
  );
};

export default TourPackageForm;
