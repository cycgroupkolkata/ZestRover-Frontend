import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiCalendar } from "react-icons/ci";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div
      onClick={() => navigate(`/blogs/${blog.slug}`)}
      className="hotel-card border rounded-lg shadow-lg overflow-hidden transition-transform duration-300 cursor-pointer"
    >
      <div className="relative">
        <img
          src={`${import.meta.env.VITE_BLOG_IMAGE_URL}${blog.imgUrl}`}
          alt={`Image of ${blog.title}`}
          className="hotel-image w-full transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h4 className="flex flex-row font-medium">
          <CiCalendar className="mr-2"/>
          {formatDate(blog.postedDate)}
        </h4>
        <h3 className="text-lg font-bold">
          {blog.title.split(" ").map((word, index) => (
            <span key={index} className="relative inline-block">
              {word}
              <span className="underline absolute left-0 bottom-0 h-1 bg-blue-600 transition-all duration-300"></span>
            </span>
          ))}
        </h3>

        <Link className="my-2" to={`/blogs/${blog.slug}`}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
