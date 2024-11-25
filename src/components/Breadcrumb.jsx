import React from "react";
import { useLocation, Link } from "react-router-dom";

const Breadcrumb = ({ pageName }) => {
  const location = useLocation();

  // Split the path into parts for breadcrumb generation
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="flex flex-col w-full py-8 bg-gradient-to-r from-blue-300 to-slate-200 bg-opacity-40 justify-center items-center">
      {/* Page Name */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        {pageName || "Page Name"}
      </h1>

      {/* Breadcrumb Navigation */}
      <nav className="w-full flex justify-center" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3 text-lg">
          {/* Home Link */}
          <li className="inline-flex items-center">
            <Link
              to="/"
              className="inline-flex items-center text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Home
            </Link>
          </li>

          {/* Dynamic Links */}
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;

            return (
              <li key={to} className="inline-flex items-center">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  {isLast ? (
                    <span className="ml-1 font-medium text-gray-800 md:ml-2 dark:text-gray-400">
                      {decodeURIComponent(value)}
                    </span>
                  ) : (
                    <Link
                      to={to}
                      className="ml-1 font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                    >
                      {decodeURIComponent(value)}
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
