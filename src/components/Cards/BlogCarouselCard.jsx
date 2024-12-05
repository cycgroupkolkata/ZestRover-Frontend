import React from "react";
import { useNavigate } from "react-router-dom";
import { CiCalendar } from "react-icons/ci";

const BlogCarouselCard = ({ blog }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div
      onClick={() => navigate(`/blogs/${blog.slug}`)}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/blogs/${blog.slug}`)}
      role="button"
      tabIndex={0}
      aria-label={`Read blog: ${blog.title}`}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg focus:shadow-lg transition-shadow duration-300"
    >
      <img
        src={`${import.meta.env.VITE_BLOG_IMAGE_URL}${blog.imgUrl}`}
        alt={`${blog.title} - Blog image`}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 ">
        <p className="flex flex-row font-medium">
          <CiCalendar className="mr-2 " />
          {formatDate(blog.postedDate)}
        </p>
        <p className="font-bold text-gray-800 break-words">
          {blog.title.slice(0,45)+"..." || "Untitled Blog"}
        </p>
      </div>
    </div>
  );
};

export default BlogCarouselCard;
