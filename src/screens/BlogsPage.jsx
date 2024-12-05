import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { blogService } from "../services/BlogService";
import {
  RecentSideBlog,
  RecentSidePosts,
  TourPackageShimer,
} from "../components";
import { IoIosCalendar } from "react-icons/io";

const BlogsPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlogPost = async () => {
    try {
      console.log(slug);
      setIsLoading(true);
      const data = await blogService.getBySlug(slug);
      setBlog(data);
    } catch (error) {
      console.error("Error fetching blog post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    fetchBlogPost();
  }, [slug]);

  return (
    <div className="flex flex-col lg:flex-row justify-center p-4 lg:p-8">
      {isLoading ? (
        <TourPackageShimer />
      ) : (
        <div className="w-full lg:w-2/3 bg-white p-4 lg:p-6 rounded-lg shadow-lg mb-4 lg:mb-0">
          <img
            src={`${import.meta.env.VITE_BLOG_IMAGE_URL}${blog.imgUrl}`}
            alt={blog.title}
            className="w-full max-h-80 object-cover rounded-lg mb-4"
          />
          <p className="flex flex-row font-medium">
            <IoIosCalendar className="mr-2" />
            {formatDate(blog.postedDate)}
          </p>
          <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
          <p className="text-gray-600 mb-4">{blog.date}</p>
          <div
            className="py-5"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></div>
        </div>
      )}
      <div className="w-full lg:w-1/3 lg:ml-8">
        <RecentSideBlog />
      </div>
    </div>
  );
};

export default BlogsPage;
