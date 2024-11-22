/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
    "./node_modules/tw-elements-react/dist/**/*.{js,jsx,ts,tsx}", // Add this line
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
